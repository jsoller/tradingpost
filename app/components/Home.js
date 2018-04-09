// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import { Container } from 'reactstrap';
// import SignOn from '../components/SignOn';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <Container className={styles.container}>
        <h1>Welcome to the Trading Post</h1>
        <Link className={styles.continue} to="/p">Proceed to store...</Link>
      </Container>
    );
  }
}
