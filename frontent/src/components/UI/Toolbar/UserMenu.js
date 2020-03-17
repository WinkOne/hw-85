import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, NavbarBrand, UncontrolledDropdown} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const UserMenu = ({user}) => {
    return (
     <UncontrolledDropdown nav inNavbar>
       <DropdownToggle nav caret>
         Hello, {user.username}!
       </DropdownToggle>
       <DropdownMenu right>
         <DropdownItem>
           View profile
         </DropdownItem>
         <DropdownItem divider />
         <DropdownItem>
           Logout
         </DropdownItem>
         <NavbarBrand tag={RouterNavLink} to="/trackhistory">
           <DropdownItem>
             Track History
           </DropdownItem>
         </NavbarBrand>
       </DropdownMenu>
     </UncontrolledDropdown>
  );
};

export default UserMenu;