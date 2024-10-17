import { errorTypeEnum } from "../enums/errorType.enum";
import { CCustomErrors } from "../helpers/CCustomErrors.helper";
import { InvoiceModel } from "../db/models/Invoice.model";
import { createInvoiceReq } from "../interfaces/Invoice.interface";

const objInvoiceModel = new InvoiceModel();

export class InvoiceService {
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

    async getInvoiceById(invoiceId: string) {
        try {
            console.log('Fetching invoice from InvoiceService => getInvoiceById()');
            return await objInvoiceModel.getInvoiceById(invoiceId);
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    async getAllInvoices(limit: number = 10, pageNumber: number = 1) {
        try {
            console.log('Fetching all invoices from InvoiceService => getAllInvoices()');
            return await objInvoiceModel.getAllInvoices(limit, pageNumber);
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    async deleteInvoice(invoiceId: string) {
        try {
            console.log('Deleting invoice from InvoiceService => deleteInvoice()');
            return await objInvoiceModel.deleteInvoice(invoiceId);
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }
}



