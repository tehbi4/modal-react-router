import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Provider extends React.Component {
  static defaultProps = {
    initialLocation: { pathname: '/' },
  }

  constructor(props) {
    super(props);
    this.previousLocation = props.initialLocation;
    this.closeModal = this.closeModal.bind(this);
  }

  getChildContext() {
    return {
      previousLocation: this.previousLocation,
      location: this.props.location,
      ModalComponent: this.props.modalComponent,
      closeModal: this.closeModal,
    };
  }

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    // set previousLocation if props.location is not modal
    if (nextProps.history.action !== 'POP' && (!location.state || !location.state.modal)) {
      this.previousLocation = location;
    }
  }

  closeModal() {
    this.props.history.push(this.previousLocation);
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

Provider.childContextTypes = {
  previousLocation: PropTypes.object,
  location: PropTypes.object,
  ModalComponent: PropTypes.func,
  closeModal: PropTypes.func,
};

export default withRouter(Provider);
