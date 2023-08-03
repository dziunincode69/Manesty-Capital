const express = require('express');
const router = express.Router();
const Admin = require('./admin.js');
const UserController = require('../controllers/user.js');
const Middlewares = require('../middlewares/auth.js'); 

router.get("/", UserController.userHome)
router.post("/login", UserController.userLogin)

// router.get("/register", UserController.registerForm)
// router.post("/register", UserController.regiterAccount)

router.get("/dashboard", Middlewares.requireLogin, Middlewares.checkRoleUser, UserController.userDashboard)
router.get("/logout", Middlewares.requireLogin, UserController.userLogout)

router.use("/admin",Admin)

module.exports = router