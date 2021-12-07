import React from 'react';
import { connect } from "react-redux";
import {auth} from '../../firebase/firebase.utils';

import { createStructuredSelector } from "reselect";
import CartIcon  from "../cart-icon/cart-icon";
import './header.styles.jsx';
import CartDropDown from '../card_dropdown/cart-dropdown';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from "../../redux/user/user.selector";

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv} from './header.styles';

const Header = ({currentUser, hidden}) => (
    <HeaderContainer>
        <LogoContainer to="/">
<Logo className="logo" />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to="/shop">
                SHOP
    </OptionLink>
            <OptionLink  to="/shop">
                CONTACT
    </OptionLink>
   
    {currentUser ? (<OptionDiv onClick={() => auth.signOut()}>
    SING OUT
    </OptionDiv>
    ):(
    <OptionLink className="option" to="/signin">
        SING IN
    </OptionLink>
    )} 
    <CartIcon/>
        </OptionsContainer>
  {  hidden ? null : 
    <CartDropDown/>}
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});
export default connect(mapStateToProps)(Header);