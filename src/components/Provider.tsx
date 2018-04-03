import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withRouter, RouteComponentProps } from 'react-router-dom';

export type Location = any;

export interface IProviderProps extends RouteComponentProps<any> {
  initialLocation?: Location;
  modalComponent: React.Component<any>;
}

class Provider extends React.Component<IProviderProps> {
  static defaultProps = {
    initialLocation: { pathname: '/' },
  };

  static childContextTypes = {
    ModalComponent: PropTypes.func,
    closeModal: PropTypes.func,
    location: PropTypes.object,
    previousLocation: PropTypes.object,
  };

  previousLocation: Location;

  constructor(props: IProviderProps) {
    super(props);
    this.previousLocation = props.initialLocation;
    this.closeModal = this.closeModal.bind(this);
  }

  getChildContext() {
    return {
      ModalComponent: this.props.modalComponent,
      closeModal: this.closeModal,
      location: this.props.location,
      previousLocation: this.previousLocation,
    };
  }

  componentWillUpdate(nextProps: IProviderProps) {
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

export default withRouter<IProviderProps>(Provider);
