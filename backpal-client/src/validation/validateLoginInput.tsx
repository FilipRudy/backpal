interface LoginInput {
    email: string;
    password: string;
}

export const validateLoginInput = (input: LoginInput) => {
    const errors: Partial<LoginInput> = {};

    if (!input.email) {
        errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
        errors.email = "Email format is invalid.";
    }

    if (!input.password) {
        errors.password = "Password is required";
    } else if (input.password.length < 10) {
        errors.password = "Password must be at least 10 characters";
    }

    return errors;
};
