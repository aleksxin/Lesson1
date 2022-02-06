
import './App.css';
import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';

import ShopPage from './pages/shop/shop.component';

import Header from './components/header/header.component';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import {auth, createUserProfileDocument} from './firebase/firebase.utils'
import React from 'react';
import {onSnapshot} from 'firebase/firestore'



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
    this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth => {
      //this.setState({currentUser:user})

        //createUserProfileDocument(user);

        if (userAuth){
          const userRef = await createUserProfileDocument(userAuth);


          onSnapshot(userRef,snapShot => {
            
            this.setState({
              currentUser: {
              id: snapShot.id,
              ...snapShot.data()
              }
            });

          //  console.log(this.state);
          });
         
        }
        this.setState({currentUser: userAuth});
    })
  }

  componentWillUnmount() {
      this.unsubscribeFromAuth();
  }
}



export default App;
