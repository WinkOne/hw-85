import React, {Fragment} from 'react';
import NavigationItem from "../NavigationItem/NavigationItem";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";


const Toolbars = () => {
    return (
        <Fragment>
            <Button variant="contained" color="secondary"><NavigationItem tag={NavLink} to={"/"} exact><span style={{color: 'white', fontWeight: 'bold'}}>Main</span></NavigationItem></Button>
        </Fragment>
    );
};

export default Toolbars;