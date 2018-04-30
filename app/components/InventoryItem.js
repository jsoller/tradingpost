import React from 'react';
import PropTypes from 'prop-types';
import DisplayProduct from './DisplayProduct';
import { removeFromCart } from '../actions/pointOfSale';
import styles from '../components/TradingPost.css';

//currently allowing products to be sold even if remaining count states none left
const remain_cntItem = ({ product, onAddToCartClicked }) => (
    <div className={styles.cartdisplay}>
        {product.upc_code + ' ' + product.nme + '  -  current quantity = ' + product.remain_cnt}
        <input
            className="form-control"
            type="number" step="1"
            // value={product.remain_cnt}
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
    //       // disabled={product.remain_cnt > 0 ? '' : 'disabled'}
    //       >
    //       {/* {product.remain_cnt > 0 ? product.nme + " $" + (product.price / 100) : 
    //        product.nme + ' Sold Out'} */}
    //       {product.nme + '  -  current quantity = ' + product.remain_cnt} 
    //     </button>
    //     <button
    //       className={styles.cartdisplaydel}
    //       onClick={() => removeFromCart(productid)}>DEL
    //       </button>
    //    </div>
)

remain_cntItem.propTypes = {
    product: PropTypes.shape({
        nme: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        remain_cnt: PropTypes.number.isRequired,
        upc_code: PropTypes.string.isRequired,
        restricted_item_flag: PropTypes.number.isRequired
    }).isRequired,
    onAddToCartClicked: PropTypes.func.isRequired
}

export default remain_cntItem
