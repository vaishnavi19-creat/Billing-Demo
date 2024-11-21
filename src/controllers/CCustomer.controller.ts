import * as express from "express";
import { Request, Response } from 'express';
import { validationResult } from "express-validator";
import { errorTypeEnum } from "../enums/errorType.enum";
import { CCustomErrors } from "../helpers/CCustomErrors.helper";
import { CCustomerService } from '../services/CCustomer.service';
import { CFilterRequest } from "../helpers/CFilterRequest.helper";
import { customerBasicDetails, getAllCustomers, SignUpResp } from "../interfaces/CCustomer.interface";
import { CCustomerModel } from "../db/models/CCustomer.model";

const objCustomerService = new CCustomerService();

export class CCustomerController {

    // Add a new customer
    static async addCustomer(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(new CCustomErrors(new Error('Please provide valid inputs.'), errorTypeEnum.INPUT_VALIDATION_ERROR, errors));
            }

            const objFilteredCustomer = CFilterRequest.filterAddNewCustomerRequest(req);
            const objSavedCustomer = await objCustomerService.addCustomer(objFilteredCustomer);

            if (objSavedCustomer) {
                return res.status(200).send({
                    status: 200,
                    message: 'Customer added successfully',
                    data: objSavedCustomer
                });
            } else {
                return res.status(400).send({
                    message: 'Unable to save customer, please try again.'
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    // Get all customers
    static async getAllCustomers(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(new CCustomErrors(new Error('Please provide valid inputs.'), errorTypeEnum.INPUT_VALIDATION_ERROR, errors));
            }

            const limit = Number(req.query.limit);
            const pageNumber = Number(req.query.pageNumber);

            const arrObjCustomers: Array<getAllCustomers> = await objCustomerService.getAllCustomer(limit, pageNumber);

            return res.status(200).send({
                status: 200,
                message: 'success',
                data: arrObjCustomers.length > 0 ? arrObjCustomers : []
            });
        } catch (error) {
            return next(error);
        }
    }

    // Get customer by ID
    static async getCustomerById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(new CCustomErrors(new Error(errors.array()[0].msg), errorTypeEnum.INPUT_VALIDATION_ERROR));
            }

            const customerId = Number(req.params.customerId);
            const customer = await objCustomerService.getCustomerById(customerId);

            if (customer) {
                return res.status(200).send({
                    status: 200,
                    message: 'success',
                    data: customer
                });
            } else {
                return res.status(404).send({
                    message: 'Customer not found.'
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    // Soft delete customer by ID
    static async softDeleteCustomerById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const customerId = Number(req.params.customerId);
            const result = await objCustomerService.softDeleteCustomer(customerId);

            if (result) {
                return res.status(200).send({
                    status: 200,
                    message: 'Customer soft-deleted successfully.'
                });
            } else {
                return res.status(404).send({
                    message: 'Customer not found.'
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    // Update customer
    static async updateCustomer(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const customerId = Number(req.params.customerId);
            const customerData = req.body;

            const updatedCustomer = await objCustomerService.updateCustomerById(customerId, customerData);

            if (updatedCustomer) {
                return res.status(200).json({
                    status: 200,
                    message: 'Customer updated successfully.',
                    data: updatedCustomer
                });
            } else {
                return res.status(404).json({
                    message: 'Customer not found.'
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    // PATCH Update customer (partial update)
    static async patchCustomer(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const customerId = Number(req.params.customerId);
            const customerData = req.body;

            const updatedCustomer = await objCustomerService.updateCustomerById(customerId, customerData);

            if (updatedCustomer) {
                return res.status(200).json({
                    status: 200,
                    message: 'Customer partially updated successfully.',
                    data: updatedCustomer
                });
            } else {
                return res.status(404).json({
                    message: 'Customer not found.'
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    // Delete customer
    static async deleteCustomer(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const customerId = Number(req.params.customerId);
            const result = await objCustomerService.deleteCustomer(customerId);

            if (result) {
                return res.status(200).send({
                    status: 200,
                    message: 'Customer deleted successfully.'
                });
            } else {
                return res.status(404).send({
                    message: 'Customer not found.'
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    // Filter customers
    static async filterCustomers(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const filterData = req.body; // Assuming the filters are passed in the body
            const filteredCustomers = await objCustomerService.filterCustomers(filterData);

            return res.status(200).send({
                status: 200,
                message: 'Filtered customers',
                data: filteredCustomers
            });
        } catch (error) {
            return next(error);
        }
    }
}


























































// import * as express from "express";
// import { Request, Response } from 'express';
// import { validationResult } from "express-validator";
// import { errorTypeEnum } from "../enums/errorType.enum";
// import { CCustomErrors } from "../helpers/CCustomErrors.helper";
// import { CCustomerService } from '../services/CCustomer.service';
// import { CFilterRequest } from "../helpers/CFilterRequest.helper";
// import { customerBasicDetails, getAllCustomers,SignUpResp } from "../interfaces/CCustomer.interface";
// import { RequestHandler } from "express-serve-static-core";
// import { ParsedQs } from "qs";
// import { CCustomerValidator } from "../validators/CCustomer.validator";
// import { CCustomerModel } from "../db/models/CCustomer.model";

// const objCustomerService = new CCustomerService();

// export class CCustomerController {
  

//       // POST method to sign up a new customer
//     public static async signUp(req: Request, res: Response, next: Function): Promise<Response> {
//         try {
//             const customerData: SignUpResp = req.body;

//             // Calling the model's signUpCustomer method to create a new customer
//             const newCustomer: SignUpResp = await CCustomerModel.SignUpResp(customerData);

//             // Sending a successful response with the customer details
//             return res.status(201).json({
//                 success: true,
//                 message: 'Customer created successfully',
//                 data: newCustomer
//             });

//         } catch (error) {
//             next(error); // Passing error to the next middleware (error handler)
//         }
    
//     }

    
//     static updateorcreateCustomer: RequestHandler<{}, any, any, ParsedQs, Record<string, any>>;
//     static updateOrCreateCustomer(arg0: string, arg1: RequestHandler<{}, any, any, ParsedQs, Record<string, any>>, updateOrCreateCustomer: any) {
//         throw new Error("Method not implemented.");
//     }

//     static async addCustomer(request: express.Request, response: express.Response, next: express.NextFunction) {
//         try {
//             console.log('In addCustomer() from CCustomerController');
//             const errors = validationResult(request);

//             if (!errors.isEmpty()) {
//                 console.log('Caught in input validation error from CCustomerController => addCustomer()');
//                 return next(new CCustomErrors(new Error('Please provide valid inputs.'), errorTypeEnum.INPUT_VALIDATION_ERROR, errors));
//             }

//             // Filter customer data from request
//             const objFilteredCustomer = CFilterRequest.filterAddNewCustomerRequest(request);

//             // Ensure that objCustomerService.addCustomer accepts objFilteredCustomer type correctly
//             const objSavedCustomer = objCustomerService.addCustomer(objFilteredCustomer);

//             if (objSavedCustomer) {
//                 console.log('Received success response in CCustomerController => addCustomer()');
//                 return response.status(200).send({
//                     status: 200,
//                     message: 'success',
//                     data: {
//                         customerName: objSavedCustomer.customerName,
//                         customerMobileNo: objSavedCustomer.MobileNo,
//                         customerEmail: objSavedCustomer.EmailId,
//                         customerAddress: objSavedCustomer.Address,
//                         customerGSTNo: objSavedCustomer.GSTNo,
//                         customerlogo: objSavedCustomer.customerlogo
//                     }
//                 });
//             }

//             return response.status(400).send({
//                 message: 'Unable to save customer, please try again.'
//             });

//         } catch (error) {
//             return next(error);
//         }
//     }

//     static async getAllCustomers(request: express.Request, response: express.Response, next: express.NextFunction) {
//         try {
//             const errors = validationResult(request);

//             if (!errors.isEmpty()) {
//                 console.log('Caught in input validation error from CCustomerController => getAllCustomers()');
//                 return next(new CCustomErrors(new Error('Please provide valid inputs.'), errorTypeEnum.INPUT_VALIDATION_ERROR, errors));
//             }

//             // Directly convert query parameters to numbers
//             const limit = Number(request.query.limit);
//             const pageNumber = Number(request.query.pageNumber);

//             const arrObjCustomers: Array<getAllCustomers> = await objCustomerService.getAllCustomer(limit, pageNumber);

//             return response.status(200).send({
//                 status: 200,
//                 message: 'success',
//                 data: arrObjCustomers.length > 0 ? arrObjCustomers : []
//             });

//         } catch (error) {
//             return next(error);
//         }
//     }

//     static async filterCustomers(request: express.Request, response: express.Response, next: express.NextFunction) {
//         try {
//             const errors = validationResult(request);

//             if (!errors.isEmpty()) {
//                 console.log('Caught in input validation error from CCustomerController => filterCustomers()');
//                 return next(new CCustomErrors(new Error('Please provide valid inputs.'), errorTypeEnum.INPUT_VALIDATION_ERROR, errors));
//             }

//             // Directly convert query parameters to numbers
//             const limit = Number(request.query.limit);
//             const pageNumber = Number(request.query.pageNumber);

//             const arrCustomerObjs: Array<getAllCustomers> = await objCustomerService.getAllCustomer(limit, pageNumber);

//             return response.status(200).send({
//                 status: 200,
//                 message: 'success',
//                 data: arrCustomerObjs.length > 0 ? arrCustomerObjs : []
//             });

//         } catch (error) {
//             return next(error);
//         }
//     }

//     // Get customer by ID method 
//     static async getCustomerById(req: express.Request, response: express.Response, next: express.NextFunction) {
//         try {
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return next(new CCustomErrors(new Error(errors.array()[0].msg), errorTypeEnum.INPUT_VALIDATION_ERROR));
//             }

//             const customerId = Number(req.params.customerId);
//             const customer = await objCustomerService.getCustomerById(customerId);

//             if (customer) {
//                 console.log('Received success response in CCustomerController => getCustomerById()');
//                 return response.status(200).send({
//                     status: 200,
//                     message: 'success',
//                     data: customer
//                 });
//             }

//             return response.status(404).send({
//                 message: 'Customer not found.'
//             });

//         } catch (error) {
//             return next(error);
//         }
//     }

//     // Adding soft delete method
//     static async softDeleteCustomerById(req: express.Request, res: express.Response, next: express.NextFunction) {
//         try {
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return next(new CCustomErrors(new Error('Validation error'), errorTypeEnum.INPUT_VALIDATION_ERROR, errors.array()));
//             }

//             const customerId = Number(req.params.customerId);
//             const result = await objCustomerService.softDeleteCustomer(customerId);

//             if (result) {
//                 return res.status(200).send({
//                     status: 200,
//                     message: 'Customer soft-deleted successfully.',
//                 });
//             } else {
//                 return res.status(404).send({
//                     message: 'Customer not found.',
//                 });
//             }
//         } catch (error) {
//             return next(error);
//         }
//     }

//     // Update customer method
//     static async updateCustomer(req: express.Request, res: express.Response, next: express.NextFunction) {
//         try {
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({ errors: errors.array() });
//             }

//             const customerId = Number(req.params.customerId);
//             const customerData = req.body;

//             const updatedCustomer = await objCustomerService.updateCustomerById(customerId, customerData);

//             if (updatedCustomer) {
//                 return res.status(200).json({
//                     status: 200,
//                     message: 'Customer updated successfully.',
//                     data: updatedCustomer
//                 });
//             } else {
//                 return res.status(404).json({
//                     message: 'Customer not found.'
//                 });
//             }
//         } catch (error) {
//             return next(error);
//         }
//     }

//     // Delete customer method
//     static async deleteCustomer(req: express.Request, res: express.Response, next: express.NextFunction) {
//         try {
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return next(new CCustomErrors(new Error('Validation error'), errorTypeEnum.INPUT_VALIDATION_ERROR, errors.array()));
//             }

//             const customerId = Number(req.params.customerId);
//             const result = await objCustomerService.deleteCustomer(customerId);

//             if (result) {
//                 return res.status(200).send({
//                     status: 200,
//                     message: 'Customer deleted successfully.'
//                 });
//             } else {
//                 return res.status(404).send({
//                     message: 'Customer not found.'
//                 });
//             }
//         } catch (error) {
//             return next(error);
//         }
//     }


//     static async patchCustomer(req: express.Request, res: express.Response, next: express.NextFunction) {
//         try {
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({ errors: errors.array() });
//             }

//             const customerId = Number(req.params.customerId);
//             const { mobileNo, email } = req.body;

//             // Only include mobileNo and email for patching
//             const updateData: Partial<{ mobileNo: string; email: string }> = {};
//             if (mobileNo) updateData.mobileNo = mobileNo;
//             if (email) updateData.email = email;

//             const updatedCustomer = await objCustomerService.patchCustomerById(customerId, updateData);

//             if (updatedCustomer) {
//                 return res.status(200).json({
//                     status: 200,
//                     message: 'Customer details updated successfully.',
//                     data: updatedCustomer,
//                 });
//             } else {
//                 return res.status(404).json({
//                     message: 'Customer not found.',
//                 });
//             }
//         } catch (error) {
//             return next(error);
//         }
//     }



// }












































































































