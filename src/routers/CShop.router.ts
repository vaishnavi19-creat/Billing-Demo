import { CBaseRouter } from "./CBase.router";
import { CShopController } from "../controllers/CShop.controller";
import { CShopValidator } from "../validators/CShop.validator";

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
        this.router.get( '/getAllShops', CShopValidator.validateGetAllShops(), CShopController.getAllShops );
    }

    postRoutes() {
        console.log('In postRoute() from CSignUpRouter');
        this.router.post( '/filterShops', CShopValidator.validateFilterShops(), CShopController.filterShops );
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