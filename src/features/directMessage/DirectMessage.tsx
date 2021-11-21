import * as React from 'react';
import {alpha, InputBase, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, styled} from "@mui/material";
import SearchIcon from '@material-ui/icons/Search';
import CustomAvatar from "../../utils/CustomAvatar";
import {useHistory} from 'react-router-dom';

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '18ch',
            '&:focus': {
                width: '25ch',
            },
        },
    },
}));
const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

export default function DirectMessage(props: { toggleSidebar: () => void }) {
    const {toggleSidebar} = props;
    const history = useHistory();
    const userList = [
        {
            username: 'ranjit@jana.com',
            displayName: 'Ranjit Jana',
            dp: 'google.com'
        }
    ];
    return (<>
        <Search>
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search a friend…"
                inputProps={{'aria-label': 'search'}}
            />
        </Search>
        <List dense sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            maxHeight: 300,
            overflow: 'auto'
        }}>
            {userList.map((user) => {
                const labelId = `checkbox-list-secondary-label-${user.displayName}`;
                const {username, displayName, dp} = user;
                return (
                    <ListItem
                        key={displayName}
                        disablePadding
                        onClick={() => {
                            history.push(`/chat/${username}`);
                            toggleSidebar();
                            }
                        }
                    >
                        <ListItemButton>
                            <ListItemAvatar>
                                <CustomAvatar
                                    alt={`${displayName}`}
                                    src={dp ? `/static/images/avatar/${dp}.jpg` : ''}
                                />
                            </ListItemAvatar>
                            <ListItemText id={labelId} primary={displayName}
                                          secondary={username}/>
                        </ListItemButton>
                    </ListItem>

                );
            })}
        </List>
    </>)

}