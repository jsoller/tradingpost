import React from 'react';
import PropTypes from 'prop-types';
import styles from './TradingPost.css';

const FunctionList = ({ title, children }) => (
  <div className={styles.bottom}>
    <h3>{title}</h3>
    <div>{children}</div>
  </div>
)

FunctionList.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
}

export default FunctionList