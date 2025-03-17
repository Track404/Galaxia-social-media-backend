const { body } = require('express-validator');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

const lengthErr = 'must be between 1 and 20 characters.';
const emailERR = 'must be a valid email(example: name@gmail.com)';
const emptyERR = 'must not be empty';

const validateRegister = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage(`Name ${lengthErr}`),
  body('email')
    .trim()
    .notEmpty()
    .withMessage(`Email ${emptyERR}`)
    .isEmail()
    .withMessage(`Email ${emailERR}`)
    .custom(async (value) => {
      console.log('Checking email:', value); // Log the email being checked
      const existingUser = await userModel.getUserByEmail(value);
      console.log('Existing User:', existingUser); // Log the result from the query
      if (existingUser) {
        console.log('User exists!');
        throw new Error('A user already exists with this e-mail address');
      }
      return true;
    }),
  body('password')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage(`password ${lengthErr}`),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('password do not match');
    }
    return true;
  }),
];

const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage(`Email ${emptyERR}`)
    .isEmail()
    .withMessage(`Email ${emailERR}`)
    .custom(async (value, { req }) => {
      console.log('Checking email:', value); // Log the email being checked
      const existingUser = await userModel.getUserByEmail(value);
      console.log('Existing User:', existingUser); // Log the result from the query
      if (!existingUser) {
        console.log('User Not Found!');
        throw new Error('No user was found with this e-mail address');
      }
      req.existingUser = existingUser;

      return true;
    }),
  body('password')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage(`password ${lengthErr}`)
    .custom(async (value, { req }) => {
      if (req.existingUser) {
        const isMatch = await bcrypt.compare(value, req.existingUser.password); // Compare password
        if (!isMatch) {
          throw new Error('Incorrect password ');
        }
      }
      return true;
    }),
];

module.exports = {
  validateLogin,
  validateRegister,
};
