import React, { PropTypes } from 'react';
import { Route} from 'react-router-dom';
import {NavItem} from 'react-bootstrap';

const RouteNavItem = (props) => (
  <Route path={props.href} exact children={({ match }) => (
    <NavItem {...props} active={ match ? true : false }>{props.children}</NavItem>
  )}/>
);

RouteNavItem.propTypes = {
  href: PropTypes.string,
  children: PropTypes.any,
};

export default RouteNavItem;
