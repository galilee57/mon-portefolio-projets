import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Button.css';

const Button = ({ text, to }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to, { relative: 'path'});
    }

    return (
        <button className="custom-button" onClick={handleClick}>
            {text}
        </button>
    );
};

export default Button;