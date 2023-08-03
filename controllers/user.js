const bcrypt = require('bcrypt');
const {Account,Role,Card,Transaction,TransactionType,TransactionTypeRelation} = require('../models/');
const helper = require('../helper/convert');

class User {
    static userHome(req,res){
        const {errors,msg} = req.query
        res.render("./home", {errors,msg})
    }
    static userDashboard(req,res){
        const {id,email,name} = req.session.user
        const card = {}
        const profile = {
            email,name
        }
        Card.findOne({
            where: {
                AccountId: id
            }
        }).then(result => {
            const {cardNumber,expMonth,expYear,cvv} = result
            card.cardNumber = cardNumber
            card.exp = expMonth+"/"+expYear
            card.cvv = cvv
            return Card.sensorCard(cardNumber)
        })
        .then(result => {
            card.censoredNumber = result
            TransactionTypeRelation.findAll({
                include: [
                    {
                        model: Transaction
                    },
                    {
                        model: TransactionType
                    }
                ]
            }).then(transactionList => {
                res.render('dashboard', {card, profile, transactionList, helper})
            })
           
        })
        .catch(err => {
            res.send(err)
        })
    }
    static userLogout(req,res){
        req.session.destroy(err => {
            if(err){
                res.status(400).send("Unable to logout")
            } else {
                res.redirect("/")
            }
        })
    }
    static userLogin(req,res){
        const errors = {
            msg: ""
        }
        const {email,password} = req.body
        Account.FindAccount(email,Role).then(result => {
            if(result.length !== 0){
                const user = result[0]
                const roleUser = user.Role.role
                const bcryptPassword = user.password
                return bcrypt.compare(password, bcryptPassword)
                .then(match => {
                    if(!match){
                        throw new Error("Wrong password")
                    }
                    if(roleUser === "User"){
                        res.set({
                            "User-id": user.id
                        })
                        req.session.user = {
                            id: user.id,
                            name: user.fullName,
                            email: user.email,
                            role: roleUser
                        };
                        res.redirect("/dashboard")
                    } else {
                        throw new Error("Your account cannot login to user")
                    }
                })
            } else if(!email){
                throw new Error("Please input email")
            } else {
                throw new Error("Account with email "+email+" not found")
            }
        })
        .catch(err => {
            errors.msg = err.message
            res.redirect("/?errors="+JSON.stringify(errors))
        })
        
    }
    static registerForm(req,res){
        const {errors} = req.query
        res.render('registerForm',{errors: errors})
    }
    static regiterAccount(req,res){
        const errors = {}
        const {body} = req
        Account.create(body).then(result => {
            const GenerateDebit = Card.GenerateDebit()
            GenerateDebit.AccountId = result.id
            return Card.create(GenerateDebit)
        }).then(_ => {
            res.redirect("/?msg=Success Register")
        })
        .catch(err => {
            errors.msg = err.message
            res.redirect("/register?errors="+errors.msg)
        })
    }

}
module.exports = User