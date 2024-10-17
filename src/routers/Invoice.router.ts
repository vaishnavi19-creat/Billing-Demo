import { CBaseRouter } from "./CBase.router";
import {InvoiceController} from "../controllers/Invoice.controller"
import { InvoiceValidator } from "../validators/Invoice.validator";

class CSignUpRouter extends CBaseRouter {

    constructor() {
        super();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        console.log('In getRoute() from CSignUpRouter');
        this.router.get( '/getAllInvoices', InvoiceValidator.validateGetAllInvoices(), InvoiceController.getAllInvoices );
    }

    postRoutes() {
        console.log('In postRoute() from CSignUpRouter');
        this.router.post( '/createInvoice', InvoiceValidator.validateCreateInvoice(), InvoiceController.createInvoice );
    }

    putRoutes() {
        console.log('In putRoute() from CSignUpRouter');
    }

    patchRoutes() {
        console.log('In patchRoute() from CSignUpRouter');
    }

    deleteRoutes() {
        console.log('In deleteRoute() from CSignUpRouter');
    }
}

export default new CSignUpRouter().router;











