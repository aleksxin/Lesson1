import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth,createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';
import { createUserWithEmailAndPassword } from 'firebase/auth';

class SignUp extends React.Component{
    constructor(){
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {displayName,email,password,confirmPassword}=this.state;

        if (password!==confirmPassword){
            alert ("passwrods don't mmach");
            return;
        }

        try{
            const {user} = await createUserWithEmailAndPassword(auth,email,password);
            //const {user} = await auth.createUserWithEmailAndPassword(email,password);

            await createUserProfileDocument  (user, {displayName});

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error(error);
        }

    };

    handleChange = event => {
        const { name , value} = event.target;
        this.setState({[name]:value});
    }

    render() {
        const {displayName,email,password,confirmPassword} = this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have a account</h2>
                <span>SIgn up with your email and password</span>
                <form className='sign-upform' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label='Display Name'
                        required
                        />
                        <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='Email'
                        required
                        />
                        <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='Password'
                        required
                        autoComplete='on'
                        />
                        <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm APassword'
                        required
                        autoComplete='on'
                        />
                        <CustomButton type='submit'>
                            Sign UP!!!
                        </CustomButton>

                </form>
            </div>
        )
    }
}


export default SignUp;