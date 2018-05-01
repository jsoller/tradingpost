import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Input, Button } from 'reactstrap';
import { amountEntered } from '../actions/numberpad';
import styles from './TradingPost.css';
import { getTotal } from '../reducers';
import { checkout } from '../actions/pointOfSale';
import { getCartProducts } from '../reducers';


const CashEntryInfo = ({ title, cashpayment, amountEntered, total, products, checkout }) => {
    const btnNum = (number, displaynumber) => {
        return (<Col><Button onClick={() => amountEntered(number)}>{displaynumber}</Button></Col>);
    };
    const btnEnter = (number, displaynumber) => {
        return (<Col><Button onClick={() => checkout("SALE", "CASH", products)}>{displaynumber}</Button></Col>);
    };
    return (
        <div className={styles.leftsidehdr}>
            <h3 >{title}</h3>
            <div> &#36;{(cashpayment / 100).toFixed(2)}</div>
            <div> &#36;{((cashpayment - (total * 100)) / 100).toFixed(2)} CHANGE</div>
            <Row>
                {btnNum(2000, "$20")}
                {btnNum(1000, "$10")}
                {btnNum(500, "$5")}
                {btnNum(100, "$1")}
            </Row>
            <Row>
                {btnNum(7, 7)}
                {btnNum(8, 8)}
                {btnNum(9, 9)}
            </Row>
            <Row>
                {btnNum(4, 4)}
                {btnNum(5, 5)}
                {btnNum(6, 6)}
            </Row>
            <Row>
                {btnNum(1, 1)}
                {btnNum(2, 2)}
                {btnNum(3, 3)}
            </Row>
            <Row>
                <Col xs="4"> </Col>
                {btnNum(0, 0)}
            </Row>
            <Row>
                {btnNum("CLEAR", "CLEAR")}
                {btnEnter("ENTER", "ENTER")}
            </Row>
        </div >
    );
}

CashEntryInfo.propTypes = {
    amountEntered: PropTypes.func.isRequired,
    total: PropTypes.string,
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        nme: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        upc_code: PropTypes.string.isRequired,
        restricted_item_flag: PropTypes.number.isRequired,
    })).isRequired,
    checkout: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        cashpayment: state.keypad.cashpayment,
        total: getTotal(state),
        products: getCartProducts(state),
    };
}

export default connect(
    mapStateToProps,
    {
        amountEntered,
        checkout
    }
)(CashEntryInfo)


// onCheckoutClicked={() => checkout(products)} 

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
