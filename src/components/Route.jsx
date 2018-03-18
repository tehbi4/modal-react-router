import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

class MyRoute extends React.Component {
  componentRender = (props) => {
    const { ModalComponent } = this.context;
    const { component, render } = this.props;
    const Component = component || render;
    return this.context.modal ? (
      <ModalComponent>
        <Component {...props} />
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
};

export default MyRoute;
