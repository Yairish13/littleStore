import { body, ValidationChain } from 'express-validator';

export const signupValidation: ValidationChain[] = [
  body('name')
    .isString()
    .isLength({ min: 4, max: 20 })
    .withMessage('na must be valid'),
  body('address')
    .isString()
    .isLength({ min: 4, max: 20 })
    .withMessage('na must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password has to be between 4 to 20 chars'),
];
