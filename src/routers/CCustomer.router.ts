import { CBaseRouter } from "./CBase.router";
import { Express } from "express";
import { CCustomerController} from "../controllers/CCustomer.controller";
import { CCustomerValidator } from "../validators/CCustomer.validator";



class CCustomerRouter extends CBaseRouter {

    constructor() {
        super();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        console.log('In getRoute() from CCustomersRouter');
        this.router.get('/customer/:customerId', CCustomerValidator.validateCustomerId(), CCustomerController.getCustomerById); 
        this.router.get( '/getAllCustomers', CCustomerValidator.validateGetAllCustomers(), CCustomerController.getAllCustomers );

    }

    postRoutes() {
        console.log('In postRoute() from CCustomerRouter');
        this.router.post('/customer', CCustomerValidator.validateCustomer(), CCustomerController.addCustomer);
        this.router.post('/customer', CCustomerValidator.validateCustomer(), CCustomerController.filterCustomers);

    }

    putRoutes() {
        console.log('In putRoute() from CCustomerRouter');
        // PUT route for updating both new and old customers(created different endpoint)
        this.router.put('/customer', CCustomerValidator.validateCustomer(), CCustomerController.updateCustomer);
        this.router.put('/customer/:customerId', CCustomerValidator.validateCustomer(), CCustomerController.updateCustomer); // Update customer by Id
    }
    

    patchRoutes() {
        console.log('In patchRoute() from CSignUpRouter');
        this.router.patch('/customer/:customerId', CCustomerValidator.validatepatchCustomer(), CCustomerController.patchCustomer);

    }


    deleteRoutes() {
        console.log('In deleteRoute() from CCustomerRouter');
        // DELETE route for deleting customers (both new and old)
        this.router.delete('/customer', CCustomerValidator.validateCustomer(), CCustomerController.deleteCustomer);
        this.router.delete('/customer/:customerId',CCustomerValidator.validateCustomerIdForSoftDelete(), CCustomerController.softDeleteCustomerById)

    }   
}

export default new CCustomerRouter().router;