import { errorTypeEnum } from "../enums/errorType.enum";
import { CCustomErrors } from "../helpers/CCustomErrors.helper";
import { VendorReq, VendorResp } from "../interfaces/Vendor.interface";
import { VendorModel } from "../db/models/Vendor.model";
import { DeleteResult } from "typeorm";

const objVendorModel = new VendorModel();

export class VendorService {
    [x: string]: any;
    // Method to add a new vendor
    async addNewVendor(request: VendorReq): Promise<VendorResp> {
        try {
            console.log('In VendorService => addNewVendor()');
            
            // Validate email ID uniqueness
            const existingVendorEmail = await this.getVendorDetailsByEmailId(request.email);
            if (existingVendorEmail) {
                console.log('Caught in input validation error from VendorService => addNewVendor() existing email');
                const duplicateEmailError = {
                    errors: [
                        {
                            value: existingVendorEmail.email,
                            msg: `The vendor email ${existingVendorEmail.email} already exists. Please try with another email.`,
                            param: "email",
                            location: "body"
                        }
                    ]
                };
                throw new CCustomErrors(
                    new Error(`The email ${existingVendorEmail.email} already exists.`),
                    errorTypeEnum.INPUT_VALIDATION_ERROR,
                    duplicateEmailError
                );
            }
    
            // Validate phone number uniqueness
            const existingVendorPhone = await this.getVendorDetailsByPhoneNumber(request.phoneNumber);
            if (existingVendorPhone) {
                console.log('Caught in input validation error from VendorService => addNewVendor() existing phone number');
                const duplicatePhoneError = {
                    errors: [
                        {
                            value: existingVendorPhone.phoneNumber,
                            msg: `The vendor phone number ${existingVendorPhone.phoneNumber} already exists. Please try with another number.`,
                            param: "phoneNumber",
                            location: "body"
                        }
                    ]
                };
                throw new CCustomErrors(
                    new Error(`The phone number ${existingVendorPhone.phoneNumber} already exists.`),
                    errorTypeEnum.INPUT_VALIDATION_ERROR,
                    duplicatePhoneError
                );
            }
    
            // Save the new vendor
            const savedVendor = await objVendorModel.addVendor(request); 
            console.log(JSON.stringify(savedVendor));
    
            return savedVendor; 
        } catch (error) {
            throw error;
        }
    }
    

    // Method to retrieve vendor details by email
    async getVendorDetailsByEmailId(email: string): Promise<VendorResp | null> { 
        try {
            console.log('Validating existing vendor from VendorService => getVendorDetailsByEmailId()');
            const vendorDetails = await objVendorModel.getVendorDetailsByEmailId(email);
            if (!vendorDetails) {
                return null; 
            }
            return vendorDetails; 
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    // Method to retrieve vendor details by phone number
    async getVendorDetailsByPhoneNumber(phoneNumber: string): Promise<VendorResp | null> { 
        try {
            console.log('Validating existing vendor from VendorService => getVendorDetailsByPhoneNumber()');
            const vendorDetails = await objVendorModel.getVendorDetailsByMobileNumber(phoneNumber);
            if (!vendorDetails) {
                return null; 
            }
            return vendorDetails; 
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    // Method to get all vendors with pagination
    async getAllVendors(limit: number = 10, pageNumber: number = 1): Promise<VendorResp[]> {
        try {
            console.log('Retrieving all vendors from VendorService => getAllVendors()');
            return await objVendorModel.getAllVendors(limit, pageNumber);
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    // Method to retrieve vendor by ID
    async getVendorById(vendorId: number): Promise<VendorResp | null> {
        try {
            console.log('Retrieving vendor by ID from VendorService => getVendorById()');
            return await objVendorModel.getVendorById(vendorId);
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    // Method to soft delete vendor by ID
    async softDeleteVendor(vendorId: number): Promise<DeleteResult> {
        try {
            console.log('Soft deleting vendor from VendorService => softDeleteVendor()');
            return await objVendorModel.softDeleteVendor(vendorId); // Ensure this returns a DeleteResult
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    // Method to update vendor by ID
    public async updateVendorById(vendorId: number, vendorData: Partial<VendorReq>): Promise<VendorResp | null> {
        try {
            console.log('Updating vendor from VendorService => updateVendorById()');
            return await objVendorModel.putVendor(vendorId, vendorData); 
        } catch (error) {
            console.error(`Error updating vendor with ID ${vendorId}:`, error);
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }
}










































// import { errorTypeEnum } from "../enums/errorType.enum";
// import { CCustomErrors } from "../helpers/CCustomErrors.helper";
// import { VendorReq } from "../interfaces/Vendor.interface";
// import { VendorModel, Vendor } from "../db/models/Vendor.model";
// import { DeleteResult } from "typeorm";

// // Creating an instance of VendorModel for interacting with the database
// const objVendorModel = new VendorModel();

// export class CVendorService {
//     addVendor: any;
//     vendorModel: any;

//     // Method to create a new vendor
//     async createNewVendor(vendorData: VendorReq): Promise<VendorReq> {
//         try {
//             console.log('In CVendorService => createNewVendor()');

//             // Check if the vendor email already exists
//             const existingVendorEmail = await this.getVendorDetailsByEmail(vendorData.email);
//             if (existingVendorEmail) {
//                 console.log('Caught in input validation error from CVendorService => createNewVendor() existing email id');
//                 const duplicateEmailError = {
//                     errors: [
//                         {
//                             value: existingVendorEmail.email,
//                             msg: `The vendor email ${existingVendorEmail.email} already exists. Please try with another email.`,
//                             param: "email",
//                             location: "body"
//                         }
//                     ]
//                 };
//                 throw new CCustomErrors(
//                     new Error(`The email id ${existingVendorEmail.email} already exists.`),
//                     errorTypeEnum.INPUT_VALIDATION_ERROR,
//                     duplicateEmailError
//                 );
//             }

//             // Save the new vendor
//             const savedVendor = await objVendorModel.addVendor(vendorData);
//             console.log(JSON.stringify(savedVendor));

//             // Convert the saved vendor to VendorReq type if necessary
//             return {
//                 ...savedVendor,
//                 userId: vendorData.userId // Ensure userId is included in the response
//             };
//         } catch (error) {
//             throw error;
//         }
//     }

//     // Method to get vendor by ID
//     async getVendorById(vendorId: number): Promise<VendorReq | null> {
//         try {
//             console.log('Retrieving vendor by Id from CVendorService => getVendorById()');
//             const vendor = await objVendorModel.getVendorById(vendorId);

//             if (!vendor) return null;

//             // Map Vendor to VendorReq
//             return {
//                 ...vendor,
//                 userId: vendor.user // Ensure userId is present
//             };
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     // Method to get all vendors with pagination
//     async getAllVendors(limit: number = 10, pageNumber: number = 1): Promise<VendorReq[]> {
//         try {
//             console.log('Retrieving all vendors from CVendorService => getAllVendors()');
//             const vendors: Vendor[] = await objVendorModel.getAllVendors(limit, pageNumber);

//             // Map Vendor to VendorReq array
//             return vendors.map(vendor => ({
//                 ...vendor,
//                 userId: vendor.userId // Ensure userId is included in the mapped result
//             }));
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     // Soft delete vendor by ID
//     async softDeleteVendor(vendorId: number): Promise<DeleteResult> {
//         try {
//             console.log('Soft deleting vendor from CVendorService => softDeleteVendor()');
//             return await objVendorModel.softDeleteVendor(vendorId);
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     // Method to update a vendor by ID
//     public async updateVendorById(vendorId: number, vendorData: Partial<VendorReq>): Promise<VendorReq | null> {
//         try {
//             console.log('Updating vendor from CVendorService => updateVendorById()');
//             const updatedVendor = await this.vendorModel.updateVendor(vendorId, vendorData);

//             if (!updatedVendor) return null;

//             // Map updated vendor to VendorReq
//             return {
//                 ...updatedVendor,
//                 userId: updatedVendor.userId // Ensure userId is present
//             };
//         } catch (error) {
//             console.error(`Error updating vendor with ID ${vendorId}:`, error);
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     // Method to get vendor details by email for validation
//     async getVendorDetailsByEmail(email: string): Promise<VendorReq | null> {
//         try {
//             console.log('Validating existing email from CVendorService => getVendorDetailsByEmail()');
//             const vendor = await objVendorModel.getVendorByEmail(email);

//             if (!vendor) return null;

//             // Map Vendor to VendorReq
//             return {
//                 ...vendor,
//                 userId: vendor.userId // Ensure userId is included
//             };
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }
// }
