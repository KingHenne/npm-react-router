/// <reference path="../react-router.d.ts" />

import React from 'react';
import { withRouter, IWithRouterProps } from '../react-router';

interface IProps extends IWithRouterProps {
  params: {
    foo: string;
  };
}

class FooComponent extends React.Component<IProps, void> {
  render() {
    return (
      <div>{this.props.params.foo}</div>
    );
  }
}

export default withRouter(FooComponent);
