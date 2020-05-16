import { EventTrackModel } from '../../models/eventTrack.model';

export const eventLog = (eventCode: number): any => {
    return (target: any, name: any, descriptor: any): any => {
        const func = descriptor.value;
        if (typeof func === `function`) {
            descriptor.value = async function(...args) {
                const event = new EventTrackModel({eventCode});
                await event.save();
                const results = func.apply(this, args);
                return results;
            };
        }
    };
};
