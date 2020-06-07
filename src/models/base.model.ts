import { prop } from '@typegoose/typegoose';

export abstract class Base {
    @prop({
        default: new Date()
    })
    updatedAt?: Date;
    @prop({
        default: new Date()
    })
    createdAt?: Date;
}
