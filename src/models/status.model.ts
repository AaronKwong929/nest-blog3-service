import { getModelForClass, prop, Pre } from '@typegoose/typegoose';
import base from './base.model';

@Pre<Status>(`save`, function() {
    this.updatedAt = new Date();
})
export class Status extends base {
    @prop({
        required: true
    })
    content: string;
}

export const StatusModel = getModelForClass(Status);
