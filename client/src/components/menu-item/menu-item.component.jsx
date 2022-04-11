import React from "react";
import { useNavigate } from "react-router-dom";

//import './menu-item.styles.scss'
import { MenuItemContainer, BackgroundImageConteiner, ContentContainer, ContentTitle, ContentSubtitle } from './menu-item.styles';

const MenuItem = ({ title, imageUrl, size, linkUrl }) => {
    const navigate = useNavigate();
    // console.log(size);
    return (
        <MenuItemContainer size={size} onClick={() => { navigate(linkUrl); }}>
            <BackgroundImageConteiner className="background-image" imageUrl={imageUrl} />
            <ContentContainer className='content'>
                <ContentTitle >{title.toUpperCase()}</ContentTitle>
                <ContentSubtitle >SHOP NOW</ContentSubtitle>
            </ContentContainer>
        </MenuItemContainer>
    );
};

export default MenuItem;