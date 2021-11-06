import React from "react";
import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Modal,
    Typography
} from "@mui/material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


type PropType={
    channelDetails: boolean | {
        channel_id:string,
        channel_name:string,
        members_count:number,
        members: Array<{
            [key: string]: string
        }>
    },
    openChannelDetails: boolean,
    handleOpenChannelDetails: () => void,
    handleCloseChannelDetails: () => void
}

export default function ChannelDetails(props: PropType) {
    return (
        <>
            <Modal
                open={props.openChannelDetails}
                onClose={props.handleCloseChannelDetails}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color:'#2196f3'}}>
                        { typeof props.channelDetails !== 'boolean' && props.channelDetails.channel_name}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, color: "#607d8b" }}>
                        Members
                    </Typography>
                    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', maxHeight: 300, overflow: 'auto' }}>
                        {typeof props.channelDetails !== 'boolean' && props.channelDetails.members.map((member) => {
                            const labelId = `checkbox-list-secondary-label-${member.display_name}`;
                            return (
                                <ListItem
                                    key={member.display_name}
                                    disablePadding
                                >
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={`${member.display_name}`}
                                                src={`/static/images/avatar/${member.dp}.jpg`}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText id={labelId} primary={member.display_name} secondary={member.username}/>
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