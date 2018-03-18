import React from 'react';
import { Link } from 'react-router-dom';

const MyLink = ({ modal, to, ...props }) => {
  let modalTo = to;
  if (modal) {
    if (typeof to === 'string') {
      modalTo = {
        pathname: to,
        state: { modal: true },
      };
    } else if (typeof to === 'object') {
      modalTo = {
        ...to,
        state: {
          ...to.state,
          modal: true,
        },
      };
    }
  }

  return <Link {...props} to={modalTo} />;
};

export default MyLink;
