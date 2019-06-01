import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
// import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = () =>(
    <ul className="nav flex-column">
       <NavigationItem link='/' exact>register</NavigationItem>
       <NavigationItem link='/retrieve'>retrieve</NavigationItem>
       <NavigationItem link='/suspend'>Suspend Student</NavigationItem>
       <NavigationItem link='/send'>Send Nofification</NavigationItem>
    </ul>
);
export default navigationItems