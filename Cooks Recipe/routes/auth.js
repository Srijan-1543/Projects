const auth_controller = require('../controllers/auth_controller');
const express = require('express');
const { EnsureAuthenticated } = require('../config/auth');
const router = express.Router();

router.get('/authenticate',auth_controller.getAuthentication);
//router.get('/signin',auth_controller.getSignIn);
router.post('/signup',auth_controller.validateSignUp);
router.post('/signin',auth_controller.validateSignIn);
router.get('/verify',EnsureAuthenticated,auth_controller.verify);
router.get('/dashboard',EnsureAuthenticated,auth_controller.getDashboard);
module.exports = router;