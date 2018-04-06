import React from 'react';
import PropTypes from 'prop-types';
import { Label, Input } from 'reactstrap';
// import { getCouncilsIPC, getUnitsIPC } from '../actions/ipcHandler';
import styles from './TradingPost.css';

const CreditCardInfo = ({ title }) => (
    <div className={styles.leftsidehdr}>
    <h3 >{title}</h3>
        <Input type="textarea" name="text" id="creditCardText" />
    </div>
);



export default CreditCardInfo
