import React, { useState, useEffect } from 'react';
import './login-card.css';
import { login } from "../../api/auth/login";
import { recoverPassword } from "../../api/auth/recoverPassword";
import { NavLink, useNavigate } from 'react-router-dom';
import {getUserId} from "../../api/auth/getUserId";

export const LoginCard: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<Partial<typeof formData>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [isRecoverMode, setIsRecoverMode] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setErrors({});

        if (isRecoverMode) {
            const result = await recoverPassword(formData.email);
            setIsLoading(false);

            if (result.success) {
                setIsSuccess(true);
            } else {
                setErrors({ email: result.error || 'Failed to send recovery email.' });
            }
        } else {
            const result = await login(formData);
            setIsLoading(false);

            if (result.success) {
                const userId = getUserId();
                setUserId(userId);
                setIsSuccess(true);
            } else {
                setErrors(result.errors || {});
            }
        }
    };

    useEffect(() => {
        if (isSuccess && userId) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

            if (countdown === 0) {
                clearInterval(timer);
                navigate(`/profile/${userId}`);
            }

            return () => clearInterval(timer);
        }
    }, [isSuccess, countdown, userId, navigate]);

    if (isSuccess) {
        return (
            <div className="login-container">
                <div className="login-success-message">
                    <h2>{isRecoverMode ? 'Recovery email sent!' : 'Login successful!'}</h2>
                    <p>
                        Redirecting to your profile in {countdown}... or{' '}
                        <NavLink to={`/profile/${userId}`} className="redirect-link">click here</NavLink>.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                {!isRecoverMode ? (
                    <>
                        <label className="login-label" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="login-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && !errors.email.includes("Invalid") && <span className="login-error">{errors.email}</span>}

                        <label className="login-label" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="login-input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && <span className="login-error">{errors.password}</span>}

                        <a href="#" className="login-recover" onClick={() => setIsRecoverMode(true)}>Recover password</a>
                    </>
                ) : (
                    <>
                        <label className="login-label" htmlFor="recover-email">Email</label>
                        <input
                            type="email"
                            id="recover-email"
                            name="email"
                            className="login-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <span className="login-error">{errors.email}</span>}

                        <a href="#" className="login-recover" onClick={() => setIsRecoverMode(false)}>Back to login</a>
                    </>
                )}

                <button type="submit" className="login-button jetbrains-mono" disabled={isLoading}>
                    {isLoading ? (isRecoverMode ? "Sending..." : "Logging in...") : (isRecoverMode ? "Send Recovery Email" : "Login")}
                </button>

                {errors.email && errors.email.includes("Invalid") && <p className="login-error">{errors.email}</p>}
            </form>
        </div>
    );
};
