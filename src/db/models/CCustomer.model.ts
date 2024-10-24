import { CCustomerEntities } from "../entities/CCustomer.entities";
import AppDataSource from "../dataSource";
import { SignUpResp, getAllCustomers, getCustomerDetailsByCustomerEmailIdResp,getCustomerDetailsByCustomerNameResp } from "../../interfaces/CCustomer.interface";  
import { DeleteResult } from "typeorm";

export class CCustomerModel {
    // import { CCustomerEntities } from "../entities/CCustomer.entities";
    // import AppDataSource from "../dataSource";
    // import { SignUpReq, SignUpResp, getAllCustomers, getCustomerDetailsByCustomerEmailIdResp, getCustomerDetailsByCustomerNameResp } from "../../interfaces/CCustomer.interface";  
    // export class CCustomerModel {
    //     addCustomer(request: SignUpReq) {
    //         throw new Error("Method not implemented.");
    //     }  
    //     protected repository;
    //     addNewCustomer: any;
    //     constructor() {
    //         this.repository = AppDataSource.getRepository( CCustomerEntities );  
    //     }
    //     public async addustomer(objNewCustomer: SignUpReq): Promise<SignUpResp> {
    //         try {
    //             console.log('Jumped in CCustomerModel => signUp()');
    //             const { customerId, customerName, customerAddress, customerMobileNo, customerEmailId, customerGSTNo, customerlogo } = await this.repository.save(objNewCustomer);
    //             return { customerId, customerName, customerAddress, customerMobileNo: customerMobileNo,  customerEmailId, customerGSTNo, customerlogo };
    //         } catch (error) {
    //             throw new Error(error);
    //         }
    //     }
    //     public async getCustomerDetailsByName({ customerName}: { customerName: string;}): Promise<getCustomerDetailsByCustomerNameResp> {  
    //         try{
    //             console.log('Jumped in CCustomerModel => getCustomerDetailsByName()');  
    //             return await this.repository.findOne({
    //                 select: {
    //                     customerId: true,
    //                     customerName: true,
    //                     customerOwnerName: true
    //                 },
    //                 where: {
    //                     customerName: customerName,
    //                 }
    //             });
    //         } catch(error) {
    //             throw new Error( error );
    //         }
    //     }
    //     public async getCustomerDetailsByMobileNumber(customerMobileNumber: string): Promise<getCustomerDetailsByCustomerNameResp> {  
    //         try{
    //             console.log('Jumped in CCustomerModel => getCustomerDetailsByMobileNumber()'); 
    //             return await this.repository.findOne({
    //                 select: {
    //                     customerId: true,
    //                     customerName: true,
    //                     customerOwnerName: true,
    //                     customerMobileNumber: true
    //                 },
    //                 where: {
    //                     customerMobileNumber: customerMobileNumber  
    //                 }
    //             });
    //         } catch(error) {
    //             throw new Error( error );
    //         }
    //     }
    //     public async getCustomerDetailsByEmailId(customerEmailId: string): Promise<getCustomerDetailsByCustomerEmailIdResp> {  
    //         try{
    //             console.log('Jumped in CCustomerModel => getCustomerDetailsByEmailId()'); 
    //             return await this.repository.findOne({
    //                 select: {
    //                     customerId: true,
    //                     customerName: true,
    //                     customerOwnerName: true,
    //                     customerEmailId: true
    //                 },
    //                 where: {
    //                     customerEmailId: customerEmailId  
    //                 }
    //             });
    //         } catch(error) {
    //             throw new Error( error );
    //         }
    //     }
    //     public async getAllCustomers(limit: number = 10, pageNumber: number = 1): Promise<getAllCustomers[]> {  
    //         try{
    //             console.log('Jumped in CCustomerModel => getAllCustomers()');  
    //             const skip = (limit * pageNumber) - limit;
    //             return await this.repository
    //             .createQueryBuilder('customer')  
    //             .leftJoinAndSelect('customer.customerTypeStatic', 'customerType')  
    //             .select(['customer.customerId', 'customer.customerName', 'customer.customerOwnerName', 'customer.customerMobileNumber', 'customer.customerEmailId', 'customer.GSTNo', 'customer.logo', 'customerType.customerTypeShortDescription'])  // Updated fields
    //             .skip(skip)
    //             .take(limit)
    //             .getMany();
    //         } catch(error) {
    //             throw new Error( error );
    //         }
    //     }
    // }
    deleteCustomer(customerId: number): DeleteResult | PromiseLike<DeleteResult> {
        throw new Error("Method not implemented.");
    }
    updateCustomer(customerId: number, updatedData: SignUpResp) {
        throw new Error("Method not implemented.");
    }



    // Change made here for get customer
    getCustomerById(customerId: number): Promise<getCustomerDetailsByCustomerEmailIdResp | null> { 
        try {
            console.log('Jumped in CCustomerModel => getCustomerById()');
            return this.repository.findOne({
                select: {
                    customerId: true,
                    customerName: true,
                    customerOwnerName: true,
                    customerMobileNumber: true,
                    customerEmailId: true
                },
                where: {
                    customerId: customerId,
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }


//changes made here for soft delete method

    public async softDeleteCustomer(customerId: number): Promise<DeleteResult> {
        try {
            console.log('Jumped in CCustomerModel => softDeleteCustomer()');
            return await this.repository.update(customerId, { customerStatus: false });
        } catch (error) {
            throw new Error(error);
        }
    }

    // Method for update customer by ID
    public async putCustomer({ customerId, updatedData }: { customerId: number; updatedData: Partial<SignUpResp>; }): Promise<SignUpResp | null> {
        try {
            console.log('Jumped in CCustomerModel => putCustomer()');
            const customer = await this.repository.findOne({ where: { customerId } });
            if (!customer) {
                return null; // Return null if the customer doesn't exist
            }
            Object.assign(customer, updatedData); // Update the customer with new data
            await this.repository.save(customer); // Save the updated customer
            return customer; // Return the updated customer
        } catch (error) {
            throw new Error(error);
        }
    }


    addCustomer(request: SignUpResp) {
        return this.addCustomer(request); 
    }  

    protected repository;
    addNewCustomer: any;

    constructor() {
        this.repository = AppDataSource.getRepository(CCustomerEntities);  
    }


    
    public async addcustomer(objNewCustomer: SignUpResp): Promise<SignUpResp> {
        try {
            console.log('Jumped in CCustomerModel => addCustomer()');
    
            const { customerId, customerName, customerAddress, customerMobileNo, customerEmailId, customerGSTNo, customerlogo } = await this.repository.save(objNewCustomer);
            return { customerId, customerName, customerAddress, customerMobileNo, customerEmailId, customerGSTNo, customerlogo };
        
        } catch (error) {
            throw new Error(error);
        }
    }
    
    public async getCustomerDetailsByName({ customerName }: { customerName: string; }): Promise<getCustomerDetailsByCustomerNameResp> {  
        try {
            console.log('Jumped in CCustomerModel => getCustomerDetailsByName()');  

            return await this.repository.findOne({
                select: {
                    customerId: true,
                    customerName: true,
                    customerOwnerName: true
                },
                where: {
                    customerName: customerName,
                }
            });

        } catch (error) {
            throw new Error(error);
        }
    }

    public async getCustomerDetailsByMobileNumber(customerMobileNumber: string): Promise<getCustomerDetailsByCustomerNameResp> {  
        try {
            console.log('Jumped in CCustomerModel => getCustomerDetailsByMobileNumber()'); 

            return await this.repository.findOne({
                select: {
                    customerId: true,
                    customerName: true,
                    customerOwnerName: true,
                    customerMobileNumber: true
                },
                where: {
                    customerMobileNumber: customerMobileNumber  
                }
            });

        } catch (error) {
            throw new Error(error);
        }
    }

    public async getCustomerDetailsByEmailId(customerEmailId: string): Promise<getCustomerDetailsByCustomerEmailIdResp> {  
        try {
            console.log('Jumped in CCustomerModel => getCustomerDetailsByEmailId()'); 

            return await this.repository.findOne({
                select: {
                    customerId: true,
                    customerName: true,
                    customerOwnerName: true,
                    customerEmailId: true
                },
                where: {
                    customerEmailId: customerEmailId  
                }
            });

        } catch (error) {
            throw new Error(error);
        }
    }

    public async getAllCustomers(limit: number = 10, pageNumber: number = 1): Promise<getAllCustomers[]> {  
        try {
            console.log('Jumped in CCustomerModel => getAllCustomers()');  
            const skip = (limit * pageNumber) - limit;

            return await this.repository
            .createQueryBuilder('customer')  
            .leftJoinAndSelect('customer.customerTypeStatic', 'customerType')  
            .select(['customer.customerId', 'customer.customerName', 'customer.customerOwnerName', 'customer.customerMobileNumber', 'customer.customerEmailId', 'customer.GSTNo', 'customer.logo', 'customerType.customerTypeShortDescription'])  // Updated fields
            .skip(skip)
            .take(limit)
            .getMany();

        } catch (error) {
            throw new Error(error);
        }
    }

}





























































// import { CCustomerEntities } from "../entities/CCustomer.entities";
// import AppDataSource from "../dataSource";
// import { SignUpReq, SignUpResp, getAllCustomers, getCustomerDetailsByCustomerEmailIdResp, getCustomerDetailsByCustomerNameResp } from "../../interfaces/CCustomer.interface";  

// export class CCustomerModel {
//     addCustomer(request: SignUpReq) {
//         throw new Error("Method not implemented.");
//     }  
//     protected repository;
//     addNewCustomer: any;
//     constructor() {
//         this.repository = AppDataSource.getRepository( CCustomerEntities );  
//     }

//     public async addustomer(objNewCustomer: SignUpReq): Promise<SignUpResp> {
//         try {
//             console.log('Jumped in CCustomerModel => signUp()');
    
           
//             const { customerId, customerName, customerAddress, customerMobileNo, customerEmailId, customerGSTNo, customerlogo } = await this.repository.save(objNewCustomer);
//             return { customerId, customerName, customerAddress, customerMobileNo: customerMobileNo,  customerEmailId, customerGSTNo, customerlogo };
        
//         } catch (error) {
//             throw new Error(error);
//         }
//     }
    
//     public async getCustomerDetailsByName({ customerName}: { customerName: string;}): Promise<getCustomerDetailsByCustomerNameResp> {  
//         try{
//             console.log('Jumped in CCustomerModel => getCustomerDetailsByName()');  

//             return await this.repository.findOne({
//                 select: {
//                     customerId: true,
//                     customerName: true,
//                     customerOwnerName: true
//                 },
//                 where: {
//                     customerName: customerName,
//                 }
//             });

//         } catch(error) {
//             throw new Error( error );
//         }
//     }

//     public async getCustomerDetailsByMobileNumber(customerMobileNumber: string): Promise<getCustomerDetailsByCustomerNameResp> {  
//         try{
//             console.log('Jumped in CCustomerModel => getCustomerDetailsByMobileNumber()'); 

//             return await this.repository.findOne({
//                 select: {
//                     customerId: true,
//                     customerName: true,
//                     customerOwnerName: true,
//                     customerMobileNumber: true
//                 },
//                 where: {
//                     customerMobileNumber: customerMobileNumber  
//                 }
//             });

//         } catch(error) {
//             throw new Error( error );
//         }
//     }

//     public async getCustomerDetailsByEmailId(customerEmailId: string): Promise<getCustomerDetailsByCustomerEmailIdResp> {  
//         try{
//             console.log('Jumped in CCustomerModel => getCustomerDetailsByEmailId()'); 

//             return await this.repository.findOne({
//                 select: {
//                     customerId: true,
//                     customerName: true,
//                     customerOwnerName: true,
//                     customerEmailId: true
//                 },
//                 where: {
//                     customerEmailId: customerEmailId  
//                 }
//             });

//         } catch(error) {
//             throw new Error( error );
//         }
//     }

//     public async getAllCustomers(limit: number = 10, pageNumber: number = 1): Promise<getAllCustomers[]> {  
//         try{
//             console.log('Jumped in CCustomerModel => getAllCustomers()');  
//             const skip = (limit * pageNumber) - limit;

//             return await this.repository
//             .createQueryBuilder('customer')  
//             .leftJoinAndSelect('customer.customerTypeStatic', 'customerType')  
//             .select(['customer.customerId', 'customer.customerName', 'customer.customerOwnerName', 'customer.customerMobileNumber', 'customer.customerEmailId', 'customer.GSTNo', 'customer.logo', 'customerType.customerTypeShortDescription'])  // Updated fields
//             .skip(skip)
//             .take(limit)
//             .getMany();

//         } catch(error) {
//             throw new Error( error );
//         }
//     }
// }
