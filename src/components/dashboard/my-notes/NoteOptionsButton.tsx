import React, {ReactElement} from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {ListItemIcon, ListItemText, MenuList} from "@mui/material";

type IOption = {
    name: string,
    iconElement: ReactElement,
    cb: Function
}

type props = {
    options: IOption[],
    size: 'small' | 'medium' | 'large'
}

export default function NoteOptionsButton(props: props) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                size={props.size}
                onClick={handleClick}
            >
                <MoreVertIcon fontSize={props.size} />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={(e:any) => {
                    e.stopPropagation();
                    setAnchorEl(null);
                }}
                PaperProps={{
                    // style: {
                    //     width: '20ch',
                    // },
                }}
            >
                <MenuList>
                    {props.options.map((option, index) => (
                        <MenuItem key={index} onClick={(e) => {
                            option.cb();
                            setAnchorEl(null);
                        }}>
                            <ListItemIcon>
                                {option.iconElement}
                            </ListItemIcon>
                            <ListItemText>
                                {option.name}
                            </ListItemText>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </div>
    );
}