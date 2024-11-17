import {validateRegisterInput} from "../../validation/validateRegisterInput";

interface RegisterInput {
    email: string;
    password: string;
    confirmPassword: string;
}

interface RegisterResponse {
    success: boolean;
    errors?: Partial<RegisterInput>;
    message?: string;
}

export const register = async (input: RegisterInput): Promise<RegisterResponse> => {
    const validationErrors = validateRegisterInput(input);

    if (Object.keys(validationErrors).length > 0) {
        return { success: false, errors: validationErrors };
    }

    try {
        const response = await fetch("http://localhost:3000/authentication/sign-up", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: input.email,
                password: input.password,
                repeatPassword: input.confirmPassword,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();

            if (errorData.message.includes("Conflict")) {
                return { success: false, errors: { email: "Email is currently in use. Please use a different email." } };
            }

            return { success: false, errors: { email: errorData.message || "Registration failed, please try again later." } };
        }

        return { success: true };
    } catch (error) {
        console.error("Registration failed:", error);
        return { success: false, errors: { email: "Registration failed, please try again later." } };
    }
};
