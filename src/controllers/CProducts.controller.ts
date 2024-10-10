import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { CProductService } from "../services/CProducts.service";
import { CCustomErrors } from "../helpers/CCustomErrors.helper";
import { errorTypeEnum } from "../enums/errorType.enum";

const productService = new CProductService();

export class CProductController {

  // Update product
  static updateProduct(req: Request, res: Response) {
    res.send("Product updated successfully!");
  }

  // Delete product
  static deleteProduct(req: Request, res: Response) {
    res.send("Product deleted successfully!");
  }

  // Add product
  static async addProduct(req: Request, res: Response, next: NextFunction) {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new CCustomErrors(new Error("Invalid inputs"), errorTypeEnum.INPUT_VALIDATION_ERROR, errors));
      }

      // Extract product data from request body
      const productData = req.body;

      productData.name = req.body.name;
      productData.description = req.body.description;
      productData.price = req.body.price;
      productData.quantity = req.body.quantity;
      productData.stock = req.body.stock;              
      productData.category = req.body.category;        
      productData.keywords = req.body.keywords;        

      // // Optional fields
      // productData.hsn_code = req.body.hsn_code || null;      
      // productData.expiry_date = req.body.expiry_date || null; 
      // productData.mfg_date = req.body.mfg_date || null;      
      // productData.tax_slab = req.body.tax_slab || null;      

      
      productData.shop_id = req.body.shop_id;          
      productData.unit_id = req.body.unit_id;          

      productData.created_by = req.body.created_by;    
      productData.updated_by = req.body.updated_by;    

      // Call the service to add the product
      const savedProduct = await productService.addProduct(productData);

      return res.status(201).json({
        status: 201,
        message: "Product added successfully",
        data: savedProduct
      });
    } catch (error) {
      return next(error);
    }
  }

  // Get product by name
  static async getProductDetailsByName(req: Request, res: Response, next: NextFunction) {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new CCustomErrors(new Error("Invalid inputs"), errorTypeEnum.INPUT_VALIDATION_ERROR, errors));
      }

      const productName = req.params.productName;
      const product = await productService.getProductDetailsByName(productName);

      if (product) {
        return res.status(200).json({ status: 200, data: product });
      } else {
        return res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      return next(error);
    }
  }

  // Filter products by category and price range
  static async filterProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { category, minPrice, maxPrice } = req.query;

      // Convert prices to numbers since query params are strings
      const minPriceNum = parseFloat(minPrice as string);
      const maxPriceNum = parseFloat(maxPrice as string);

      const products = await productService.filterProducts(category as string, minPriceNum, maxPriceNum);

      return res.status(200).json({
        status: 200,
        data: products
      });
    } catch (error) {
      return next(error);
    }
  }
}



