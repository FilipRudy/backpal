import {jwtDecode} from "jwt-decode";

interface JwtPayload {
    userId: string;
}

export const getUserId = (): string | null => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.userId;
    } catch (error) {
        return null;
    }
};
