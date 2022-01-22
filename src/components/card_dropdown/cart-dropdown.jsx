import React from 'react';
import { connect } from "react-redux";
import './cart-dropdown.styles.scss';
import CartItem from "../cart-item/cart-item";
import { selectCartItems  } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import {toggleCartHidden} from '../../redux/cart/cart.actions'

const CartDropDown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <button
      className="custom-button-container"
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </button>
  </div>
);


const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});



export default withRouter(connect(mapStateToProps)(CartDropDown));