import { useState } from 'react';
import axios from 'axios';
import {getUserId} from "../api/auth/getUserId";

interface UseRunUserCodeTestsReturn {
    runUserCode: (userCode: string) => void;
    isLoading: boolean;
    result: string;
    error: string | null;
}

export const useRunUserCodeTests = (url?: string, stepId?: string): UseRunUserCodeTestsReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const userId = getUserId();

    const runUserCode = async (userCode: string) => {
        setIsLoading(true);
        setError(null);
        setResult('');

        try {
            const response = await axios.post(url!, {
                userCode: userCode,
            });
            if(response.data.success === true)
            {
                await axios.post(`http://localhost:3000/user-progress/${stepId}/${userId}`);
            }
            setResult(response.data);
        } catch (err) {
            setError('Failed to run the code.');
        } finally {
            setIsLoading(false);
        }
    };

    return { runUserCode, isLoading, result, error };
};
