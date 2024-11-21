import { param, body } from 'express-validator';

export class CCustomerValidator {

    // Added customerId validation start
    static validateCustomerId() {
        return [
            body('customerId', 'Invalid customer ID.').isInt().withMessage('Customer ID must be a number'),  // Validate customerId as an integer
        ];
    }

    static validateCustomer() {
        console.log('Validating validateCustomer request....');
        return [
            body('Name', 'Please provide a valid name.').notEmpty().trim().escape().isString().withMessage('Name is required'),

            body('MobileNo', 'Please provide a valid mobile number.').notEmpty().trim().escape().matches(/^(\+91)?\d{10}$/).withMessage('Mobile number must start with +91 (optional) and contain exactly 10 digits.'),

            body('Email', 'Please provide a valid email address.').notEmpty().trim().escape().isEmail().withMessage('Invalid email format'),

            body('Address', 'Please provide a valid address.').notEmpty().trim().escape().isString().withMessage('Address is required').isLength({ min: 10, max: 500 }).withMessage('Address should be between 10 and 500 characters'),

            body('GSTNo', 'Please provide a valid GST number.').trim().escape().isAlphanumeric().withMessage('GST number is required').isLength({ min: 15, max: 15 }).withMessage('GST number must be 15 characters').matches(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{2}/).withMessage('GST number must be in the correct format'),

            body('logo', 'Please provide a valid logo URL.').optional().trim().escape().isURL().withMessage('Logo must be a valid URL'),
        ];
    }

    static validateNewCustomer() {
        console.log('Validating validateNewCustomer request....');
        return [
            ...this.validateCustomer(),
        ];
    }

    // Validation method for updating customer
    static validateUpdateCustomer() {
        console.log('Validating update customer request....');
        return [
            // Validate the customerId from the URL
            ...this.validateCustomerId(),  
            ...this.validateCustomer(),    
        ];
    }
    
// Method to validate customerId for soft delete
static validateCustomerIdForSoftDelete() {
    return [
        body('customerId').isInt().withMessage('Customer ID must be a valid integer.'),
    ];
}


 static validateGetAllCustomers(){
    return[
            body('Name', 'Please provide a valid name.').notEmpty().trim().escape().isString().withMessage('Name is required'),
            body('MobileNo', 'Please provide a valid mobile number.').notEmpty().trim().escape().matches(/^(\+91)?\d{10}$/).withMessage('Mobile number must start with +91 (optional) and contain exactly 10 digits.'),
            body('Email', 'Please provide a valid email address.').notEmpty().trim().escape().isEmail().withMessage('Invalid email format'),
            body('Address', 'Please provide a valid address.').notEmpty().trim().escape().isString().withMessage('Address is required').isLength({ min: 10, max: 500 }).withMessage('Address should be between 10 and 500 characters'),
            body('GSTNo', 'Please provide a valid GST number.').trim().escape().isAlphanumeric().withMessage('GST number is required').isLength({ min: 15, max: 15 }).withMessage('GST number must be 15 characters').matches(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{2}/).withMessage('GST number must be in the correct format'),
            body('logo', 'Please provide a valid logo URL.').optional().trim().escape().isURL().withMessage('Logo must be a valid URL'),
        
    ];
 }


 static validatepatchCustomer(){
    return[
        body('MobileNo', 'Please provide a valid mobile number.').notEmpty().trim().escape().matches(/^(\+91)?\d{10}$/).withMessage('Mobile number must start with +91 (optional) and contain exactly 10 digits.'),
        body('Email', 'Please provide a valid email address.').notEmpty().trim().escape().isEmail().withMessage('Invalid email format'),
    ]
 }




  static  customerSignUpValidation (){
            return [
    body('customerName').isString().withMessage('Customer name is required.'),
    body('customerEmail').isEmail().withMessage('Invalid email format.'),
    body('MobileNo', 'Please provide a valid mobile number.').notEmpty().trim().escape().matches(/^(\+91)?\d{10}$/).withMessage('Mobile number must start with +91 (optional) and contain exactly 10 digits.'),
    body('customerGSTNumber').optional().isString().withMessage('Invalid GST number.'),
    body('customerLogo').optional().isURL().withMessage('Invalid logo URL.'),
];

}

}


















// import { body, query } from "express-validator";

// export class CCustomerValidator {
//     static validateCustomer(): import("express-serve-static-core").RequestHandler<{}, any, any, import("qs").ParsedQs, Record<string, any>> {
//         throw new Error("Method not implemented.");
//     }

//     static validateNewCustomer() {
//         console.log('Validating validateNewCustomer request....');
//         return [
//             // Validating the 'limit' and 'pageNumber' query parameters (optional)
//             // query('limit', 'Please provide a valid limit.').optional().trim().escape().isNumeric(),
//             // query('pageNumber', 'Please provide a valid page number.').optional().trim().escape().isNumeric(),
    
//             // Validating customer details
//             body('Name', 'Please provide a valid name.').notEmpty().trim().escape().isString().withMessage('Name is required'),
//             body('MobileNo', 'Please provide a valid mobile number.').notEmpty().trim().escape().matches(/^(\+91)?\d{10}$/).withMessage('Mobile number must start with +91 (optional) and contain exactly 10 digits.').isLength({ min: 10, max: 10 }).withMessage('Mobile number must be exactly 10 digits long (excluding country code).'),
//             body('Email', 'Please provide a valid email address.').notEmpty().trim().escape().isEmail().withMessage('Email is required').withMessage('Invalid email format'),
//             body('Address', 'Please provide a valid address.').notEmpty().trim().escape().isString().withMessage('Address is required').isLength({ min: 10, max: 500 }).withMessage('Address should be between 10 and 500 characters'),
//             body('GSTNo', 'Please provide a valid GST number.').trim().escape().isAlphanumeric().withMessage('GST number is required').isLength({ min: 15, max: 15 }).withMessage('GST number must be 15 characters').matches(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{2}/).withMessage('GST number must be in the correct format'),
//             body('logo', 'Please provide a valid logo URL.').trim().escape().isURL().withMessage('Logo must be a valid URL'),
//         ];
//     }
    
// }