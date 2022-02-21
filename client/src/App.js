
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import CheckoutPage from './pages/checkout/checkout.component';
import { checkUserSession } from './redux/user/user.actions';




const App = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  //const checkUserSessionHandler = () => dispatch(checkUserSession());

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='shop/*' element={<ShopPage />} />
        <Route path='checkout' element={<CheckoutPage />} />
        <Route path='signin' element={currentUser ? (<Navigate to='/' />) : (<SignInAndSignUpPage />)} />


      </Routes>
    </div>
  );

};

// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser
// });

// const mapDispatchToProps = dispatch => ({
//   checkUserSession: () => dispatch(checkUserSession())
// });

export default App;
