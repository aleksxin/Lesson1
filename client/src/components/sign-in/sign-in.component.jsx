import React, { useState } from "react";


import './sign-in.styles.scss';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { emailSignInStart, googleSignInStart } from "../../redux/user/user.actions";
import { connect } from "react-redux";

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [userCredentials, setCredentials] = useState({ email: '', password: '' });


    const { email, password } = userCredentials;
    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStart(email, password);
    };

    const handleChange = event => {
        const { value, name } = event.target;
        setCredentials({ ...userCredentials, [name]: value });
    };
    //const { googleSignInStart } = this.props;

    return (
        <div className="sign-in">
            <h2>I alread have an account</h2>
            <span>Sign in width your email and password</span>

            <form onSubmit={handleSubmit}>

                <FormInput name='email' type='email' handleChange={handleChange} value={email} label='email' required />

                <FormInput name='password' type='password' value={password} handleChange={handleChange} label='password' required autoComplete='on' />

                <div className='buttons'>
                    <CustomButton type="submit">
                        Sign in
                    </CustomButton>
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>
                        {' '}
                        Sign in with google {' '}

                    </CustomButton>
                </div>
            </form>
        </div>
    );

};

const mapDIspatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDIspatchToProps)(SignIn);