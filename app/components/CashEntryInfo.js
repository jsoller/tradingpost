import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Input, Button, ButtonToolbar, ButtonGroup } from 'reactstrap';
import { amountEntered } from '../actions/numberpad';
import styles from './TradingPost.css';

const CashEntryInfo = ({ title, cashpayment, amountEntered }) => {
    const btnNum = (number) => {
        return (<Button onClick={() => amountEntered(number)}>{number}</Button>);
    };
    return (
        <div className={styles.leftsidehdr}>
            <h3 >{title}</h3>
            <div> &#36;{cashpayment / 100}</div>
            <ButtonToolbar>
                {/* <ButtonGroup onChange={this.amountEntered}> */}
                <ButtonGroup >
                    {btnNum(7)}
                    {btnNum(8)}
                    {btnNum(9)}
                </ButtonGroup>
            </ButtonToolbar>
            <ButtonToolbar>
                {/* <ButtonGroup onChange={() => amountEntered(this.target.value)} > */}
                <ButtonGroup >
                    {btnNum(4)}
                    {btnNum(5)}
                    {btnNum(6)}
                </ButtonGroup>
            </ButtonToolbar>
            <ButtonToolbar>
                <ButtonGroup >
                    {btnNum(1)}
                    {btnNum(2)}
                    {btnNum(3)}
                </ButtonGroup>
            </ButtonToolbar>
            <ButtonToolbar>
                <ButtonGroup >
                    {btnNum(0)}
                    {btnNum("ENTRY")}
                </ButtonGroup>
            </ButtonToolbar>
        </div >
    );
}

CashEntryInfo.propTypes = {
    amountEntered: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        cashpayment: state.keypad.cashpayment,
    };
}

export default connect(
    mapStateToProps,
    { amountEntered }
)(CashEntryInfo)
