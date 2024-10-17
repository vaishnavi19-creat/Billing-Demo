import * as express from "express";
import { Request, Response } from 'express';   // import request and response
import { validationResult } from "express-validator";
import { errorTypeEnum } from "../enums/errorType.enum";
import { CCustomErrors } from "../helpers/CCustomErrors.helper";
import { CCustomerService } from '../services/CCustomer.service';
import { CFilterRequest } from "../helpers/CFilterRequest.helper";
import { getAllCustomers } from "../interfaces/CCustomer.interface";
import { RequestHandler } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { CCustomerValidator } from "../validators/CCustomer.validator";

const objCustomerService = new CCustomerService();

export class CCustomerController {
    static updateorcreateCustomer: RequestHandler<{}, any, any, ParsedQs, Record<string, any>>;
    static updateOrCreateCustomer(arg0: string, arg1: RequestHandler<{}, any, any, ParsedQs, Record<string, any>>, updateOrCreateCustomer: any) {
        throw new Error("Method not implemented.");
    }

    static deleteCustomer(req: express.Request, res: express.Response, next: express.NextFunction) {
        throw new Error("Method not implemented.");
    }

    static updateCustomer(req: express.Request, res: express.Response, next: express.NextFunction) {
        throw new Error("Method not implemented.");
    }

    static async addCustomer(request: express.Request, response: express.Response, next: express.NextFunction) {
        try {
            console.log('In addCustomer() from CCustomerController');
            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                console.log('Caught in input validation error from CCustomerController => addCustomer()');
                return next(new CCustomErrors(new Error('Please provide valid inputs.'), errorTypeEnum.INPUT_VALIDATION_ERROR, errors));
            }

            // Filter customer data from request
            const objFilteredCustomer = CFilterRequest.filterAddNewCustomerRequest(request);

            // Ensure that objCustomerService.addCustomer accepts objFilteredCustomer type correctly
            const objSavedCustomer = objCustomerService.addCustomer(objFilteredCustomer);

            if (objSavedCustomer) {
                console.log('Received success response in CCustomerController => addCustomer()');
                return response.status(200).send({
                    status: 200,
                    message: 'success',
                    data: {
                        customerName: objSavedCustomer.customerName,
                        customerMobileNo: objSavedCustomer.MobileNo,
                        customerEmail: objSavedCustomer.EmailId,
                        customerAddress: objSavedCustomer.Address,
                        customerGSTNo: objSavedCustomer.GSTNo,
                        customerlogo: objSavedCustomer.customerlogo
                    }
                });
            }

            return response.status(400).send({
                message: 'Unable to save customer, please try again.'
            });

        } catch (error) {
            return next(error);
        }
    }

    static async getAllCustomers(request: express.Request, response: express.Response, next: express.NextFunction) {
        try {
            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                console.log('Caught in input validation error from CCustomerController => getAllCustomers()');
                return next(new CCustomErrors(new Error('Please provide valid inputs.'), errorTypeEnum.INPUT_VALIDATION_ERROR, errors));
            }

            // Directly convert query parameters to numbers
            const limit = Number(request.query.limit) ;
            const pageNumber = Number(request.query.pageNumber);

            const arrObjCustomers: Array<getAllCustomers> = await objCustomerService.getAllCustomer(limit, pageNumber);

            return response.status(200).send({
                status: 200,
                message: 'success',
                data: arrObjCustomers.length > 0 ? arrObjCustomers : []
            });

        } catch (error) {
            return next(error);
        }
    }

    static async filterCustomers(request: express.Request, response: express.Response, next: express.NextFunction) {
        try {
            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                console.log('Caught in input validation error from CCustomerController => filterCustomers()');
                return next(new CCustomErrors(new Error('Please provide valid inputs.'), errorTypeEnum.INPUT_VALIDATION_ERROR, errors));
            }

            // Directly convert query parameters to numbers
            const limit = Number(request.query.limit);
            const pageNumber = Number(request.query.pageNumber);

            const arrCustomerObjs: Array<getAllCustomers> = await objCustomerService.getAllCustomer(limit, pageNumber);

            return response.status(200).send({
                status: 200,
                message: 'success',
                data: arrCustomerObjs.length > 0 ? arrCustomerObjs : []
            });

        } catch (error) {
            return next(error);
        }
    }

    
 //get customer by Id method 
    static async getCustomerById(req: express.Request, response: express.Response, next: express.NextFunction) { 
        try {
            // Check validation results from the validator
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(new CCustomErrors(new Error(errors.array()[0].msg), errorTypeEnum.INPUT_VALIDATION_ERROR));
            }

            const customerId = Number(req.params.customerId);
            const customer = await objCustomerService.getCustomerById(customerId);

            if (customer) {
                console.log('Received success response in CCustomerController => getCustomerById()');
                return response.status(200).send({
                    status: 200,
                    message: 'success',
                    data: customer
                });
            }

            return response.status(404).send({
                message: 'Customer not found.'
            });

        } catch (error) {
            return next(error);
        }
    }


 // ADDING SOFT DELETE METHOD
 static async softDeleteCustomerById(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new CCustomErrors(new Error('Validation error'), errorTypeEnum.INPUT_VALIDATION_ERROR, errors.array()));
        }

        const customerId = Number(req.params.customerId);

        const result = await objCustomerService.softDeleteCustomer(customerId);

        if (result) {
            return res.status(200).send({
                status: 200,
                message: 'Customer soft-deleted successfully.',
            });
        } else {
            return res.status(404).send({
                message: 'Customer not found.',
            });
        }
    } catch (error) {
        return next(error);
    }
}

    
    // New method for updating a customer
    static async putCustomer(req: Request, res: Response) {

        //Validation result check
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const customerId = req.params.customerId; // Get the customer ID from the URL
        const customerData = req.body; // Get the customer data from the request body

        try {
            const updatedCustomer = await CCustomerService.updateCustomerById(customerId, customerData);
            if (CCustomerController.putCustomer) {
                return res.status(200).json(updatedCustomer);
            } else {
                return res.status(404).json({ message: "Customer not found" });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }




}












































































































    // static async getAllSchools( request:express.Request, response:express.Response, next:express.NextFunction ) {
    //     try {
    //         const arrObjAllSchools = await objSchoolService.getAllSchools(request);

    //         if( arrObjAllSchools ) {
    //             response.status( 200 ).send({
    //                 data : arrObjAllSchools
    //             });
    //         } else {
    //             response.status( 200 ).send({
    //                 messgae : 'Sorry! No Data available. Please try again.',
    //                 data : []
    //             });
    //         }

    //     } catch( error ) {
    //         return next( new CCustomErrors( error, errorTypeEnum.DB_OPERATION_ERROR ) );
    //     }
    // }

    // static async getSchoolById( request:express.Request, response:express.Response, next:express.NextFunction ) {
    //     try {
    //        const objSchool = await objSchoolService.getSchoolById(request);

    //         if( objSchool ) {
    //             response.status( 200 ).send({
    //                 data : objSchool
    //             });
    //         } else {
    //             response.status( 200 ).send({
    //                 messgae : 'Sorry! No Data available. Please try again.',
    //                 data : []
    //             });
    //         }

    //     } catch( error ) {
    //         return next( new CCustomErrors( error, errorTypeEnum.DB_OPERATION_ERROR ) );
    //     }
    // }

    // static async getActiveSchools( request:express.Request, response:express.Response, next:express.NextFunction ) {
    //     try {
    //        const arrObjSchools = await objSchoolService.getActiveSchools(request);

    //         if( arrObjSchools ) {
    //             response.status( 200 ).send({
    //                 data : arrObjSchools
    //             });
    //         } else {
    //             response.status( 200 ).send({
    //                 messgae : 'Sorry! No Data available. Please try again.',
    //                 data : []
    //             });
    //         }

    //     } catch( error ) {
    //         return next( new CCustomErrors( error, errorTypeEnum.DB_OPERATION_ERROR ) );
    //     }
        
    // }

    // static async getInactiveSchools( request:express.Request, response:express.Response, next:express.NextFunction ) {

    //     try {
    //        const arrObjSchools = await objSchoolService.getInactiveSchools(request);

    //         if( arrObjSchools ) {

    //             response.status( 200 ).send({
    //                 data : arrObjSchools
    //             });

    //         } else {

    //             response.status( 200 ).send({
    //                 messgae : 'Sorry! No Data available. Please try again.',
    //                 data : []
    //             });

    //         }

    //     } catch( error ) {

    //         return next( new CCustomErrors( error, errorTypeEnum.DB_OPERATION_ERROR ) );
    //     }
        
    // }

    // static async updateSchool( request:express.Request, response:express.Response, next:express.NextFunction ) {
    //     try {
    //         const errors = validationResult( request );

    //         if (!errors.isEmpty()) {
    //             return next( new CCustomErrors( new Error( 'Please provide valid inputs. ' ), errorTypeEnum.INPUT_VALIDATION_ERROR, errors ) );
    //         }

    //         const objUpdatedSchool = await objSchoolService.updateSchool(request);

    //         if( objUpdatedSchool ) {
    //             response.status( 200 ).send({
    //                 data : objUpdatedSchool
    //             });
    //         } else {
    //             response.status( 200 ).send({
    //                 messgae : 'Sorry! The data could not be updated. Please try again.',
    //                 data : ''
    //             });
    //         }

    //     } catch( error ) {
    //         return next( new CCustomErrors( error, errorTypeEnum.DB_OPERATION_ERROR ) );
    //     }
        
    // }

    // static async activateSchool( request:express.Request, response:express.Response, next:express.NextFunction ) {
    //     try {
    //         let objUpdatedSchool = await objSchoolService.updateSchool(request);

    //         if( objUpdatedSchool ) {
    //             response.status( 200 ).send({
    //                 data : objUpdatedSchool
    //             });
    //         } else {
    //             response.status( 200 ).send({
    //                 messgae : 'Sorry! The data could not be updated. Please try again.',
    //                 data : ''
    //             });
    //         }

    //     } catch( error ) {
    //         return next( new CCustomErrors( error, errorTypeEnum.DB_OPERATION_ERROR ) );
    //     }
    // }

    // static async inactivateSchool( request:express.Request, response:express.Response, next:express.NextFunction ) {
    //     try {
    //         const objUpdatedSchool = await objSchoolService.updateSchool(request);

    //         if( objUpdatedSchool ) {
    //             response.status( 200 ).send({
    //                 data : objUpdatedSchool
    //             });
    //         } else {
    //             response.status( 200 ).send({
    //                 messgae : 'Sorry! The data could not be updated. Please try again.',
    //                 data : ''
    //             });
    //         }
    //     } catch( error ) {
    //         return next( new CCustomErrors( error, errorTypeEnum.DB_OPERATION_ERROR ) );
    //     }        
    // }

