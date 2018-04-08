// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
// import SignOn from '../components/SignOn';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link to="/counter">  Inventory </Link>
          <Link to="/p">   Point of Sale</Link>
          <Link to="/payment">   Payment</Link>
        </div>
        {/* <div>
          <SignOn />
        </div> */}
      </div>
    );
  }
}
