export type Message = {
    timestamp: string,
    message: string,
    mid: number,
    room: string,
    room_id: string,
    user: string
}

export type ChatMessagesType = {
    [channel: string]: Array<Message>
}