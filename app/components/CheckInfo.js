import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input } from 'reactstrap';
// import { getCouncilsIPC, getUnitsIPC } from '../actions/ipcHandler';
import styles from './TradingPost.css';

const CheckInfo = ({ title }) => (
    <div className={styles.leftsidehdr}>
        <h3 >{title}</h3>
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
