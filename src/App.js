
import './App.css';

import { Route, Routes, Navigate } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';

import ShopPage from './pages/shop/shop.component';

import Header from './components/header/header.component';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import {auth, createUserProfileDocument} from './firebase/firebase.utils'
import React from 'react';
import {onSnapshot} from 'firebase/firestore'
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import CheckoutPage from './pages/checkout/checkout.component';



class App extends React.Component {
 
  render(){
  return (
    <div>
      <Header />
      <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='shop/*' element={<ShopPage/>}/>
      <Route path='checkout' element={<CheckoutPage/>}/>
      <Route path='signin' element={ this.props.currentUser?(<Navigate to='/' />):(<SignInAndSignUpPage/>)}/>
      

      </Routes>
    </div>
  );
  }
  unsubscribeFromAuth=null;

  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth => {
      //this.setState({currentUser:user})

        //createUserProfileDocument(user);

        if (userAuth){
          const userRef = await createUserProfileDocument(userAuth);
            

          onSnapshot(userRef,snapShot => {
           // console.log("dsd");
    setCurrentUser({
   id:snapShot.id,
   ...snapShot.data()
 });
          //  console.log(this.state);
          });
         
        }
        setCurrentUser(userAuth);
    })
  }

  componentWillUnmount() {
      this.unsubscribeFromAuth();
  }
}


const mapStateToProps=createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps=dispatch=>({
  setCurrentUser: user=>dispatch(setCurrentUser(user))
})


export default connect(mapStateToProps,mapDispatchToProps)(App);
