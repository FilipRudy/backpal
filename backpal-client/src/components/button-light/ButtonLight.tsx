import React from "react";
import "../button-light/button-light.css";
import { NavLink } from "react-router-dom";

interface ButtonProps {
    message: string;
    path: string;
    onClick?: () => void;
}

export const ButtonLight = ({ message, path, onClick }: ButtonProps) => (
    <NavLink to={path} className="button-light jetbrains-mono" onClick={onClick}>
        {message}
    </NavLink>
);
