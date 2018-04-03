import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Switch as ReactRouterSwitch } from 'react-router-dom';

// TODO: implement SwitchProps exporting in file https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-router-dom/index.d.ts
// and replace this interface with SwitchProps from 'react-router-dom'
export interface IReactRouterSwitchProps {
  children?: React.ReactNode;
  location?: any;
}

export interface ISwitchProps extends IReactRouterSwitchProps {
  modal?: boolean;
}

class Switch extends React.Component<ISwitchProps> {
  static defaultProps = {
    modal: false,
  };

  static childContextTypes = {
    modal: PropTypes.bool,
  };

  static contextTypes = {
    location: PropTypes.object,
    previousLocation: PropTypes.object,
  };

  getChildContext() {
    return {
      modal: this.props.modal,
    };
  }

  render() {
    const { location, previousLocation } = this.context;
    const currentLocation = this.props.modal || !(location.state && location.state.modal);
    const switchLocation = (currentLocation ? location : previousLocation);
    return <ReactRouterSwitch location={switchLocation}>{this.props.children}</ReactRouterSwitch>;
  }
}

export default Switch;
