import { body, query } from 'express-validator';

export class InvoiceValidator {
   
    static validateGetAllInvoices() {
        return [
            body('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
            body('pageNumber').optional().isInt({ min: 1 }).withMessage('Page number must be a positive integer'),
        ];
    }

    static validateInvoice() {
        return [
            body('amount', 'Amount must be a numeric value.').trim().escape().isNumeric().notEmpty(),
            body('paymentMode', 'Payment mode is required.').trim().notEmpty().isString(),
            body('shopId', 'Shop ID must be a numeric value.').trim().escape().isNumeric().notEmpty(),
            body('customerId', 'Customer ID must be a numeric value.').trim().escape().isNumeric().notEmpty(),
            body('invoiceNumber', 'Invoice number must be a string.').optional().trim().isString(),
            body('dueDate', 'Due date must be a valid date.').optional().isISO8601().toDate(),
            body('discount', 'Discount must be a numeric value.').optional().trim().escape().isNumeric(),
            body('taxAmount', 'Tax amount must be a numeric value.').optional().trim().escape().isNumeric(),
            body('items', 'Items must be an array.').isArray().notEmpty(),
            body('items.*.productId', 'Product ID must be a numeric value.').trim().escape().isNumeric().notEmpty(),
            body('items.*.productName', 'Product name must be a string.').trim().notEmpty().isString(),
            body('items.*.quantity', 'Quantity must be a numeric value.').trim().escape().isNumeric().notEmpty(),
            body('items.*.price', 'Price must be a numeric value.').trim().escape().isNumeric().notEmpty(),
            body('items.*.total', 'Total must be a numeric value.').trim().escape().isNumeric().notEmpty(),
          
        ];
    }

    static validateInvoiceId() {
        return [
            body('id').notEmpty().withMessage('Invoice ID is required').isString(),
        ];
    }

    static validatepatchInvoice(){
        return[
            body('items.*.quantity', 'Quantity must be a numeric value.').trim().escape().isNumeric().notEmpty(),
            body('items.*.price', 'Price must be a numeric value.').trim().escape().isNumeric().notEmpty(),
        ];
    }
    


}


