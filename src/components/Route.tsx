import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Route as ReactRouterRoute, RouteProps } from 'react-router-dom';

export interface IRouteProps extends RouteProps {}

class Route extends React.Component<IRouteProps> {
  static contextTypes = {
    ModalComponent: PropTypes.func,
    closeModal: PropTypes.func,
    modal: PropTypes.bool,
  };

  componentRender = (props: RouteProps) => {
    const { ModalComponent, modal, closeModal } = this.context;
    const { component, render } = this.props;
    const Component: any = component || render;
    return modal ? (
      <ModalComponent closeModal={closeModal}>
        <Component {...props} closeModal={closeModal} />
      </ModalComponent>
    ) : (
      <Component {...props} />
    );
  }

  render() {
    const { children, component, render, ...props } = this.props;
    const routeComponent = component ? this.componentRender : undefined;
    const routeRender = render ? this.componentRender : undefined;
    return <ReactRouterRoute {...props} component={routeComponent} render={routeRender} />;
  }
}

export default Route;
