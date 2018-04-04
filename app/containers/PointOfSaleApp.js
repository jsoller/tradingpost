import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import QuickProductsContainer from './QuickProductsContainer';
import QuickProductsSearchContainer from './QuickProductsSearchContainer';
import CartHeaderContainer from './CartHeaderContainer';
import CartContainer from './CartContainer';
import CartTotalContainer from './CartTotalContainer';
import SearchContainer from './SearchContainer';
import CheckoutContainer from './CheckoutContainer';
import styles from '../components/TradingPost.css';

const PointOfSaleApp = () => (
  <Container>
    <Row>
      <h2 >Trading Post Sales</h2>
    </Row>
    <Row>
      <Col>
        <QuickProductsSearchContainer />
        <QuickProductsContainer />
      </Col>
      <Col>
        <CartHeaderContainer />
        <CartContainer />
        <CartTotalContainer />
      </Col>
    </Row>
    <Row>
      <Col>
      </Col>
      <Col>
           <CheckoutContainer />
      </Col>
    </Row>
  </Container>
)

export default PointOfSaleApp
