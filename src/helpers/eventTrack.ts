import { EventTrackModel } from '../models/eventTrack.model';
export const eventLog = async (
    eventCode: number,
    eventStatus: number
): Promise<void> => {
    const event = new EventTrackModel({ eventCode, eventStatus });
    await event.save();
};
