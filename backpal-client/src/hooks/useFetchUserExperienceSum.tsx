import { useEffect, useState } from 'react';
import axios from 'axios';

export const useFetchUserExperienceSum = (userId: string) => {
    const [experienceSum, setExperienceSum] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchExperienceSum = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/user-progress/exp/${userId}`);
                setExperienceSum(response.data);
            } catch (err) {
                setError('Failed to fetch experience sum');
            }
        };

        if (userId) {
            fetchExperienceSum();
        }
    }, [userId]);

    return { experienceSum, error };
};
