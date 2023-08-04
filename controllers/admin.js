const bcrypt = require('bcrypt');
const {Account,Role,Card,Transaction,TransactionType,TransactionTypeRelation} = require('../models/');
const {ConvertToUsd,CountPerTypeTransaction}  = require('../helper/convert');
const {Op} = require('sequelize');
class Controller{
    static showAdminHome(req,res){
        const {errors} = req.query
        res.render("./admin/login", {errors})
    }
    static dashboard(req,res){
        const {find} = req.query
        let CountPerType = {}
        let transactionlist = {}
        let query = ``
        if (find) {
            // Use the Op.like operator with the correct pattern string
            query = {
              include: [
                { model: Transaction, include: { model: Account } },
                { model: TransactionType, 
                    where: {
                        id: find
                    }
                }
              ],
              
            };
          } else {
            query = {
              include: [
                { model: Transaction, include: { model: Account } },
                { model: TransactionType }
              ]
            };
          }
        TransactionTypeRelation.findAll(query).then(result => {
            transactionlist = result
            CountPerType = CountPerTypeTransaction(result)
            return TransactionType.findAll()
         }).then(result => {
            res.render('./admin/dashboard',{data: transactionlist, perType:CountPerType,ConvertToUsd, listType: result})
         })
        .catch(err => {
            res.send(err)
        })
    }
    static showEditForm(req,res){
        const {errors} = req.query
        const {id} = req.params
        Account.findByPk(id).then(result => {
            res.render('./admin/editUser', {data:result, errors})
        }).catch(err => {
            res.send(err)
        })
    }
    static edit(req,res){
        const errors = {}
        const {body} = req
        const {id} = req.params
        Account.update(body,
        { where: { id: id }}).then(result => {
            res.redirect("/admin/userlist")
        }).catch(err => {
            errors.msg = err.message
            res.redirect("/admin/edit/"+id+"?errors="+errors.msg)
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
        Account.findAll({
            order: [
                ["balance","DESC"]
            ]
        }).then(result => {
            res.render("./admin/userlist", {data: result,ConvertToUsd})
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