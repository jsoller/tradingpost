import React from 'react';
import { Row, Col, Input } from 'reactstrap';
import styles from '../TradingPost.css';

const CheckInfo = ({ title }) => (
    <div className={styles.leftsidehdr}>
        <h3>Check Payment</h3>
        <Row>
            <Col>
                <Input type="text" name="text" id="checkNameText" placeholder="check name" />
            </Col>
            <Col>
                <Input type="text" name="text" id="checkNumberText" placeholder="check number" />
            </Col>
        </Row>
    </div>
);



export default CheckInfo
