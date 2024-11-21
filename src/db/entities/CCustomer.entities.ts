import { Column, PrimaryGeneratedColumn, Unique, Entity, Index, ManyToOne, JoinColumn } from "typeorm";
import { CBaseEntities } from "./CBase.entities";
// import { CCustomerTypeEntities } from "./CCustomerType.entities";

@Entity({ name: 'customers' })
@Unique(['customerMobileNo'])
@Unique(['customerEmailId'])
export class CCustomerEntities extends CBaseEntities {
   
    
    @PrimaryGeneratedColumn({ name: 'customer_id' })
    customerId: number;

    @Index()
    @Column({ name: 'customer_name', type: 'varchar', length: 100, nullable: false })
    customerName: string;


    @Column({ name: 'customer_address', type: 'varchar', length: 500, nullable: false })
    customerAddress: string;

    @Column({ name: 'customer_country_id', type: 'integer', nullable: false })
    customerCountryId: string;

    @Column({ name: 'customer_state_id', type: 'integer', nullable: false })
    customerStateId: string;

    @Column({ name: 'customer_city', type: 'varchar', length: 20, nullable: false })
    customerCity: string;

    @Column({ name: 'customer_mobile_no', type: 'varchar', length: 10, nullable: false })
    customerMobileNo: string;

    @Column({ name: 'customer_email_id', type: 'varchar', length: 50, nullable: false })
    customerEmailId: string;

    @Column({ name: 'customer_gst_no', type: 'varchar', length: 15, nullable: false })
    customerGSTNo: string;

    @Column({ name: 'customer_status', type: 'boolean', default: true })
    customerStatus: boolean;

    @Column({ name: 'customer_last_record', type: 'text', default: null, nullable: true })
    customerLastRecord: string;

    @Column({ name: 'customer_logo_url', type: 'varchar', length: 200, nullable: true })
    customerLogo: string;

    @Column({ name: 'customer_type_id' })
    customerTypeId: number;




    // Added field for soft delete
    @Column({ nullable: true })
    deletedAt: Date; // This field will be used to mark the deletion time
    static create: any;
    mobileNo: string;
    email: string;




    // @ManyToOne(() => CCustomerEntities, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    // @JoinColumn({ name: 'customer_type_id', referencedColumnName: 'customerTypeId' })
    // customerTypeStatic: CCustomerEntities;
}
