import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withRouter as withReactRouter, RouteComponentProps } from 'react-router-dom';

// Diff / Omit taken from https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-311923766
export type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T]; // tslint:disable:max-line-length
export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

export interface IRouteComponentProps<P = any> extends RouteComponentProps<P> {
  closeModal(): void;
}

/**
 * A public higher-order component to access the imperative API
 */
const withRouter = <P extends IRouteComponentProps<any>>(WrappedComponent: React.ComponentType<P> & { name: string })
  : React.ComponentClass<Omit<P, keyof RouteComponentProps<any>>> => {

  class Component extends React.Component<P> {
    static displayName = `withModalRouter(${WrappedComponent.displayName || WrappedComponent.name})`;

    static WrappedComponent = WrappedComponent;

    static contextTypes = {
      closeModal: PropTypes.func,
    };

    render() {
      return <WrappedComponent {...this.props} closeModal={this.context.closeModal} />;
    }
  }

  return withReactRouter<P>(Component);
};

export default withRouter;
