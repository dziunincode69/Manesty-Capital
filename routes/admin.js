const express = require('express');
const AdminController = require('../controllers/admin.js');
const Middlewares = require('../middlewares/auth.js'); 
const router = express.Router();

router.get("/", AdminController.showAdminHome)
router.post("/login", AdminController.adminLogin)

router.get("/dashboard", Middlewares.requireLogin, Middlewares.checkRoleAdmin, AdminController.dashboard)

router.get("/userlist", Middlewares.requireLogin, Middlewares.checkRoleAdmin, AdminController.ListUser)

router.get("/edit/:id", Middlewares.requireLogin, Middlewares.checkRoleAdmin, AdminController.showEditForm)
router.post("/edit/:id", Middlewares.requireLogin, Middlewares.checkRoleAdmin, AdminController.edit)


router.get("/delete/:id", Middlewares.requireLogin, Middlewares.checkRoleAdmin, AdminController.deleteUser)


module.exports = router