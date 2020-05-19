import { getModelForClass, prop, Pre } from '@typegoose/typegoose';
import base from './base.model';
import { IsNumber } from 'class-validator';

@Pre<EventTrack>(`save`, function() {
    this.updatedAt = new Date();
})
export class EventTrack extends base {
    @prop({
        required: true,
        type: Number
    })
    @IsNumber()
    eventCode!: number;

    @prop({
        required: true,
        type: Number
    })
    @IsNumber()
    eventStatus!: number;
}

export const EventTrackModel = getModelForClass(EventTrack);
