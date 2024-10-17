import { UserModel } from "../db/models/User.model";
import { IUser } from "../interfaces/User.interface";

export class UserService {
  private userModel = new UserModel();

  async registerUser(data: IUser) {
    const existingUser = await this.userModel.findByEmail(data.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    return await this.userModel.createUser(data);
  }

  async getUserByEmail(email: string) {
    return this.userModel.findByEmail(email);
  }

  async getUserById(id: number) {
    return this.userModel.findById(id);
  }
}

