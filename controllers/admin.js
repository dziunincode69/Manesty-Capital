const bcrypt = require('bcrypt');
const {Account,Role} = require('../models/');

class Controller{
    static showAdminHome(req,res){
        const {errors} = req.query
        res.render("./admin/login", {errors})
    }
    static dashboard(req,res){
        res.send("this is dashboard")
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