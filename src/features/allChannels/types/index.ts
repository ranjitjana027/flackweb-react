import {Message} from "../../chatMessages/types";

export type Channel = {
    channel_id: string,
    channel_name: string,
    created_on: string,
    last_message: null | Message,
    members: Array<{
        [key: string]: string
    }>,
    members_count: number,
    isMember: boolean,
}

export type ChannelList = {
    [channel_id: string]: Channel
}