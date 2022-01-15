import * as React from 'react';
import {alpha, InputBase, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, styled} from "@mui/material";
import SearchIcon from '@material-ui/icons/Search';
import CustomAvatar from "../../utils/CustomAvatar";
import {useHistory} from 'react-router-dom';
import {addSearchResult, addUser, selectAllSearchKeys} from "../directMessage/directMessageSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useSocket} from "../../hooks/use-socket";
import {User} from "./types";

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

export default function SearchUser(props: { toggleSidebar: () => void }) {
    const [searchInput, setSearchInput] = React.useState<string>('');
    const searchResults = useAppSelector(state => state.directMessage.searchResults && state.directMessage.searchResults[searchInput.toLowerCase()]);
    const allSearchKeys = useAppSelector(selectAllSearchKeys);
    const {toggleSidebar} = props;
    const history = useHistory();
    const dispatch = useAppDispatch();
    const socket = useSocket();

    const handleSearchInput = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        const value = target.value;
        setSearchInput(value);

        if (value.trim() !== '' && !allSearchKeys.includes(value.toLowerCase())) {
            const fd = new FormData();
            fd.append('title', value.trim().toLowerCase());
            fetch(`${process.env.REACT_APP_API_DOMAIN}/api/users/find`, {
                method: "POST",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'x-access-tokens': `${localStorage.getItem('flackwebToken')}`
                },
                body: fd
            })
                .then(data => data.json())
                .then(data => {
                    if (data.success) {
                        dispatch(addSearchResult(data))
                    }
                })
        }
    }

    const handleClick = (user: User) => {
        dispatch(addUser(user))
        if (socket != null) {
            socket.emit('initiate_dm', {
                user: user.username
            });
        }
        history.push(`/chat/${user.username}`);
        toggleSidebar();
    }

    return (<>
        <Search onChange={handleSearchInput}>
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
            {searchResults && searchResults.map((user) => {
                const labelId = `checkbox-list-secondary-label-${user.display_name}`;
                const {username, display_name, dp} = user;
                return (
                    <ListItem
                        key={username}
                        disablePadding
                        onClick={() => handleClick({username,display_name,dp})}
                    >
                        <ListItemButton>
                            <ListItemAvatar>
                                <CustomAvatar
                                    alt={`${display_name}`}
                                    src={dp ? `/static/images/avatar/${dp}.jpg` : ''}
                                />
                            </ListItemAvatar>
                            <ListItemText id={labelId} primary={display_name}
                                          secondary={username}/>
                        </ListItemButton>
                    </ListItem>

                );
            })}
        </List>
    </>)

}