import { body, query } from "express-validator";

export class CShopValidator {

    static validateGetAllShops() {

        console.log('Validating validateGetAllShops request....');
        return [
            query('limit', 'Please provide the valid limit.').trim().escape().isNumeric().notEmpty(),
            query('pageNumber', 'Please provide the valid page number.').trim().escape().isNumeric().notEmpty(),
        ];

    }

    static validateFilterShops() {
        console.log('Validating validateFilterShops request....');
        return [
            query('limit', 'Please provide the valid limit.').optional().trim().escape().isNumeric(),
            query('pageNumber', 'Please provide the valid page number.').optional().trim().escape().isNumeric(),

            body('shopTypeId', 'Please provice numeric shop type id').optional().trim().escape().isNumeric(),
            body('shopCountryId', 'Please provice numeric shop country id').optional().trim().escape().isNumeric(),
            body('shopStateId', 'Please provice numeric shop state id').optional().trim().escape().isNumeric(),
            body('shopStatus', 'Please provice boolean shop status').optional().trim().escape().isBoolean(),
        ];
    }
}