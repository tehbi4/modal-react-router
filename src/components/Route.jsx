import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

class MyRoute extends React.Component {
  componentRender = (props) => {
    const { ModalComponent, modal, closeModal } = this.context;
    const { component, render } = this.props;
    const Component = component || render;
    return modal ? (
      <ModalComponent closeModal={closeModal}>
        <Component {...props} closeModal={closeModal} />
      </ModalComponent>
    ) : (
      <Component {...props} />
    );
  };

  render() {
    const { children, component, render, ...props } = this.props;
    const routeComponent = component ? this.componentRender : undefined;
    const routeRender = render ? this.componentRender : undefined;
    return <Route {...props} component={routeComponent} render={routeRender} />;
  }
}

MyRoute.contextTypes = {
  modal: PropTypes.bool,
  ModalComponent: PropTypes.func,
  closeModal: PropTypes.func,
};

export default MyRoute;
