import React from 'react';
import PropTypes from 'prop-types';

const FunctionList = ({ title }) => (
  <div>
    <h3>{title}</h3>
  </div>
)

FunctionList.propTypes = {
  title: PropTypes.string.isRequired
}

export default FunctionList