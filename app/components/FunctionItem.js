import React from 'react';
import PropTypes from 'prop-types';
import FunctionProduct from './FunctionProduct';

// const FunctionItem = ({ product, onCheckRestrictionClicked }) => (
//     <div style={{ marginBottom: 20 }}> 
//     <button>
//     {product.checkId === true ? "check id" : "No Check"}
//       </button>

//         </div >
// )
const FunctionItem = ({ product, onCheckRestrictionClicked }) => (
    <div style={{ marginBottom: 20 }}>
        <button
            onClick={onCheckRestrictionClicked}
            disabled={product.checkId === true ? '' : 'disabled'}>
            {product.checkId === true ? "Check Id" : "No Check"}
        </button>
    </div>
)

FunctionItem.propTypes = {
    product: PropTypes.shape({
        productname: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        inventory: PropTypes.number.isRequired,
        upc: PropTypes.number.isRequired,
        checkId: PropTypes.number.isRequired
    }).isRequired,
    onCheckRestrictionClicked: PropTypes.func.isRequired
}

export default FunctionItem
