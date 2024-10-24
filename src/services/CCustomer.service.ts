import { errorTypeEnum } from "../enums/errorType.enum";
import { CCustomErrors } from "../helpers/CCustomErrors.helper";
import { SignUpResp } from "../interfaces/CCustomer.interface";
import { CCustomerModel } from "../db/models/CCustomer.model";
import { DeleteResult, getRepository } from "typeorm";
import { CCustomerEntities } from "../db/entities/CCustomer.entities";

const objCustomerModel = new CCustomerModel();

export class CCustomerService {
   
    addCustomer: any;
    repository: any;
    customerModel: any;
    customerRepository: any;

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

    async getCustomerById(customerId: number) { 
        try {
            console.log('Retrieving customer by Id from CCustomerService => getCustomerById()');
            return await objCustomerModel.getCustomerById(customerId); 
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    async softDeleteCustomer(customerId: number): Promise<DeleteResult> {
        try {
            console.log('Soft deleting customer from CCustomerService => softDeleteCustomer()');
            return await objCustomerModel.softDeleteCustomer(customerId);
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    public async updateCustomerById(customerId: number, customerData: Partial<SignUpResp>): Promise<SignUpResp | null> {
        try {
            return await this.customerModel.putCustomer(customerId, customerData);
        } catch (error) {
            console.error(`Error updating customer with ID ${customerId}:`, error);
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR); 
        }
    }
      
    // Method to delete a customer by ID  
    async deleteCustomer(customerId: number): Promise<DeleteResult> {
        try {
            console.log('Soft deleting customer from CCustomerService => deleteCustomer()');
            return await objCustomerModel.deleteCustomer(customerId);
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    // Patch customer method
    async patchCustomerById(
        customerId: number,
        updateData: Partial<{ mobileNo: string; email: string }>
    ): Promise<CCustomerEntities | null> {
        const customer = await this.customerRepository.findOneBy({ id: customerId });
        if (!customer) {
            return null;
        }

        // Update only the  (mobileNo, email)
        if (updateData.mobileNo) {
            customer.mobileNo = updateData.mobileNo;
        }
        if (updateData.email) {
            customer.email = updateData.email;
        }

        return await this.customerRepository.save(customer);
    }


}

























































// import { errorTypeEnum } from "../enums/errorType.enum";
// import { CCustomErrors } from "../helpers/CCustomErrors.helper";
// import { SignUpResp } from "../interfaces/CCustomer.interface";
// import { CCustomerModel } from "../db/models/CCustomer.model";
// import { DeleteResult, getRepository } from "typeorm"; // getRepository for fetching repository
// import { CCustomerEntities } from "../db/entities/CCustomer.entities";


// const objCustomerModel = new CCustomerModel();

// export class CCustomerService {
//     addCustomer: any;
//     repository: any;
//     customerModel: any;
//     static updateCustomerById(customerId: any, customerData: ReadableStream<Uint8Array>) {
//         throw new Error("Method not implemented.");
//     }

//     async addNewCustomer(request: SignUpResp) {
//         try {
//             console.log('In CCustomerService => addNewCustomer() ');

//             const existingCustomerMobileNo = await this.getCustomerDetailsByCustomerMobileNo(request.customerMobileNo);
//             if (existingCustomerMobileNo) {
//                 console.log('Caught in input validation error from CCustomerService => addNewCustomer() existing mobile number');
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
//                 console.log('Caught in input validation error from CCustomerService => addNewCustomer() existing email id');
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

//     // Method added to get customer by ID
//     async getCustomerById(customerId: number) { 
//         try {
//             console.log('Retrieving customer by Id from CCustomerService => getCustomerById()');
//             return await objCustomerModel.getCustomerById(customerId); 
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     // Soft delete customer by Id
//     async softDeleteCustomer(customerId: number): Promise<DeleteResult> {
//         try {
//             console.log('Soft deleting customer from CCustomerService => softDeleteCustomer()');
//             return await objCustomerModel.softDeleteCustomer(customerId); // Returning result
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     // Service method to update customer by ID
//     public async updateCustomerById(customerId: number, customerData: Partial<SignUpResp>): Promise<SignUpResp | null> {
//         try {
//             return await this.customerModel.putCustomer(customerId, customerData); // Call the model's update method
//         } catch (error) {
//             console.error(`Error updating customer with ID ${customerId}:`, error);
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
