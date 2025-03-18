const { Router } = require('express');
const loginRouter = Router();
const authController = require('../controllers/AuthController');
const inputValidation = require('../validators/inputValidation');
const validateRequest = require('../validators/validateRequest');
const passport = require('../config/passport');
loginRouter.post('/login', authController.loginUser);
loginRouter.get('/protected', authController.secureUser);
loginRouter.post('/logout', authController.logoutUser);
loginRouter.get('/login/github', passport.authenticate('github'));
loginRouter.get(
  '/github/callback',
  passport.authenticate('github', { session: false }),
  authController.githubCallback
);
module.exports = loginRouter;
