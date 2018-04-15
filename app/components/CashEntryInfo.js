import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Input, Button } from 'reactstrap';
import { amountEntered } from '../actions/numberpad';
import styles from './TradingPost.css';
import { getTotal } from '../reducers';

const CashEntryInfo = ({ title, cashpayment, amountEntered, total }) => {
    const btnNum = (number, displaynumber) => {
        return (<Col><Button onClick={() => amountEntered(number)}>{displaynumber}</Button></Col>);
    };
    return (
        <div className={styles.leftsidehdr}>
            <h3 >{title}</h3>
            <div> &#36;{cashpayment / 100}</div>
            <div> &#36;{(cashpayment - (total * 100)) / 100} CHANGE</div>
            {/* <Row>
                <Col > */}
            <Row>
                    {btnNum(2000, "$20")}
                    {btnNum(1000, "$10")}
                    {btnNum(500, "$5")}
                    {btnNum(100, "$1")}
            </Row>
            {/* {/* </Col>
            </Row> */}
            {/* <Row>
                <Col > */}
            <Row>
                    {btnNum(7, 7)}
                    {btnNum(8, 8)}
                    {btnNum(9, 9)}
            </Row>
            {/* </Col>
            </Row> */}
            <Row>
                    {/* <button type="button" disabled></button> */}
                    {btnNum(4, 4)}
                    {btnNum(5, 5)}
                    {btnNum(6, 6)}
                    {/* <button type="button" disabled></button> */}
            </Row>
            <Row>
                    {/* <button type="button" disabled></button> */}
                    {btnNum(1, 1)}
                    {btnNum(2, 2)}
                    {btnNum(3, 3)}
                    {/* <button type="button" disabled></button> */}
            </Row>
            <Row>
                    <Col xs="4"> </Col>
                    {btnNum(0, 0)}
                    {/* <button type="button" disabled></button>
                    <button type="button" disabled></button>
                    <button type="button" disabled></button> */}
            </Row>
            <Row>
                    {btnNum("CLEAR", "CLEAR")}
                    {btnNum("ENTER", "ENTER")}
            </Row>
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
