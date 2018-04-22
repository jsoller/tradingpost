import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import InventoryContainer from './InventoryContainer';
import InventorySearchContainer from './InventorySearchContainer';
import styles from '../components/TradingPost.css';
import { getProductsIPC } from '../actions/ipcHandler';

class InventoryPage extends React.Component {
    componentDidMount() {
        getProductsIPC('product', null);
    }

    render() {
        return (
            < Container >
                <Row>
                    <h2 >Inventory Reconciliation</h2>
                </Row>
                <Row>
                    <Col>
                        {/* <h3 >Inventory</h3> */}
                        <InventorySearchContainer />
                        <InventoryContainer />
                    </Col>
                </Row>
            </Container >
        );
    }
}

export default InventoryPage
