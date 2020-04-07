import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home'
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import {NavLink} from "react-router-dom";



const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const navLink = (<NavLink style={{textDecoration: 'none', color: 'black'}} to="/trackhistory">Track History</NavLink>);
const addArtist = (<NavLink style={{textDecoration: 'none', color: 'black'}} to="/addartist">Add artist</NavLink>);
const addAlbum = (<NavLink style={{textDecoration: 'none', color: 'black'}} to="/addalbum">Add album</NavLink>);
const home = (<NavLink style={{textDecoration: 'none', color: 'black'}} to="/">Home</NavLink>);




export default function Menu() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const list = anchor => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem button key={"addArtist"}>
                    <ListItemIcon>{<HomeIcon fontSize={"large"}/>}</ListItemIcon>
                    <ListItemText><h3>{home}</h3></ListItemText>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem button key={"addArtist"}>
                    <ListItemIcon>{<CreateNewFolderIcon/>}</ListItemIcon>
                    <ListItemText>{addArtist}</ListItemText>
                </ListItem>
                <ListItem button key={"addAlbum"}>
                    <ListItemIcon>{<CreateNewFolderIcon/>}</ListItemIcon>
                    <ListItemText>{addAlbum}</ListItemText>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem button>
                    <ListItemIcon>{<InboxIcon/>}</ListItemIcon>
                    <ListItemText>{navLink}</ListItemText>
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment key={'left'}>
                <Button style={{color: '#fff'}} onClick={toggleDrawer('left', true)}>{'menu'}</Button>
                <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                    {list('left')}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
