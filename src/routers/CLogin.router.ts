import { CBaseRouter } from "./CBase.router";
import { CLoginController } from "../controllers/CLogin.controller";
import { CLoginValidator } from "../validators/CLogin.validator";

class CLoginRouter extends CBaseRouter {

    constructor() {
        super();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        console.log('In getRoute() from CLoginRouter');
        this.router.get( '/getAllLogins', CLoginValidator.validateGetAllLogins(), CLoginController.getAllLogin );
    }

    postRoutes() {
        console.log('In postRoute() from CSignUpRouter');
        this.router.post( '/filterLogins', CLoginValidator.validateFilterLogins(), CLoginController.filterLogin );
    }

    putRoutes() {
        console.log('In putRoute() from CLoginRouter');
    }

    patchRoutes() {
        console.log('In patchRoute() from CLoginRouter');
    }

    deleteRoutes() {
        console.log('In deleteRoute() from CLoginRouter');
    }
}

export default new CLoginRouter().router;