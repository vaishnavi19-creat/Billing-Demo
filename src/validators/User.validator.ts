import { body } from "express-validator";

export const UserValidator = () => [
  body('username').isString().notEmpty().withMessage('Username is required'),
  // body('email').isEmail().withMessage('Valid email is required'),
  body('Email', 'Please provide a valid email address.').notEmpty().trim().escape().isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role').isIn(['admin', 'shop_owner']).withMessage('Role must be admin or shop_owner')
];
