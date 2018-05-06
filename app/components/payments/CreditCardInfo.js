import React from 'react';
import PropTypes from 'prop-types';
import { Label, Input } from 'reactstrap';
import styles from '../TradingPost.css';

const CreditCardInfo = ({ title }) => (
    <div className={styles.leftsidehdr}>
        <h3>Credit Card Payment Info</h3>
        <Input type="textarea" name="text" id="creditCardText" />
    </div>
);



export default CreditCardInfo
