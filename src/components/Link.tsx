import * as React from 'react';
import { Link as ReactRouterLink, LinkProps } from 'react-router-dom';

export interface ILinkProps extends LinkProps {
  modal?: boolean;
}

export interface ILink extends React.StatelessComponent<ILinkProps> {}

const Link: ILink = ({ modal, to, ...props }) => {
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

  return <ReactRouterLink {...props} to={modalTo} />;
};

export default Link;
