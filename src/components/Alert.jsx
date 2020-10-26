import React from 'react';
import { Alert as RBAlert } from 'react-bootstrap';

const Alert = ({ error }) => {
  const show = error && error.code !== '404';

  return (
    show && (
      <RBAlert variant='danger'>
        Something went wrong, please reload the page and try again
      </RBAlert>
    )
  );
};

export default Alert;
