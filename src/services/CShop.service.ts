import { errorTypeEnum } from "../enums/errorType.enum";
import { CCustomErrors } from "../helpers/CCustomErrors.helper";
import { SignUpReq } from "../interfaces/CShop.interface";
import { CShopModel } from "../db/models/CShop.model";

const objShopModel = new CShopModel();
export class CShopService {

    async signUp(request: SignUpReq) {
        try {
            console.log('In CShopService => signUp() ');
            const existingShop = await this.getShopDetailsByNameZipCode(request.shopName, request.shopCityZipCode);
            if (existingShop) {
                console.log('Cought in input validation error from CShopService => signUp() existing shop name');
                throw (new CCustomErrors(new Error(`The shop ${existingShop.shopName} already exists in the same city. Please confirm if you are ${existingShop.shopOwnerName} and may forgot the credentials.`), errorTypeEnum.INPUT_VALIDATION_ERROR, []));
            }

            const existingShopMobileNumber = await this.getShopDetailsByShopMobileNumber(request.shopMobileNumber);
            if (existingShopMobileNumber) {
                console.log('Cought in input validation error from CShopService => signUp() existing mobile number');
                const duplicateMobileNumberError = {"errors": [{
                        "value": existingShopMobileNumber.shopMobileNumber,
                        "msg": `The shop mobile number ${existingShopMobileNumber.shopMobileNumber} is already exists. Please try with another number.`,
                        "param": "shopMobileNumber",
                        "location": "body"
                }]};

                throw (new CCustomErrors(new Error(`The mobile number ${existingShopMobileNumber.shopMobileNumber} already exists. Please provide another mobile number.`), errorTypeEnum.INPUT_VALIDATION_ERROR, duplicateMobileNumberError));
            }

            const existingShopEmailId = await this.getShopDetailsByShopEmailId(request.shopEmailId);
            if (existingShopEmailId) {
                console.log('Cought in input validation error from CShopService => signUp() existing email id');
                const duplicateEmailIdError = {"errors": [{
                        "value": existingShopEmailId.shopEmailId,
                        "msg": `The shop email id ${existingShopEmailId.shopEmailId} is already exists. Please try with another email id.`,
                        "param": "shopEmailId",
                        "location": "body"
                }]};

                throw (new CCustomErrors(new Error(`The email id ${existingShopEmailId.shopEmailId} already exists. Please provide another email id.`), errorTypeEnum.INPUT_VALIDATION_ERROR, duplicateEmailIdError));
            }

            const savedShop = await objShopModel.signUp(request);
            console.log(await JSON.stringify(savedShop));

            return savedShop;
        } catch (error) {
            throw (error);
        }
    }

    async getShopDetailsByNameZipCode(shopName: string, shopCityZipCode: string) {
        try {
            console.log('Validating existing shop from CShopService => getShopDetailsByNameZipCode()');

            return await objShopModel.getShopDetailsByNameZipCode(shopName, shopCityZipCode);
        } catch (error) {
            throw (new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR));
        }

    }

    async getShopDetailsByShopMobileNumber(shopMobileNumber: string) {
        try {
            console.log('Validating existing mobile number from CShopService => getShopDetailsByShopMobileNumber()');

            return await objShopModel.getShopDetailsByShopMobileNumber(shopMobileNumber);
        } catch (error) {
            throw (new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR));
        }

    }

    async getShopDetailsByShopEmailId(shopEmailId: string) {
        try {
            console.log('Validating existing email id from CShopService => getShopDetailsByShopEmailId()');

            return await objShopModel.getShopDetailsByShopEmailId(shopEmailId);
        } catch (error) {
            throw (new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR));
        }

    }

    async getAllShops(limit: number = 10, pageNumber: number = 1) {
        try {
            console.log('Validating existing email id from CShopService => getAllShops()');

            return await objShopModel.getAllShops(limit, pageNumber);
        } catch (error) {
            throw (new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR));
        }

    }

}
