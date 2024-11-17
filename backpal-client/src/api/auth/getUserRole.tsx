import {jwtDecode} from "jwt-decode";

interface JwtPayload {
    role: string;
}

export const getUserRole = (): string | null => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.role;
    } catch (error) {
        return null;
    }
};
