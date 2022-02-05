
import './App.css';
import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';

import ShopPage from './pages/shop/shop.component';

import Header from './components/header/header.component';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import {auth} from './firebase/firebase.utils'
import React from 'react';



class App extends React.Component {
  constructor() {

    super();

    this.state = { 
      currentUser: null
    }
  }
  render(){
  return (
    <div>
      <Header currentUser={this.state.currentUser}/>
      <Routes>
      <Route exact path='/' element={<HomePage/>}/>
      <Route path='/shop' element={<ShopPage/>}/>
      <Route path='/signin' element={<SignInAndSignUpPage></SignInAndSignUpPage>}/>

      </Routes>
    </div>
  );
  }
  unsubscribeFromAuth=null;

  componentDidMount(){
    auth.onAuthStateChanged(user=>{
      this.setState({currentUser:user})

      console.log(user);
    })
  }

  componentWillUnmount() {
      this.unsubscribeFromAuth();
  }
}



export default App;
