import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CartTotal from '../components/CartTotal';
import { getTotal, getTax } from '../reducers';

const CartTotalContainer = ({ tax, total }) => (
  <CartTotal
    tax={tax}
    total={total}
    />
)

CartTotalContainer.propTypes = {
  tax: PropTypes.integer,
  total: PropTypes.integer,
}

const mapStateToProps = (state) => ({
  tax: getTax(state),
  total: getTotal(state),
})

export default connect(
  mapStateToProps,
)(CartTotalContainer)
