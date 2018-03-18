import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';

class MySwitch extends React.Component {
  static defaultProps = {
    modal: false,
  };

  getChildContext() {
    return {
      modal: this.props.modal,
    };
  }

  render() {
    const { location, previousLocation } = this.context;
    const modalLocation = location.state && location.state.modal;
    const switchLocation = (this.props.modal || !modalLocation ? location : previousLocation) || '/';
    return <Switch location={switchLocation}>{this.props.children}</Switch>;
  }
}

MySwitch.childContextTypes = {
  modal: PropTypes.bool,
};

MySwitch.contextTypes = {
  previousLocation: PropTypes.object,
  location: PropTypes.object,
};

export default MySwitch;
