const express = require('express');
const router = express.Router();
const passport = require('passport');


const homeController = require('../controllers/home_controller');

router.get('/auth/gitlab', passport.authenticate('gitlab', { scope: ['profile', 'email'] }));
router.get('/auth/gitlab/callback', passport.authenticate('gitlab', { failureRedirect: '/' }), homeController.home);



module.exports = router;