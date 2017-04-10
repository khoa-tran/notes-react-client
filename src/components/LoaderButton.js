import React, { PropTypes } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

const LoaderButton = ({ isLoading, text, loadingText, disabled = false, ...props }) => (
  <Button disabled={ disabled || isLoading } {...props}>
    { isLoading && <Glyphicon glyph="refresh" className="spinning" /> }
    { ! isLoading ? text : loadingText }
  </Button>
);

LoaderButton.propTypes = {
  isLoading: PropTypes.bool,
  text: PropTypes.string,
  loadingText: PropTypes.string,
  disabled: PropTypes.bool,
};

export default LoaderButton;
