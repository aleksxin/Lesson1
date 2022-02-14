import React from "react";


import './sign-in.styles.scss';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, SignInWithGoogle } from "../../firebase/firebase.utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { emailSignInStart, googleSignInStart } from "../../redux/user/user.actions";
import { connect } from "react-redux";

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    handleSubmit = event => {
        event.preventDefault();
        const { emailSignInStart } = this.props;
        const { email, password } = this.state;

        emailSignInStart(email, password);


    };

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value });
    };

    render() {
        const { googleSignInStart } = this.props;
        return (
            <div className="sign-in">
                <h2>I alread have an account</h2>
                <span>Sign in width your email and password</span>

                <form onSubmit={this.handleSubmit}>

                    <FormInput name='email' type='email' handleChange={this.handleChange} value={this.state.email} label='email' required />

                    <FormInput name='password' type='password' value={this.state.password} handleChange={this.handleChange} label='password' required autoComplete='on' />

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
    }
}

const mapDIspatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDIspatchToProps)(SignIn);
