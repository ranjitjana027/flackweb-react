import React, {useEffect} from "react";
import {
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Modal,
    Typography
} from "@mui/material";
import CustomAvatar from "../../utils/CustomAvatar";

type absolute = 'absolute'
const style = {
    position: 'absolute' as absolute,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type Channel = {
    channel_id: string,
    channel_name: string,
    members_count: number,
    members: Array<{
        [key: string]: string
    }>
}

type User = {
    username: string,
    display_name: string,
    dp?: string
}

type PropType = {
    channelDetails: boolean | Channel | User,
    openChannelDetails: boolean,
    handleCloseChannelDetails: () => void
}

type ChannelInfo = {
    id: string,
    name: string,
    members?:Array<{[key: string]: string}>,
    memberCount?: number
}

export default function ChannelDetails(props: PropType) {
    const [channelInfo, setChannelIfo] = React.useState<ChannelInfo>({
        id: '',
        name: ''
    });
    const {channelDetails} = props;
    const formattedMembersString = (count: number) => {
        if (count > 1) {
            return `${count} members`;
        } else {
            return `${count} member`;
        }
    };

    useEffect(() => {
        if(typeof channelDetails === 'object' && 'channel_id' in channelDetails) {
            setChannelIfo({
                id: channelDetails.channel_id,
                name: channelDetails.channel_name,
                memberCount: channelDetails.members_count,
                members: channelDetails.members
            })

        }
        if(typeof channelDetails === 'object' && 'username' in channelDetails) {
            setChannelIfo({
                id: channelDetails.username,
                name: channelDetails.display_name,
            })

        }
    }, [channelDetails])

    return (
        <>
            <Modal
                open={props.openChannelDetails}
                onClose={props.handleCloseChannelDetails}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{color: '#2196f3'}}>
                        {channelInfo.name}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2, color: "#607d8b"}}>
                        {channelInfo.memberCount && formattedMembersString(channelInfo.memberCount)}
                    </Typography>
                    <List dense sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                        maxHeight: 300,
                        overflow: 'auto'
                    }}>
                        {channelInfo.members?.map((member) => {
                            const labelId = `checkbox-list-secondary-label-${member.display_name}`;
                            return (
                                <ListItem
                                    key={member.display_name}
                                    disablePadding
                                >
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <CustomAvatar
                                                alt={`${member.display_name}`}
                                                src={member.dp ? `/static/images/avatar/${member.dp}.jpg` : ''}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText id={labelId} primary={member.display_name}
                                                      secondary={member.username}/>
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
            </Modal>
        </>
    );
}