import React from "react";

import './custom-button.styles.scss';

const CustomButton = ({children, isGoogleSignIn, inverted2, ...otherProps}) => (
    <button className={`${inverted2 ? 'inverted':''} ${isGoogleSignIn ? 'google-sign-in':''} custom-button`} {...otherProps}>
        {children}

    </button>
);

export default CustomButton;