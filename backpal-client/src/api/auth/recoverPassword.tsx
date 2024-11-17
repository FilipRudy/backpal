import { axiosInstance } from "../axios";
import {validateRecoverPasswordInput} from "../../validation/validateRecoverPasswordInput";

interface RecoverPasswordResponse {
    success: boolean;
    error?: string;
    data?: any;
}

export const recoverPassword = async (email: string): Promise<RecoverPasswordResponse> => {
    const validationErrors = validateRecoverPasswordInput({ email });

    if (validationErrors) {
        return { success: false, error: validationErrors };
    }

    try {
        const response = await axiosInstance.post('/authentication/recover-user-password', { email });
        return { success: true, data: response.data };
    } catch (error: any) {
        console.error("Password recovery failed:", error.response.data.message);
        return { success: false, error: error.response.data.message || 'An error occurred while recovering the password.' };
    }
};
