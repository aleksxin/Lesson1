import React from "react";

import { connect } from "react-redux";


import { ReactComponent as Logo } from '../..//assets/crown.svg';
import { auth } from "../../firebase/firebase.utils";

import CartIcon from "../cart-icon/cart-icon.component";
import { createStructuredSelector } from "reselect";
import { selectCartHudden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { HeaderContainer, LogoContainer, OptionLink, OptionsContainer } from "./header.styles";

import CartDropdown from "../cart-dropdown/cart-dropdown.component";


const Header=({currentUser,hidden})=>(
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className='logo'/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink className='option' to='/shop'>SHOP</OptionLink>
            <OptionLink className='option' to='/shop'>CONTACT</OptionLink>
            {
                    currentUser ?
                    <OptionLink as="div" className="option" onClick={() => auth.signOut()}>SIGN OUT</OptionLink>:
                    <OptionLink className='option' to ='/signin'>SIGN IN</OptionLink>
            }
            <CartIcon/>
           </OptionsContainer>
           {
                hidden ? null:        
        <CartDropdown/>
           }
    </HeaderContainer>
)

const mapStateToProps= createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden:selectCartHudden

});

export default connect(mapStateToProps)(Header);