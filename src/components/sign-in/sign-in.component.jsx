import React from "react";

import './sign-in.styles.scss';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, SignInWithGoogle } from "../../firebase/firebase.utils";
import { signInWithEmailAndPassword, signInWithEmailLink } from "firebase/auth";

class SignIn extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            email: '',
            password: ''
        }
    }

    handleSubmit=event=>{
        event.preventDefault();

        const { email, password}=this.state;
        try{
            

             signInWithEmailAndPassword(auth,email,password);
            
        

        this.setState({email:'',password:''})
        } catch (error) {
            console.log("error with signing in"+error);
        }    

    }

    handleChange=event=>{
        const{value,name}=event.target;

        this.setState({[name]: value})
    }

    render() {
        return (
            <div className="sign-in">
                <h2>I alread have an account</h2>
                <span>Sign in width your email and password</span>

                <form onSubmit={this.handleSubmit}>
                
                    <FormInput name='email' type='email' handleChange={this.handleChange} value={this.state.email} label='email' required/>
                
                   <FormInput name='password' type='password' value={this.state.password} handleChange={this.handleChange} label='password' required/>
                    
                    <div className='buttons'>   
                                     <CustomButton type="submit">
                        Sign in
                        </CustomButton>
                        <CustomButton  onClick={SignInWithGoogle} isGoogleSignIn>
                            {' '}
                        Sign in with google {' '}
                    
                        </CustomButton>    
                     </div>   
                </form>
            </div>
        )
    }
}

export default SignIn;