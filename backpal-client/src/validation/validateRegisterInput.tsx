interface RegisterInput {
    email: string;
    password: string;
    confirmPassword: string;
}

export const validateRegisterInput = ({ email, password, confirmPassword }: RegisterInput) => {
    const errors: Partial<RegisterInput> = {};

    if (!email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Email is invalid";
    }

    if (!password) {
        errors.password = "Password is required";
    } else if (password.length < 10) {
        errors.password = "Password must be at least 10 characters";
    }

    if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
};
