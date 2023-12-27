import React, { useState, useEffect } from 'react';
import { BsLinkedin, BsGithub } from "react-icons/bs";

const ProfileCard = ({ name, email, image }) => {
    return (
        <>
            <div className="boxAboutUs">
                <div className="top-barAboutUs"></div>
                <div className="topAboutUs">
                    {/* <i className="fa fa-check-circle" aria-hidden="true"></i> */}
                    {/* <input type="checkbox" className="heart-btn" id="heart-btn-1" /> */}
                    {/* <label className="heart" for="heart-btn-1"></label> */}
                </div>
                <div className="contentAboutUs">
                    <img src={image} alt="" />
                    <strong>{name}</strong>
                    <p>{email}</p>
                </div>
                <div className='btnAboutUs'>
                    <a href="https://www.linkedin.com/in/dimitri-bertrand-2b1b4b1b9/" rel="noreferrer"><BsLinkedin /></a>
                    <a href="#" rel="noreferrer"><BsGithub /></a>
                </div>
            </div>
        </>
    );
}

export default ProfileCard;