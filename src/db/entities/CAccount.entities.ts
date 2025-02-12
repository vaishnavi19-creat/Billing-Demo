import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("accounts") // Table name in the database
export class CAccountEntities {
  @PrimaryGeneratedColumn()
  accountId: number; // Unique ID for each account

  @Column({ length: 255 })
  customerName: string; // Customer's name

  @Column({ length: 255, unique: true })
  customerEmailId: string; // Unique email for the customer

  @Column({ length: 15 })
  customerMobileNo: string; // Mobile number of the customer

  @Column({ length: 255 })
  customerAddress: string; // Customer's address

  @Column({ nullable: true })
  customerLogo?: string; // Optional logo for the customer

  @Column({ default: true })
  accountStatus: boolean; // true by default

  @CreateDateColumn()
  createdOn: Date; // Automatically stores when the record is created

  @UpdateDateColumn()
  updatedOn: Date; // Automatically updates when the record is modified

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date; // Soft delete
}

































// import {
//     Entity,
//     Column,
//     PrimaryGeneratedColumn,
//     CreateDateColumn,
//     UpdateDateColumn,
//     DeleteDateColumn,
//   } from "typeorm";
  
//   @Entity("accounts") // Table name in the database
//   export class CAccountEntities {
//     @PrimaryGeneratedColumn()
//     accountId: number; // Unique ID for each account
  
//     @Column({ length: 255 })
//     customerName: string; // Customer's name
  
//     @Column({ length: 255, unique: true })
//     customerEmailId: string; // Unique email for the customer
  
//     @Column({ length: 15 })
//     customerMobileNo: string; // Mobile number of the customer
  
//     @Column({ length: 255 })
//     customerAddress: string; // Customer's address
  
//     @Column({ nullable: true })
//     customerLogo?: string; // Optional logo for the customer
  
//     @Column({ default: true })
//     accountStatus: boolean; // true by default
  
//     @Column({ nullable: true })
//     shopId?: number; // Foreign key for shop 
  
//     @CreateDateColumn()
//     createdOn: Date; // Automatically stores when the record is created
  
//     @UpdateDateColumn()
//     updatedOn: Date; // Automatically updates when the record is modified
  
//     @DeleteDateColumn({ nullable: true })
//     deletedAt?: Date; // Soft delete
//   }
  