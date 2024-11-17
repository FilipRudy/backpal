interface resendActivationEmailInput {
    email: string;
}

export const validateResendActivationEmailInput = (input: resendActivationEmailInput): string | null => {
    const { email } = input;

    if (!email) {
        return 'Email is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address.';
    }

    return null;
};
