import { useState } from 'react';
import axios from 'axios';
import {useOnce} from "./useOnce";

export const useVerifyUser = (code: string) => {
    const [verificationResult, setVerificationResult] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useOnce(() => {
        const verifyUser = async () => {
            try {
                const response = await axios.post(`http://localhost:3000/authentication/verify-user?verificationCode=${code}`);
                if (response.data === 'verify_true') {
                    setVerificationResult('Email verified successfully, you can now login safely!');
                } else {
                    setVerificationResult('Email has already been verified');
                }
            } catch (error) {
                setError('An error occurred while verifying email.');
            } finally {
                setLoading(false);
            }
        };

        if (code) {
            verifyUser();
        }
    });

    return { verificationResult, loading, error };
};
