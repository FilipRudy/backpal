import { useState } from 'react';
import axios, {AxiosError} from 'axios';

export const useAddUserProgress = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const addUserProgress = async (
        journeyId: number,
        userAccountId: string,
        stepId: number
    ) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await axios.post('http://localhost:3000/user-progress', {
                journeyId,
                userAccountId,
                stepId,
            });
            setSuccess(true);
        } catch (err) {
            setError('An error occurred while adding progress');
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, success, addUserProgress };
};
