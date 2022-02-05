import React from "react";
import { Link } from "react-router-dom";

import './header.styles.scss';
import { ReactComponent as Logo } from '../..//assets/crown.svg';
import { auth } from "../../firebase/firebase.utils";
import { updateCurrentUser } from "firebase/auth";

const Header=({currentUser})=>(
    <div className='header'>
        <Link to="/">
            <Logo className='logo'/>
        </Link>
        <div className="options">
            <Link className='option' to='/shop'>Shop</Link>
            <Link className='option' to='/shop'>Contact</Link>
            {
                    currentUser ?
                    <div className="option" onClick={() => auth.signOut()}>SIGN out</div>:
                    <Link className='option' to ='/signin'>Sgin IN</Link>
            }
        </div>
    </div>
)

export default Header;