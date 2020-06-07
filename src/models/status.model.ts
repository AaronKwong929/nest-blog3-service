import { getModelForClass, prop, Pre } from '@typegoose/typegoose';
import { Base } from './base.model';

@Pre<Status>(`save`, function() {
    this.updatedAt = new Date();
})
export class Status extends Base {
    @prop({
        required: true
    })
    content!: string;
}

export const StatusModel = getModelForClass(Status);
