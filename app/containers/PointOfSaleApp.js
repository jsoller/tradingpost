import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import QuickProductsContainer from './QuickProductsContainer';
import QuickProductsSearchContainer from './QuickProductsSearchContainer';
import InventorySearchContainer from './InventorySearchContainer';
import CartHeaderContainer from './CartHeaderContainer';
import CartContainer from './CartContainer';
import CartTotalContainer from './CartTotalContainer';
import CheckoutContainer from './CheckoutContainer';
import styles from '../components/TradingPost.css';

const PointOfSaleApp = () => (
  <Container>
    <Row>
      <h2 >Trading Post Sales</h2>
    </Row>
    <Row>
      <Col>
      <h3 >Inventory</h3>
        <InventorySearchContainer />
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
