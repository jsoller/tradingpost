import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import CouncilContainer from './CouncilContainer';
import CheckPaymentContainer from './CheckPaymentContainer';
import CreditCardContainer from './CreditCardContainer';
import styles from '../components/TradingPost.css';

const PaymentPage = () => (
  <Container>
    <Row>
      <h2 >Payment</h2>
    </Row>
    <Row>
        <CouncilContainer />
    </Row>
    <Row>
        <CheckPaymentContainer />
    </Row>
    <Row>
        <CreditCardContainer />
    </Row>
  </Container>
)

export default PaymentPage
