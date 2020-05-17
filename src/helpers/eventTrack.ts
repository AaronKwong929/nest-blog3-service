import { EventTrackModel } from './../models/eventTrack.model';
export const eventLog = async (eventCode: number): Promise<any> => {
    const event = new EventTrackModel({ eventCode });
    await event.save();
};
