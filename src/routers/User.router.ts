import { CBaseRouter } from "./CBase.router";
import { Express } from "express";
import {registerUser,getUserByEmail} from "../controllers/User.controller"
import {UserValidator} from "../validators/User.validator"

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
        this.router.get('/email',getUserByEmail);

    }

    postRoutes() {
        console.log('In postRoute() from CSignUpRouter');
        // this.router.post('/register', UserValidator(), UserValidator, registerUser);
        this.router.post('/register', UserValidator(), registerUser);

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















