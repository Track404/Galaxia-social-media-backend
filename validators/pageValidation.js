const { body } = require('express-validator');

const lengthErr = 'must be between 1 and 20 characters.';
const emailERR = 'must be a valid email(example: name@gmail.com)';
const emptyERR = 'must not be empty';

const validateUpdateUser = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage(`Username ${lengthErr}`),
  body('email')
    .trim()
    .notEmpty()
    .withMessage(`Email ${emptyERR}`)
    .isEmail()
    .withMessage(`Email ${emailERR}`),
];

module.exports = {
  validateUpdateUser,
};

const validateGroupName = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage(`Group Name ${lengthErr}`),
];

const validateGroupMembers = [
  body('usersIds')
    .isArray()
    .isLength({ min: 2, max: 20 })
    .withMessage(`Number of groupMembers must be between 2 and 20`),
];

module.exports = {
  validateUpdateUser,
  validateGroupName,
  validateGroupMembers,
};
