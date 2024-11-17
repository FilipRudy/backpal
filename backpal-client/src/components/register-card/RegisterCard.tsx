import React, { useState } from "react";
import "./register-card.css";
import { register } from "../../api/auth/register";
import { resendActivationEmail } from "../../api/auth/resendActivationEmail";

export const RegisterCard = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<Partial<typeof formData>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isResendMode, setIsResendMode] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setErrors({});

        if (isResendMode) {
            const result = await resendActivationEmail(formData.email);
            setIsLoading(false);

            if (result.success) {
                setIsSuccess(true);
            } else {
                setErrors({ email: result.error || "Failed to resend activation email." });
            }
        } else {
            const result = await register(formData);
            setIsLoading(false);

            if (result.success) {
                setIsSuccess(true);
            } else {
                setErrors(result.errors || {});
            }
        }
    };

    if (isSuccess) {
        return (
            <div className="register-container">
                <div className="register-success-message">
                    <h2>{isResendMode ? 'Activation email sent!' : 'Registration successful!'}</h2>
                    {isResendMode && <p>Please check your email to verify your account.</p>}
                </div>
            </div>
        );
    }

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                {!isResendMode ? (
                    <>
                        <label className="register-label" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="register-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <span className="register-error">{errors.email}</span>}

                        <label className="register-label" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="register-input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && <span className="register-error">{errors.password}</span>}

                        <label className="register-label" htmlFor="confirmPassword">Repeat password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="register-input"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        {errors.confirmPassword && <span className="register-error">{errors.confirmPassword}</span>}

                        <a href="#" className="register-recover" onClick={() => setIsResendMode(true)}>
                            Resend activation email
                        </a>
                    </>
                ) : (
                    <>
                        <label className="register-label" htmlFor="resend-email">Email</label>
                        <input
                            type="email"
                            id="resend-email"
                            name="email"
                            className="register-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <span className="register-error">{errors.email}</span>}

                        <a href="#" className="register-recover" onClick={() => setIsResendMode(false)}>
                            Back to register
                        </a>
                    </>
                )}

                <button type="submit" className="register-button jetbrains-mono" disabled={isLoading}>
                    {isLoading ? (isResendMode ? "Sending..." : "Registering...") : (isResendMode ? "Resend Activation Email" : "Register")}
                </button>
            </form>
        </div>
    );
};
