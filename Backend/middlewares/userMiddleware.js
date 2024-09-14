import { body, validationResult } from 'express-validator';

export const registerValidation = [
  body('name').notEmpty().withMessage('Name is required please'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

export const loginValidation = [
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const validate = (req, res, next) => {
  console.log('Request body:', req.body); 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
