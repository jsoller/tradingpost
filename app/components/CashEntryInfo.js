import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Input, Button, ButtonToolbar, ButtonGroup } from 'reactstrap';
import { amountEntered } from '../actions/numberpad';
import styles from './TradingPost.css';
import { getTotal } from '../reducers';

const CashEntryInfo = ({ title, cashpayment, amountEntered, total }) => {
    const btnNum = (number, displaynumber) => {
        return (<Button onClick={() => amountEntered(number)}>{displaynumber}</Button>);
    };
    return (
        <div className={styles.leftsidehdr}>
            <h3 >{title}</h3>
            <div> &#36;{cashpayment / 100}</div>
            <div> &#36;{(cashpayment - (total * 100)) / 100} CHANGE</div>
            <ButtonToolbar>
               <ButtonGroup >
                    {btnNum(2000, "$20")}
                    {btnNum(7, 7)}
                    {btnNum(8, 8)}
                    {btnNum(9, 9)}
                </ButtonGroup>
            </ButtonToolbar>
            <ButtonToolbar>
                <ButtonGroup >
                    {btnNum(1000, "$10")}
                    {btnNum(4, 4)}
                    {btnNum(5, 5)}
                    {btnNum(6, 6)}
                </ButtonGroup>
            </ButtonToolbar>
            <ButtonToolbar>
                <ButtonGroup >
                    {btnNum(500, "$5")}
                    {btnNum(1, 1)}
                    {btnNum(2, 2)}
                    {btnNum(3, 3)}
                </ButtonGroup>
            </ButtonToolbar>
            <ButtonToolbar>
                <ButtonGroup >
                    {btnNum(100, "$1 ")}
                    <button type="button" disabled></button>
                    <button type="button" disabled></button>
                    {btnNum(0, 0)}
                </ButtonGroup>
            </ButtonToolbar>
            <ButtonToolbar>
                <ButtonGroup >
                    {btnNum("CLEAR", "CLEAR")}
                    {btnNum("ENTER", "ENTER")}
                </ButtonGroup>
            </ButtonToolbar>
        </div >
    );
}

CashEntryInfo.propTypes = {
    amountEntered: PropTypes.func.isRequired,
    total: PropTypes.string,
}

const mapStateToProps = (state) => {
    return {
        cashpayment: state.keypad.cashpayment,
        total: getTotal(state),
    };
}

export default connect(
    mapStateToProps,
    { amountEntered }
)(CashEntryInfo)


// import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import CartTotal from '../components/CartTotal';
// import { getTotal, getTax } from '../reducers';

// const CartTotalContainer = ({ tax, total }) => (
//   <CartTotal
//     tax={tax}
//     total={total}
//     />
// )

// CartTotalContainer.propTypes = {
//   tax: PropTypes.string,
//   total: PropTypes.string,
// }

// const mapStateToProps = (state) => ({
//   tax: getTax(state),
//   total: getTotal(state),
// })

// export default connect(
//   mapStateToProps,
// )(CartTotalContainer)
