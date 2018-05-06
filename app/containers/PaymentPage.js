import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import CartTotalContainer from './CartTotalContainer';
import styles from '../components/TradingPost.css';
import CashPaymentContainer from './CashPaymentContainer';
import CouncilSearch from '../components/payments/CouncilSearch';
import CheckInfo from '../components/payments/CheckInfo';
import CreditCardInfo from '../components/payments/CreditCardInfo';

const PaymentPage = () => (
  <Container>
    <Row>
      <h2 >Payment</h2>
    </Row>
    <Row>
      <CouncilSearch />
    </Row>
    <Row>
      <CheckInfo />
    </Row>
    <Row>
      <CreditCardInfo />
    </Row>
    <Row>
      <CartTotalContainer />
    </Row >
    <Row>
      <Col>
      </Col>
      <Col>
      </Col>
      <Col>
        <CashPaymentContainer />
      </Col>
    </Row>
  </Container >
)

const mapStateToProps = (state) => ({
})

export default connect(
  mapStateToProps,
  {}
)(PaymentPage)
