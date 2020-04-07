import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {useDispatch} from "react-redux";
import {loginFacebook} from "../../../store/action/usersActions";

const useStyles = makeStyles((theme) => ({
    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        left: theme.spacing(2),
    },
}));

export default function SimpleTooltips() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const callback = (facebookData) => {
        if(facebookData.id !== 'unknown'){
            dispatch(loginFacebook(facebookData))
        }
    };

    return (
        <div style={{display: 'flex'}}>
            <FacebookLogin
                appId="633834247194808"
                callback={callback}
                fields='picture, name'
                render={renderProps => (
                    <Tooltip onClick={renderProps.onClick} title="Login from Facebook" aria-label="Login from Facebook">
                        <Fab color="primary" className={classes.absolute}>
                            <FacebookIcon fontSize='large' />
                        </Fab>
                    </Tooltip>
                )}/>
        </div>
    );
}