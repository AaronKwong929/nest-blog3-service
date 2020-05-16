import { prop } from '@typegoose/typegoose';

export default abstract class base {
    @prop({
        default: new Date()
    })
    updatedAt: Date;
    @prop({
        default: new Date()
    })
    createdAt: Date;
}
