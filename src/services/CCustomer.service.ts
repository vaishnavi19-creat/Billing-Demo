import { errorTypeEnum } from "../enums/errorType.enum";
import { CCustomErrors } from "../helpers/CCustomErrors.helper";
import { SignUpResp } from "../interfaces/CCustomer.interface";
import { CCustomerModel } from "../db/models/CCustomer.model";
import { DeleteResult, getRepository } from "typeorm"; // getRepository for fetching repository
import { CCustomerEntities } from "../db/entities/CCustomer.entities";


const objCustomerModel = new CCustomerModel();

export class CCustomerService {
    addCustomer: any;
    repository: any;
    customerModel: any;
    static updateCustomerById(customerId: any, customerData: ReadableStream<Uint8Array>) {
        throw new Error("Method not implemented.");
    }

    async addNewCustomer(request: SignUpResp) {
        try {
            console.log('In CCustomerService => addNewCustomer() ');

            const existingCustomerMobileNo = await this.getCustomerDetailsByCustomerMobileNo(request.customerMobileNo);
            if (existingCustomerMobileNo) {
                console.log('Caught in input validation error from CCustomerService => addNewCustomer() existing mobile number');
                const duplicateMobileNoError = {
                    errors: [
                        {
                            value: existingCustomerMobileNo.customerMobileNo,
                            msg: `The customer mobile number ${existingCustomerMobileNo.customerMobileNo} already exists. Please try with another number.`,
                            param: "customerMobileNo",
                            location: "body"
                        }
                    ]
                };
                throw new CCustomErrors(
                    new Error(`The mobile number ${existingCustomerMobileNo.customerMobileNo} already exists.`),
                    errorTypeEnum.INPUT_VALIDATION_ERROR,
                    duplicateMobileNoError
                );
            }

            // Validate email ID uniqueness
            const existingCustomerEmailId = await this.getCustomerDetailsByCustomerEmailId(request.customerEmailId);
            if (existingCustomerEmailId) {
                console.log('Caught in input validation error from CCustomerService => addNewCustomer() existing email id');
                const duplicateEmailIdError = {
                    errors: [
                        {
                            value: existingCustomerEmailId.customerEmailId,
                            msg: `The customer email id ${existingCustomerEmailId.customerEmailId} already exists. Please try with another email id.`,
                            param: "customerEmailId",
                            location: "body"
                        }
                    ]
                };
                throw new CCustomErrors(
                    new Error(`The email id ${existingCustomerEmailId.customerEmailId} already exists.`),
                    errorTypeEnum.INPUT_VALIDATION_ERROR,
                    duplicateEmailIdError
                );
            }

            // Save the new customer
            const savedCustomer = await objCustomerModel.addCustomer(request);
            console.log(JSON.stringify(savedCustomer));
            
            return savedCustomer;
        } catch (error) {
            throw error;
        }
    }

    async getCustomerDetailsByName(customerName: string) {
        try {
            console.log('Validating existing customer from CCustomerService => getCustomerDetailsByName()');
            return await objCustomerModel.getCustomerDetailsByName({ customerName });
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    async getCustomerDetailsByCustomerMobileNo(customerMobileNo: string) {
        try {
            console.log('Validating existing mobile number from CCustomerService => getCustomerDetailsByCustomerMobileNo()');
            return await objCustomerModel.getCustomerDetailsByMobileNumber(customerMobileNo);
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    async getCustomerDetailsByCustomerEmailId(customerEmailId: string) {
        try {
            console.log('Validating existing email id from CCustomerService => getCustomerDetailsByCustomerEmailId()');
            return await objCustomerModel.getCustomerDetailsByEmailId(customerEmailId);
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    async getAllCustomer(limit: number = 10, pageNumber: number = 1) {
        try {
            console.log('Retrieving all customers from CCustomerService => getAllCustomer()');
            return await objCustomerModel.getAllCustomers(limit, pageNumber);
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    // Method added to get customer by ID
    async getCustomerById(customerId: number) { 
        try {
            console.log('Retrieving customer by Id from CCustomerService => getCustomerById()');
            return await objCustomerModel.getCustomerById(customerId); 
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    // Soft delete customer by Id
    async softDeleteCustomer(customerId: number): Promise<DeleteResult> {
        try {
            console.log('Soft deleting customer from CCustomerService => softDeleteCustomer()');
            return await objCustomerModel.softDeleteCustomer(customerId); // Returning result
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    // Service method to update customer by ID
    public async updateCustomerById(customerId: number, customerData: Partial<SignUpResp>): Promise<SignUpResp | null> {
        try {
            return await this.customerModel.putCustomer(customerId, customerData); // Call the model's update method
        } catch (error) {
            console.error(`Error updating customer with ID ${customerId}:`, error);
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR); 
        }
    }
}


















































// import { errorTypeEnum } from "../enums/errorType.enum";
// import { CCustomErrors } from "../helpers/CCustomErrors.helper";
// import { SignUpResp } from "../interfaces/CCustomer.interface";
// import { CCustomerModel } from "../db/models/CCustomer.model";
// import { DeleteResult, getRepository } from "typeorm";

// const objCustomerModel = new CCustomerModel();

// export class CCustomerService {
//     static updateCustomerById(customerId: any, customerData: ReadableStream<Uint8Array>) {
//         throw new Error("Method not implemented.");
//     }
//     [x: string]: any;

//     async addNewCustomer(request: SignUpResp) {
//         try {
//             console.log('In CCustomerService => signUp() ');

//             const existingCustomerMobileNo = await this.getCustomerDetailsByCustomerMobileNo(request.customerMobileNo);
//             if (existingCustomerMobileNo) {
//                 console.log('Caught in input validation error from CCustomerService => signUp() existing mobile number');
//                 const duplicateMobileNoError = {
//                     errors: [
//                         {
//                             value: existingCustomerMobileNo.customerMobileNo,
//                             msg: `The customer mobile number ${existingCustomerMobileNo.customerMobileNo} already exists. Please try with another number.`,
//                             param: "customerMobileNo",
//                             location: "body"
//                         }
//                     ]
//                 };
//                 throw new CCustomErrors(
//                     new Error(`The mobile number ${existingCustomerMobileNo.customerMobileNo} already exists.`),
//                     errorTypeEnum.INPUT_VALIDATION_ERROR,
//                     duplicateMobileNoError
//                 );
//             }

//             // Validate email ID uniqueness
//             const existingCustomerEmailId = await this.getCustomerDetailsByCustomerEmailId(request.customerEmailId);
//             if (existingCustomerEmailId) {
//                 console.log('Caught in input validation error from CCustomerService => signUp() existing email id');
//                 const duplicateEmailIdError = {
//                     errors: [
//                         {
//                             value: existingCustomerEmailId.customerEmailId,
//                             msg: `The customer email id ${existingCustomerEmailId.customerEmailId} already exists. Please try with another email id.`,
//                             param: "customerEmailId",
//                             location: "body"
//                         }
//                     ]
//                 };
//                 throw new CCustomErrors(
//                     new Error(`The email id ${existingCustomerEmailId.customerEmailId} already exists.`),
//                     errorTypeEnum.INPUT_VALIDATION_ERROR,
//                     duplicateEmailIdError
//                 );
//             }

//             // Save the new customer
//             const savedCustomer = await objCustomerModel.addCustomer(request);
//             console.log(JSON.stringify(savedCustomer));
            
//             return savedCustomer;
//         } catch (error) {
//             throw error;
//         }
//     }


//     async getCustomerDetailsByName(customerName: string) {
//         try {
//             console.log('Validating existing customer from CCustomerService => getCustomerDetailsByName()');
//             return await objCustomerModel.getCustomerDetailsByName({ customerName });
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     async getCustomerDetailsByCustomerMobileNo(customerMobileNo: string) {
//         try {
//             console.log('Validating existing mobile number from CCustomerService => getCustomerDetailsByCustomerMobileNo()');
//             return await objCustomerModel.getCustomerDetailsByMobileNumber(customerMobileNo);
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     async getCustomerDetailsByCustomerEmailId(customerEmailId: string) {
//         try {
//             console.log('Validating existing email id from CCustomerService => getCustomerDetailsByCustomerEmailId()');
//             return await objCustomerModel.getCustomerDetailsByEmailId(customerEmailId);
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     async getAllCustomer(limit: number = 10, pageNumber: number = 1) {
//         try {
//             console.log('Retrieving all customers from CCustomerService => getAllCustomer()');
//             return await objCustomerModel.getAllCustomers(limit, pageNumber);
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     //added for get customer

//     async getCustomerById(customerId: number) { 
//         try {
//             console.log('Retrieving customer by Id from CCustomerService => getCustomerById()');
//             return await objCustomerModel.getCustomerById(customerId); 
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }


//     }



//     //for soft deleting customer by Id
//     async softDeleteCustomer(customerId: number) {
//         try {
//             console.log('Soft deleting customer from CCustomerService => softDeleteCustomer()');
//              return await objCustomerModel.softDeleteCustomer(customerId);
//             // return result;
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }



//     // Method to update customer by ID
//         async updateCustomerById(customerId: string, customerData: Partial<Customer>): Promise<Customer | null> {
//         const customerRepository = getRepository(customer);
//         const customer = await customerRepository.findOne(customerId);

//         if (customer) {
//             // Update the customer properties
//             Object.assign(customer, customerData);
//             await customerRepository.save(customer); // Save the updated customer
//             return customer;
//         }
//         return null; // Return null if the customer wasn't found
//     }
    
// }






















































































// import { CCustomerModel } from "../db/models/CCustomer.model";
// import { errorTypeEnum } from "../enums/errorType.enum";
// import { CCustomErrors } from "../helpers/CCustomErrors.helper";
// import { SignUpReq } from "../interfaces/CCustomer.interface";  

// const objCustomerModel = new CCustomerModel();

// export class CCustomerService {
//     static getAllCustomers(arg0: number, arg1: number): import("../interfaces/CCustomer.interface").getAllCustomers[] | PromiseLike<import("../interfaces/CCustomer.interface").getAllCustomers[]> {
//         throw new Error("Method not implemented.");
//     }

//     static addCustomer(objFilteredCustomer: void) {
//         throw new Error("Method not implemented.");
//     }

//     addCustomer(objFilteredCustomer: void) {
//         throw new Error("Method not implemented.");
//     }

//     async signUp(request: SignUpReq) {
//         try {
//             console.log('In CCustomerService => signUp() ');

//             const existingCustomer = await this.getCustomerDetailsByNameZipCode(request.customerName, request.customerCityZipCode);
//             if (existingCustomer) {
//                 console.log('Caught in input validation error from CCustomerService => signUp() existing customer name');
//                 throw new CCustomErrors(new Error(`The customer ${existingCustomer.customerName} already exists in the same city.`), errorTypeEnum.INPUT_VALIDATION_ERROR, []);
//             }

            
//             const existingCustomerMobileNumber = await this.getCustomerDetailsByCustomerMobileNumber(request.customerMobileNo);
//             if (existingCustomerMobileNumber) {
//                 console.log('Caught in input validation error from CCustomerService => signUp() existing mobile number');
//                 const duplicateMobileNumberError = {
//                     "errors": [{
//                         "value": existingCustomerMobileNumber.customerMobileNo,
//                         "msg": `The customer mobile number ${existingCustomerMobileNumber.customerMobileNo} already exists. Please try with another number.`,
//                         "param": "customerMobileNo",
//                         "location": "body"
//                     }]
//                 };
//                 throw new CCustomErrors(new Error(`The mobile number ${existingCustomerMobileNumber.customerMobileNo} already exists.`), errorTypeEnum.INPUT_VALIDATION_ERROR, duplicateMobileNumberError);
//             }

          
//             const existingCustomerEmailId = await this.getCustomerDetailsByCustomerEmailId(request.customerEmailId);
//             if (existingCustomerEmailId) {
//                 console.log('Caught in input validation error from CCustomerService => signUp() existing email id');
//                 const duplicateEmailIdError = {
//                     "errors": [{
//                         "value": existingCustomerEmailId.customerEmailId,
//                         "msg": `The customer email id ${existingCustomerEmailId.customerEmailId} already exists. Please try with another email id.`,
//                         "param": "customerEmailId",
//                         "location": "body"
//                     }]
//                 };
//                 throw new CCustomErrors(new Error(`The email id ${existingCustomerEmailId.customerEmailId} already exists.`), errorTypeEnum.INPUT_VALIDATION_ERROR, duplicateEmailIdError);
//             }

//             // Save the new customer details
//             const savedCustomer = await objCustomerModel.signUp({
//                 customerAddress: request.customerAddress,
//                 GSTNo: request.GSTNo,
//                 logo: request.logo,
//                 customerName: request.customerName,
//                 customerMobileNo: request.customerMobileNo,
//                 customerEmailId: request.customerEmailId,

//                 customerCity: "",
//                 customerCityZipCode: "",
//                 customerGSTNumber: "",
//                 customerlogo: ""
//             });
//             console.log(await JSON.stringify(savedCustomer));

//             return savedCustomer;
//         } catch (error) {
//             throw error;
//         }
//     }

//     async getCustomerDetailsByNameZipCode(customerName: string, customerCityZipCode: string) {
//         try {
//             console.log('Validating existing customer from CCustomerService => getCustomerDetailsByNameZipCode()');
//             return await objCustomerModel.getCustomerDetailsByName(customerName, customerCityZipCode);
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     async getCustomerDetailsByCustomerMobileNumber(customerMobileNumber: string) {
//         try {
//             console.log('Validating existing mobile number from CCustomerService => getCustomerDetailsByCustomerMobileNumber()');
//             return await objCustomerModel.getCustomerDetailsByMobileNumber(customerMobileNumber);
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     async getCustomerDetailsByCustomerEmailId(customerEmailId: string) {
//         try {
//             console.log('Validating existing email id from CCustomerService => getCustomerDetailsByCustomerEmailId()');
//             return await objCustomerModel.getCustomerDetailsByEmailId(customerEmailId);
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     async getAllCustomers(limit: number = 10, pageNumber: number = 1) {
//         try {
//             console.log('Retrieving all customers from CCustomerService => getAllCustomers()');
//             return await objCustomerModel.getAllCustomers(limit, pageNumber);
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }
// }





























// import { errorTypeEnum } from "../enums/errorType.enum";
// import { CCustomErrors } from "../helpers/CCustomErrors.helper";
// import { SignUpReq } from "../interfaces/CShop.interface";
// import { CShopModel } from "../db/models/CShop.model";
// import { CCustomerModel } from "../db/models/CCustomer.model";


// const objShopModel = new CShopModel();
// export class CShopService {

//     async signUp(request: SignUpReq) {
//         try {
//             console.log('In CShopService => signUp() ');
//             const existingShop = await this.getShopDetailsByNameZipCode(request.shopName, request.shopCityZipCode);
//             if (existingShop) {
//                 console.log('Cought in input validation error from CShopService => signUp() existing shop name');
//                 throw (new CCustomErrors(new Error(`The shop ${existingShop.shopName} already exists in the same city. Please confirm if you are ${existingShop.shopOwnerName} and may forgot the credentials.`), errorTypeEnum.INPUT_VALIDATION_ERROR, []));
//             }

//             const existingShopMobileNumber = await this.getShopDetailsByShopMobileNumber(request.shopMobileNumber);
//             if (existingShopMobileNumber) {
//                 console.log('Cought in input validation error from CShopService => signUp() existing mobile number');
//                 const duplicateMobileNumberError = {"errors": [{
//                         "value": existingShopMobileNumber.shopMobileNumber,
//                         "msg": `The shop mobile number ${existingShopMobileNumber.shopMobileNumber} is already exists. Please try with another number.`,
//                         "param": "shopMobileNumber",
//                         "location": "body"
//                 }]};

//                 throw (new CCustomErrors(new Error(`The mobile number ${existingShopMobileNumber.shopMobileNumber} already exists. Please provide another mobile number.`), errorTypeEnum.INPUT_VALIDATION_ERROR, duplicateMobileNumberError));
//             }

//             const existingShopEmailId = await this.getShopDetailsByShopEmailId(request.shopEmailId);
//             if (existingShopEmailId) {
//                 console.log('Cought in input validation error from CShopService => signUp() existing email id');
//                 const duplicateEmailIdError = {"errors": [{
//                         "value": existingShopEmailId.shopEmailId,
//                         "msg": `The shop email id ${existingShopEmailId.shopEmailId} is already exists. Please try with another email id.`,
//                         "param": "shopEmailId",
//                         "location": "body"
//                 }]};

//                 throw (new CCustomErrors(new Error(`The email id ${existingShopEmailId.shopEmailId} already exists. Please provide another email id.`), errorTypeEnum.INPUT_VALIDATION_ERROR, duplicateEmailIdError));
//             }

//             const savedShop = await objShopModel.signUp(request);
//             console.log(await JSON.stringify(savedShop));

//             return savedShop;
//         } catch (error) {
//             throw (error);
//         }
//     }

//     async getShopDetailsByNameZipCode(shopName: string, shopCityZipCode: string) {
//         try {
//             console.log('Validating existing shop from CShopService => getShopDetailsByNameZipCode()');

//             return await objShopModel.getShopDetailsByNameZipCode(shopName, shopCityZipCode);
//         } catch (error) {
//             throw (new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR));
//         }

//     }

//     async getShopDetailsByShopMobileNumber(shopMobileNumber: string) {
//         try {
//             console.log('Validating existing mobile number from CShopService => getShopDetailsByShopMobileNumber()');

//             return await objShopModel.getShopDetailsByShopMobileNumber(shopMobileNumber);
//         } catch (error) {
//             throw (new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR));
//         }

//     }

//     async getShopDetailsByShopEmailId(shopEmailId: string) {
//         try {
//             console.log('Validating existing email id from CShopService => getShopDetailsByShopEmailId()');

//             return await objShopModel.getShopDetailsByShopEmailId(shopEmailId);
//         } catch (error) {
//             throw (new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR));
//         }

//     }

//     async getAllShops(limit: number = 10, pageNumber: number = 1) {
//         try {
//             console.log('Validating existing email id from CShopService => getAllShops()');

//             return await objShopModel.getAllShops(limit, pageNumber);
//         } catch (error) {
//             throw (new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR));
//         }

//     }

// }
