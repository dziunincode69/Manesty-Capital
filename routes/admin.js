const express = require('express');
const AdminController = require('../controllers/admin.js');
const Middlewares = require('../middlewares/auth.js'); 
const router = express.Router();

router.get("/", AdminController.showAdminHome)
router.post("/login", AdminController.adminLogin)
router.get("/dashboard", Middlewares.requireLogin, Middlewares.checkRoleAdmin, AdminController.dashboard)

module.exports = router