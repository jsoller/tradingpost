// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import { Container, Row, Col } from 'reactstrap';
import Login from './Login';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <Container className={styles.container}>
        <h1>Welcome to the Trading Post</h1>
        <Link className={styles.continue} to="/p">Proceed to store...</Link>
        <Row></Row>
        <Row></Row>
      <Row>
        <Col>
          <Login />
        </Col>
      </Row>
      </Container >
    );
  }
}

