import React from 'react';
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import CheckOutItem from '../../components/checkout-item/checkout-item';
import {selectCartItems, selectCartTotal} from '../../redux/cart/cart.selectors';
import StripeCheckOutButton from '../../components/stripe-button/stripe-button';

import './checkout.styles.scss';


const CheckOutPage = ({ cartItems, total }) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block">
        <span>Product</span>
      </div>
      <div className="header-block">
        <span>Description</span>
      </div>
      <div className="header-block">
        <span>Quantity</span>
      </div>
      <div className="header-block">
        <span>price</span>
      </div>
      <div className="header-block">
        <span>remove</span>
      </div>
      <StripeCheckOutButton price={total} />
    </div>
    {cartItems.map((cartItem) => (
      <CheckOutItem key={cartItem.id} cartItem={cartItem} />
    ))}

    <div className="total">TOTAL: ${total}</div>
    <div className="test-warning">
      *Please use the following test credit card for payments*
      <br/>
      4242 4242 4242 4242 -exp:01/20 - CVV:123
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});


export default connect(mapStateToProps)(CheckOutPage);