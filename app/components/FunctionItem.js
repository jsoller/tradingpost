import React from 'react';
import PropTypes from 'prop-types';
import FunctionProduct from './FunctionProduct';

const FunctionItem = ({ onCheckRestrictionClicked }) => (
    <div style={{ marginBottom: 20 }}>
        <button
            onClick={onCheckRestrictionClicked}
            disabled={product.checkId ? 'Check Id' : ''}>
    </button>
    </div>
)

FunctionItem.propTypes = {
    onCheckRestrictionClicked: PropTypes.func.isRequired
}

export default FunctionItem
