import * as express from "express";
import { validationResult } from "express-validator";
import { errorTypeEnum } from "../enums/errorType.enum";
import { CCustomErrors } from "../helpers/CCustomErrors.helper";
import { createInvoiceReq } from "../interfaces/Invoice.interface";
import { InvoiceService } from "../services/Invoice.services";

const objInvoiceService = new InvoiceService();

export class InvoiceController {
    static async createInvoice(request: express.Request, response: express.Response, next: express.NextFunction) {
        try {
            console.log('In createInvoice() from InvoiceController');
            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                console.log('Caught in input validation error from InvoiceController => createInvoice()');
                return next(new CCustomErrors(new Error('Please provide valid inputs.'), errorTypeEnum.INPUT_VALIDATION_ERROR, errors));
            }

            const objFilteredInvoice: createInvoiceReq = request.body; 
            const objSavedInvoice = await objInvoiceService.createInvoice(objFilteredInvoice);
            
            if (objSavedInvoice) {
                console.log('Received success response in InvoiceController => createInvoice()');
                response.status(201).send({
                    status: 201,
                    message: 'Invoice created successfully',
                    data: objSavedInvoice
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    static async getInvoice(request: express.Request, response: express.Response, next: express.NextFunction) {
        try {
            const invoiceId = request.params.id;
            const invoice = await objInvoiceService.getInvoiceById(invoiceId);
            
            if (invoice) {
                console.log('Received success response in InvoiceController => getInvoice()');
                response.status(200).send({
                    status: 200,
                    message: 'Invoice fetched successfully',
                    data: invoice
                });
            } else {
                return next(new CCustomErrors(new Error('Invoice not found'), errorTypeEnum.NOT_FOUND_ERROR));
            }
        } catch (error) {
            return next(error);
        }
    }

    static async getAllInvoices(request: express.Request, response: express.Response, next: express.NextFunction) {
        try {
            const limit = request.query.limit ? (Array.isArray(request.query.limit) ? request.query.limit[0] : request.query.limit) : "10";
            const pageNumber = request.query.pageNumber ? (Array.isArray(request.query.pageNumber) ? request.query.pageNumber[0] : request.query.pageNumber) : "1";

            const parsedLimit = parseInt(limit as string);
            const parsedPageNumber = parseInt(pageNumber as string);
            
            const invoices = await objInvoiceService.getAllInvoices(parsedLimit, parsedPageNumber);

            console.log('Received success response in InvoiceController => getAllInvoices()');
            response.status(200).send({
                status: 200,
                message: 'Invoices fetched successfully',
                data: invoices.length > 0 ? invoices : []
            });
        } catch (error) {
            return next(error);
        }
    }

    static async deleteInvoice(request: express.Request, response: express.Response, next: express.NextFunction) {
        try {
            const invoiceId = request.params.id; 
            await objInvoiceService.deleteInvoice(invoiceId);

            console.log('Received success response in InvoiceController => deleteInvoice()');
            response.status(204).send(); 
        } catch (error) {
            return next(error);
        }
    }
}




