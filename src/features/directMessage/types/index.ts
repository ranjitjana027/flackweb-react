import {Message} from "../../chatMessages/types";

export type User = {
    username: string,
    display_name: string,
    dp?: string
    lastMessage?: Message
}

export type UserList = {
    [username: string]: User
}

export type DirectMessageState = {
    searchResults: {
        [title: string]: User[]
    },
    userList: UserList

}