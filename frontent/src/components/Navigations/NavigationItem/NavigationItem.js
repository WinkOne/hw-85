import React from 'react';
import {NavLink} from "react-router-dom";

const NavigationItem = (props) => {
    return <NavLink style={{
        textDecoration: "none",
        fontWeight: "bold",
        textTransform: "capitalize",
        color: "black",
        margin: '5px'
    }}
                    to={props.to}
                    exact={props.exact}
    >
        {props.children}
    </NavLink>
};

export default NavigationItem;