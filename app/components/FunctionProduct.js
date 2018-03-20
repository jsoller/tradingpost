import React from 'react';
import PropTypes from 'prop-types';

const FunctionProduct = ({ checkId }) => (
  <div>
    {checkId}
  </div>
)

FunctionProduct.propTypes = {
  checkId: PropTypes.number,
}

export default FunctionProduct