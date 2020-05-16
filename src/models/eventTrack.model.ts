import { getModelForClass, prop, Pre } from '@typegoose/typegoose';
import base from './base.model';

@Pre<EventTrack>(`save`, function() {
    this.updatedAt = new Date();
})
export class EventTrack extends base {
    @prop({
        required: true
    })
    eventCode: number;
}

export const EventTrackModel = getModelForClass(EventTrack);
