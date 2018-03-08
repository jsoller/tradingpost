import React from 'react';
import PropTypes from 'prop-types';

const FunctionList = ({ title, children }) => (
  <div>
    <h3>{title}</h3>
    <div>{children}</div>
  </div>
)

FunctionList.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
}

export default FunctionList