import React from 'react';
import PropTypes from 'prop-types';
import DisplayProduct from './DisplayProduct';
import { removeFromCart } from '../actions/pointOfSale';
import styles from '../components/TradingPost.css';

//currently allowing products to be sold even if inventory states none left
const InventoryItem = ({ product, onAddToCartClicked }) => (
    <div className={styles.cartdisplay}>
        {product.upc + ' ' + product.productname + '  -  current quantity = ' + product.inventory}
        <input
            className="form-control"
            type="number" step="1"
            value={product.inventory}
        // placeholder=''
        // value = ""  //if this is set to null it resets what is entered so do not see letters typed
        // onChange={(searchentry) => getProductsIPC('productByName', searchentry.target.value)}
        /*  instead of calling getProductsIPC call an action like searchchange & pass searchentry
        pass in a searchentry value to quickproductsearch and then reset it when addtocart*/
        />
    </div>
    //   <div style={{ marginBottom: 10 }}>
    //     <button
    //       onClick={onAddToCartClicked}
    //       // disabled={product.inventory > 0 ? '' : 'disabled'}
    //       >
    //       {/* {product.inventory > 0 ? product.productname + " $" + (product.price / 100) : 
    //        product.productname + ' Sold Out'} */}
    //       {product.productname + '  -  current quantity = ' + product.inventory} 
    //     </button>
    //     <button
    //       className={styles.cartdisplaydel}
    //       onClick={() => removeFromCart(productid)}>DEL
    //       </button>
    //    </div>
)

InventoryItem.propTypes = {
    product: PropTypes.shape({
        productname: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        inventory: PropTypes.number.isRequired,
        upc: PropTypes.number.isRequired,
        checkId: PropTypes.number.isRequired
    }).isRequired,
    onAddToCartClicked: PropTypes.func.isRequired
}

export default InventoryItem
