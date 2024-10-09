import { CProductEntity } from "../db/entities/CProducts.entities";
import { UnitConversion } from "../db/entities/UnitConversion.entities";
import { UnitTypeEntities } from "../db/entities/UnitType.entities";
import { getRepository } from "typeorm";
import { CClothingProductEntity } from "../db/entities/CClothingProduct.entities";


export class CProductService {
  [x: string]: any;
  async addProduct(productData: any): Promise<CProductEntity> {
    const productRepository = getRepository(CProductEntity);
    
    // Save the product details in the database
    const savedProduct = await productRepository.save(productData);
    return savedProduct;
  }

  // Fetch product details by name
  async getProductDetailsByName(productName: string): Promise<CProductEntity | null> {
    const productRepository = getRepository(CProductEntity);
    const product = await productRepository.findOne({ where: { name: productName } });
    return product;
  }


}
