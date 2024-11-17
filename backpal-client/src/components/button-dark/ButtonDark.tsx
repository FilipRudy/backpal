import { NavLink } from 'react-router-dom';
import "../button-dark/button-dark.css";

interface ButtonProps {
    message: string;
    path: string;
}

export const ButtonDark = (props: ButtonProps) => {
    return (
        <NavLink to={props.path} className="button-dark jetbrains-mono">
            {props.message}
        </NavLink>
    );
}
