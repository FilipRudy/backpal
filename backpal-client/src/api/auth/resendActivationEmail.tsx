import { axiosInstance } from "../axios";
import {validateResendActivationEmailInput} from "../../validation/validateResendActivationEmailInput";


interface ResendActivationEmailResponse {
    success: boolean;
    error?: string;
    data?: any;
}

export const resendActivationEmail = async (email: string): Promise<ResendActivationEmailResponse> => {
    const validationErrors = validateResendActivationEmailInput({ email });

    if (validationErrors) {
        return { success: false, error: validationErrors };
    }

    try {
        const response = await axiosInstance.post('/authentication/resend-activation-email', { email });
        return { success: true, data: response.data };
    } catch (error: any) {
        console.error("Resend activation email failed:", error.response?.data?.message || error.message);
        return { success: false, error: error.response?.data?.message || 'An error occurred while resending the activation email.' };
    }
};
