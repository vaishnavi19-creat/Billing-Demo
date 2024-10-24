import { errorTypeEnum } from "../enums/errorType.enum";
import { CCustomErrors } from "../helpers/CCustomErrors.helper";
import { InvoiceModel } from "../db/models/Invoice.model";
import { createInvoiceReq } from "../interfaces/Invoice.interface";
import { getRepository } from "typeorm";
import { InvoiceEntities } from "../db/entities/Invoice.entities";

const objInvoiceModel = new InvoiceModel();

export class InvoiceService {
    // Method to create a new invoice
    async createInvoice(request: createInvoiceReq) {
        try {
            console.log('In InvoiceService => createInvoice()');

            const savedInvoice = await objInvoiceModel.createInvoice(request);
            console.log('Saved invoice:', savedInvoice);

            return savedInvoice;
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    // Method to get an invoice by ID
    async getInvoiceById(invoiceId: string) {
        try {
            console.log('Fetching invoice from InvoiceService => getInvoiceById()');

            const invoice = await objInvoiceModel.getInvoiceById(invoiceId);

            if (!invoice) {
                throw new CCustomErrors(
                    new Error('Invoice not found'),
                    errorTypeEnum.NOT_FOUND_ERROR
                );
            }

            return invoice;
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    // Method to get all invoices with pagination
    async getAllInvoices(limit: number = 10, pageNumber: number = 1) {
        try {
            console.log('Fetching all invoices from InvoiceService => getAllInvoices()');

            const invoices = await objInvoiceModel.getAllInvoices(limit, pageNumber);

            if (invoices.length === 0) {
                console.log('No invoices found');
            }

            return invoices;
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    // Method to delete an invoice by ID
    async deleteInvoice(invoiceId: string) {
        try {
            console.log('Deleting invoice from InvoiceService => deleteInvoice()');

            const invoiceRepository = getRepository(InvoiceEntities);
            const existingInvoice = await invoiceRepository.findOne({
                where: { invoiceId: Number(invoiceId) }
            });

            if (!existingInvoice) {
                throw new CCustomErrors(
                    new Error('Invoice not found'),
                    errorTypeEnum.NOT_FOUND_ERROR
                );
            }

            await objInvoiceModel.deleteInvoice(invoiceId);
            return { message: 'Invoice deleted successfully' };
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    // Method to filter invoices
    async filterInvoices(status?: string) {
        try {
            console.log('Filtering invoices from InvoiceService => filterInvoices()');
            const invoiceRepository = getRepository(InvoiceEntities);
            const whereClause: any = {};

            if (status) {
                whereClause.status = status; // Filter by status if provided
            }

            const filteredInvoices = await invoiceRepository.find({ where: whereClause });

            if (filteredInvoices.length === 0) {
                console.log('No invoices found for the given filter criteria');
            }

            return filteredInvoices;
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    // Method to update invoice
    async updateInvoice(invoiceId: string, data: Partial<createInvoiceReq>) {
        try {
            console.log('Updating invoice from InvoiceService => updateInvoice()');
            const invoiceRepository = getRepository(InvoiceEntities);
            const idAsNumber = Number(invoiceId);

            const existingInvoice = await invoiceRepository.findOne({
                where: { invoiceId: idAsNumber }
            });

            if (!existingInvoice) {
                throw new CCustomErrors(
                    new Error('Invoice not found'),
                    errorTypeEnum.NOT_FOUND_ERROR
                );
            }

            await invoiceRepository.update(idAsNumber, data);

            const updatedInvoice = await invoiceRepository.findOne({
                where: { invoiceId: idAsNumber }
            });

            return updatedInvoice;
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    // Method to patch (partially update) invoice
    async patchInvoice(invoiceId: string, data: Partial<InvoiceEntities>) {
        try {
            console.log('Patching invoice from InvoiceService => patchInvoice()');
            const invoiceRepository = getRepository(InvoiceEntities);
            const idAsNumber = Number(invoiceId);

            const existingInvoice = await invoiceRepository.findOne({
                where: { invoiceId: idAsNumber }
            });

            if (!existingInvoice) {
                throw new CCustomErrors(
                    new Error('Invoice not found'),
                    errorTypeEnum.NOT_FOUND_ERROR
                );
            }

            await invoiceRepository.update(idAsNumber, data);

            const patchedInvoice = await invoiceRepository.findOne({
                where: { invoiceId: idAsNumber }
            });

            return patchedInvoice;
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }
}




























// import { errorTypeEnum } from "../enums/errorType.enum";
// import { CCustomErrors } from "../helpers/CCustomErrors.helper";
// import { InvoiceModel } from "../db/models/Invoice.model";
// import { createInvoiceReq } from "../interfaces/Invoice.interface";
// import { getRepository } from "typeorm";
// import { InvoiceEntities } from "../db/entities/Invoice.entities";

// const objInvoiceModel = new InvoiceModel();

// export class InvoiceService {
//     async createInvoice(request: createInvoiceReq) {
//         try {
//             console.log('In InvoiceService => createInvoice()');

//             const savedInvoice = await objInvoiceModel.createInvoice(request);
//             console.log('Saved invoice:', savedInvoice);

//             return savedInvoice;
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     async getInvoiceById(invoiceId: string) {
//         try {
//             console.log('Fetching invoice from InvoiceService => getInvoiceById()');
//             return await objInvoiceModel.getInvoiceById(invoiceId);
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     async getAllInvoices(limit: number = 10, pageNumber: number = 1) {
//         try {
//             console.log('Fetching all invoices from InvoiceService => getAllInvoices()');
//             return await objInvoiceModel.getAllInvoices(limit, pageNumber);
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     async deleteInvoice(invoiceId: string) {
//         try {
//             console.log('Deleting invoice from InvoiceService => deleteInvoice()');
//             return await objInvoiceModel.deleteInvoice(invoiceId);
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }


//     // Method to filter invoices
//     async filterInvoices(status?: string) {
//         const invoiceRepository = getRepository(InvoiceEntities);
//         const whereClause: any = {};
//         if (status) {
//             whereClause.status = status; // Filter by status if provided
//         }
//         return await invoiceRepository.find({ where: whereClause });
//     }

   
//     // Method to update invoice
//     async updateInvoice(invoiceId: string, data: Partial<createInvoiceReq>) {
//         const invoiceRepository = getRepository(InvoiceEntities);
    
//         const idAsNumber = Number(invoiceId);
    
//         await invoiceRepository.update(idAsNumber, data);
//             const invoice = await invoiceRepository.findOne({ where: { invoiceId: idAsNumber } });
    
//         return invoice;
//     }



//     // Method to patch invoice
//     async patchInvoice(invoiceId: string, data: Partial<InvoiceEntities>) {
//         const invoiceRepository = getRepository(InvoiceEntities);
    
//         const idAsNumber = Number(invoiceId);
    
//         await invoiceRepository.update(idAsNumber, data);
    
//         return await invoiceRepository.findOne({ where: { invoiceId: idAsNumber } });
//     }



// }



