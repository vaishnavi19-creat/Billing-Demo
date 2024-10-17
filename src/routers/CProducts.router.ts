import { CBaseRouter } from "./CBase.router";
import { CProductController } from "../controllers/CProducts.controller";
import { CProductValidator } from "../validators/CProducts.validator";




class CProductRouter extends CBaseRouter {

    constructor() {
        super();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        console.log('In getRoute() from CProductRouter');
    }

    postRoutes() {
        console.log('In postRoute() from CProductRouter');
            this.router.post('/product', CProductValidator.validateProduct(), CProductController.addProduct);
        
        
    }

    putRoutes() {
        console.log('In putRoute() from CProductRouter');
        this.router.put('/product', CProductValidator.validateProduct(), CProductController.updateProduct);
    }
    

    deleteRoutes() {
        console.log('In deleteRoute() from CProductRouter');
    
        // DELETE route for deleting product (both new and old)
        this.router.delete('/product', CProductValidator.validateProduct(), CProductController.deleteProduct);

    }   
}

export default new CProductRouter().router;











