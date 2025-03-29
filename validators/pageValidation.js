const { body } = require('express-validator');

const lengthErr = 'must be between 1 and 200 characters.';
const lengthUsernameErr = 'must be between 1 and 20 characters.';
const emailERR = 'must be a valid email(example: name@gmail.com)';
const emptyERR = 'must not be empty';

const validateUpdateUser = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage(`Username ${lengthUsernameErr}`),
  body('email')
    .trim()
    .notEmpty()
    .withMessage(`Email ${emptyERR}`)
    .isEmail()
    .withMessage(`Email ${emailERR}`),
];

const validNewPost = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage(`Content of the post ${lengthErr}`),
];
const validNewComment = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage(`Content of the comment ${lengthErr}`),
];

module.exports = {
  validateUpdateUser,
  validNewPost,
  validNewComment,
};
