import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {NavLink} from "react-router-dom";

const UserMenu = ({user, logout}) => {
    const home = (<NavLink style={{textDecoration: 'none', color: 'black'}} to="/">Not published</NavLink>);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const logoutAndClose = () => {
        handleClick(true);
        logout(true)
    };

    return (
        <>
            <div onClick={handleClick} style={{display: "flex"}}>
                <Avatar style={{marginRight: '10px'}}
                        src={user.avatar ? 'http://localhost:5555/uploads/' + user.avatar : "/broken-image.jpg"}/>
                <p style={{marginTop: '10px'}}> Hello, {user.username}!</p>
            </div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {user.role === 'admin' ? <MenuItem onClick={handleClose}>{home}</MenuItem> : null}
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={logoutAndClose}>Logout</MenuItem>
            </Menu></>
    );
};

export default UserMenu;