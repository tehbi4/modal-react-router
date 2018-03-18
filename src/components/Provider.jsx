import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Provider extends React.Component {
  previousLocation = this.props.location;

  getChildContext() {
    return {
      previousLocation: this.previousLocation,
      location: this.props.location,
      ModalComponent: this.props.modalComponent,
    };
  }

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    // set previousLocation if props.location is not modal
    if (nextProps.history.action !== 'POP' && (!location.state || !location.state.modal)) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

Provider.childContextTypes = {
  previousLocation: PropTypes.object,
  location: PropTypes.object,
  ModalComponent: PropTypes.func,
};

export default withRouter(Provider);
