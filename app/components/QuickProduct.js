import React from 'react';
import PropTypes from 'prop-types';

const QuickProduct = ({ price, quantity, title }) => (
  <div>
    {title} - &#36;{price / 100}{quantity ? ` x ${quantity}` : null}
  </div>
)

QuickProduct.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  title: PropTypes.string
}

export default QuickProduct
