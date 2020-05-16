import { Pre, prop, getModelForClass } from '@typegoose/typegoose';
import { hash } from 'bcrypt';
import base from './base.model';

@Pre<Admin>(`save`, async function() {
    if (this.isModified(`password`)) {
        this.password = await hash(this.password, 8);
        this.updatedAt = new Date();
    }
})
export class Admin extends base{
    @prop({
        required: true
    })
    name!: string;

    @prop({
        required: true
    })
    password!: string;
}

export const AdminModel = getModelForClass(Admin);
