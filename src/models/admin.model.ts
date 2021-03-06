import { encryptPassword } from './../helpers/encryption';
import { Pre, prop, getModelForClass } from '@typegoose/typegoose';

import { Base } from './base.model';

@Pre<Admin>(`save`, async function() {
    if (this.isModified(`password`)) {
        this.password = await encryptPassword(this.password);
        this.updatedAt = new Date();
    }
})
export class Admin extends Base {
    @prop({
        required: true,
        unique: true
    })
    account!: string;

    @prop({
        required: true
    })
    password!: string;
}

export const AdminModel = getModelForClass(Admin);
