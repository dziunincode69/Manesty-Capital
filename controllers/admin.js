const bcrypt = require('bcrypt');
const {Account,Role,Card,Transaction,TransactionType,TransactionTypeRelation} = require('../models/');
const helper = require('../helper/convert');

class Controller{
    static showAdminHome(req,res){
        const {errors} = req.query
        res.render("./admin/login", {errors})
    }
    static dashboard(req,res){
        TransactionTypeRelation.findAll({
            include: [
                {
                    model: Transaction,
                    include: Account
                },
                {
                    model: TransactionType
                }
            ]
        }).then(transactionList => {
            const CountPerType = helper.CountPerTypeTransaction(transactionList)
            res.render('./admin/dashboard',{data: transactionList, perType:CountPerType})
         })
        .catch(err => {
            res.send(err)
        })
    }
    static showEditForm(req,res){
        const {id} = req.params
        Account.findByPk(id).then(result => {
            res.render('./admin/editUser', {data:result})
        }).catch(err => {
            res.send(err)
        })
    }
    static edit(req,res){
        const {body} = req
        const {id} = req.params
        Account.update(body,
        { where: { id: id }}).then(result => {
            res.redirect("/admin/userlist")
        }).catch(err => {
            res.send(err)
        })

    }
    static deleteUser(req,res){
        const {id} = req.params
        Account.destroy({
            where: {
                id
            }
        }).then(result => {
            res.redirect("/admin/userlist")
        }).catch(err => {
            res.send(err.message)
        })
    }
    static ListUser(req,res){
        Account.findAll().then(result => {
            res.render("./admin/userlist", {data: result})
        }).catch(err =>{
            res.send(err.message)
        })
    }
    static adminLogin(req,res){
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
                    if(roleUser === "Admin"){
                        req.session.user = {
                            id: user.id,
                            email: user.email,
                            role: roleUser
                        };
                        res.redirect("/admin/dashboard")
                    } else {
                        throw new Error("Your account cannot login to admin")
                    }
                })
            } else {
                throw new Error("Account with email "+email+" not found")
            }
        })
        .catch(err => {
            errors.msg = err.message
            res.redirect("/admin/?errors="+JSON.stringify(errors))
        })
        
    }
}
 

module.exports = Controller