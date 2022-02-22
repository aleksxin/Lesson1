import './App.css';

import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import React from 'react';
import { onSnapshot } from 'firebase/firestore';
import CheckoutPage from './pages/checkout/checkout.component';
import CurrentUserContesxt from './contexts/current-user/current-user.context';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }
  render() {
    return (
      <div>
        <CurrentUserContesxt.Provider value={this.state.currentUser}>
          <Header />
        </CurrentUserContesxt.Provider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='shop/*' element={<ShopPage />} />
          <Route path='checkout' element={<CheckoutPage />} />
          <Route path='signin' element={this.state.currentUser ? (<Navigate to='/' />) : (<SignInAndSignUpPage />)} />


        </Routes>
      </div>
    );
  }
  unsubscribeFromAuth = null;
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        onSnapshot(userRef, snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
}





export default App;
