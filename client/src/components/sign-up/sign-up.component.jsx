import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { connect } from 'react-redux';
import { signUpInit } from '../../redux/user/user.actions';

import './sign-up.styles.scss';

const SignUp = ({ signUpStart }) => {
    const [userCredentials, setUserCredentials] = useState({ displayName: '', email: '', password: '', confirmPassword: '' });

    const { displayName, email, password, confirmPassword } = userCredentials;
    const handleSubmit = async event => {
        event.preventDefault();
        //const { signUpStart } = this.props;


        if (password !== confirmPassword) {
            alert("passwrods don't mmach");
            return;
        }

        signUpStart({ displayName, email, password });

    };

    const handleChange = event => {
        const { name, value } = event.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    };


    return (
        <div className='sign-up'>
            <h2 className='title'>I do not have a account</h2>
            <span>SIgn up with your email and password</span>
            <form className='sign-upform' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                    label='Display Name'
                    required
                />
                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    label='Email'
                    required
                />
                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    label='Password'
                    required
                    autoComplete='on'
                />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                    label='Confirm APassword'
                    required
                    autoComplete='on'
                />
                <CustomButton type='submit'>
                    Sign UP!!!
                </CustomButton>

            </form>
        </div>
    );

};

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredeintials => dispatch(signUpInit(userCredeintials))
});

export default connect(null, mapDispatchToProps)(SignUp);