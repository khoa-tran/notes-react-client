import React, { PropTypes } from 'react';
import { Route } from 'react-router-dom';

const AppliedRoute = ({ component: C, props: cProps, ...rest}) => (
  <Route {...rest} render={ props => <C {...props} {...cProps} /> } />
);

AppliedRoute.propTypes = {
  component: PropTypes.any,
  props: PropTypes.any,
}

export default AppliedRoute;
