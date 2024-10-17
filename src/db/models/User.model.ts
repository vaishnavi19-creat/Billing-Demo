import AppDataSource from "../dataSource";
import bcrypt from "bcryptjs";
import { IUser, IUserCreateResp, IUserGetByEmailResp, IUserGetByIdResp } from "../../interfaces/User.interface";
import { UserEntities } from "../entities/User.entities";

// UserModel class to interact with the database
export class UserModel {
  [x: string]: any;
    protected repository;
  findByEmail: any;

    // Initialize the repository for the UserEntities
    constructor() {
        this.repository = AppDataSource.getRepository(UserEntities);
    }

    // Method to create a new user
    public async createUser(data: IUser): Promise<IUserCreateResp> {
        try {
            console.log('Jumped in UserModel => createUser()');
            // Hash the password before saving the user
            const hashedPassword = await bcrypt.hash(data.password, 10);

            // Save the user data along with the hashed password
            const { userId, name, email } = await this.repository.save({ ...data, password: hashedPassword });

            // Return a response with the userId, name, and email
            return { userId, name, email };
        } catch (error) {
            throw new Error(error);
        }
    }

    // Method to get user details by email
    public async getByEmail(email: string): Promise<IUserGetByEmailResp | null> {
        try {
            console.log('Jumped in UserModel => getByEmail()');

            // Find the user by email
            const user = await this.repository.findOne({
                select: {
                    userId: true,
                    name: true,
                    email: true
                },
                where: {
                    email: email
                }
            });

            // Return user or null if not found
            return user || null;
        } catch (error) {
            throw new Error(error);
        }
    }

    // Method to get user details by ID
    public async getById(id: number): Promise<IUserGetByIdResp | null> {
        try {
            console.log('Jumped in UserModel => getById()');

            // Find the user by ID
            const user = await this.repository.findOne({
                select: {
                    userId: true,
                    name: true,
                    email: true
                },
                where: {
                    userId: id
                }
            });

            // Return user or null if not found
            return user || null;
        } catch (error) {
            throw new Error(error);
        }
    }
}

























// import { UserEntities } from "../entities/User.entities"; 
// import AppDataSource from "../dataSource"; 
// import bcrypt from "bcryptjs"; 
// import { IUser, IUserCreateResp, IUserGetByEmailResp, IUserGetByIdResp, } from "../../interfaces/User.interface"; 
// import { UserEntities } from "../entities/User.entities";
// export class UserModel {
//     findByEmail(email: string) {
//       throw new Error("Method not implemented.");
//     }
//     findById(id: number) {
//       throw new Error("Method not implemented.");
//     }
//     protected repository;

//     constructor() {
//         this.repository = AppDataSource.getRepository(UserEntities); 
//     }

//     // Method to create a new user
//     public async createUser(data: IUser): Promise<IUserCreateResp> {
//         try {
//             console.log('Jumped in CUserModel => createUser()');
//             // Hash the password before saving the user
//             const hashedPassword = await bcrypt.hash(data.password, 10);
//             const { userId, name, email } = await this.repository.save({ ...data, password: hashedPassword });
//             return { userId, name, email };
//         } 
        
//         catch (error) {
//             throw new Error(error);
//         }
//     }

//     // Method to get user details by email
//     public async getByEmail(email: string): Promise<IUserGetByEmailResp> {
//         try {
//             console.log('Jumped in CUserModel => getByEmail()');

//             return await this.repository.findOne({
//                 select: {
//                     userId: true,
//                     name: true,
//                     email: true
//                 },
//                 where: {
//                     email: email
//                 }
//             });
//         } 
        
//         catch (error) {
//             throw new Error(error);
//         }
//     }

//     // Method to get user details by ID
//     public async getById(id: number): Promise<IUserGetByIdResp> {
//         try {
//             console.log('Jumped in CUserModel => getById()');

//             return await this.repository.findOne({
//                 select: {
//                     userId: true,
//                     name: true,
//                     email: true
//                 },
//                 where: {
//                     userId: id
//                 }
//             });
//         } catch (error) {
//             throw new Error(error);
//         }
//     }
// }
