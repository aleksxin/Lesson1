import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import './header.styles.scss';
import { ReactComponent as Logo } from '../..//assets/crown.svg';
import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import { createStructuredSelector } from "reselect";
import { selectCartHudden } from "../../redux/cart/cart.selectors";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import CurrentUserContesxt from "../../contexts/current-user/current-user.context";
import { CartContext } from "../../provider/cart/cart.provider";


const Header = () => {

    const currentUser = useContext(CurrentUserContesxt);
    const { hidden } = useContext(CartContext);



    return (
        <div className='header'>
            <Link to="/">
                <Logo className='logo' />
            </Link>
            <div className="options">
                <Link className='option' to='/shop'>SHOP</Link>
                <Link className='option' to='/shop'>CONTACT</Link>
                {
                    currentUser ?
                        <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div> :
                        <Link className='option' to='/signin'>SIGN IN</Link>
                }

                <CartIcon />

            </div>
            {
                hidden ? null :
                    <CartDropdown />
            }
        </div>
    );
};
const mapStateToProps = createStructuredSelector({

    hidden: selectCartHudden

});

export default connect(mapStateToProps)(Header);