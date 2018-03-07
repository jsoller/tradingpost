// @flow
import * as React from 'react';
import Nav from './Nav';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <Nav />
        {this.props.children}
      </div>
    );
  }
}

