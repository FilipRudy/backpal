import { axiosInstance } from "../axios";
import {validateLoginInput} from "../../validation/validateLoginInput";

interface LoginInput {
    email: string;
    password: string;
}

interface LoginResponse {
    success: boolean;
    errors?: Partial<LoginInput>;
    data?: any;
}

export const login = async (credentials: LoginInput): Promise<LoginResponse> => {
    const validationErrors = validateLoginInput(credentials);

    if (Object.keys(validationErrors).length > 0) {
        return { success: false, errors: validationErrors };
    }

    try {
        const response = await axiosInstance.post('/authentication/sign-in', credentials);
        const token = response.data.accessToken;
        const expiresAt = new Date().getTime() + (60 * 100000);
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiresAt', expiresAt.toString());
        return { success: true, data: response.data };
    } catch (error: any) {
        console.error("Login failed:", error.response.data.message);
        return { success: false, errors: { email: error.response.data.message } };
    }
};
