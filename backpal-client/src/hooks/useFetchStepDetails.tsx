import { useEffect, useState } from 'react';
import axios from 'axios';

export interface Step {
    id: number;
    journeyId: number;
    previousStepId?: number;
    nextStepId?: number;
    name: string;
    description: string;
    isFreeTierEligible: boolean;
    experienceAmount: number;
    taskContent: string;
    initialCode: string;
    theoreticalIntro: string;
    lambdaUrl: string;
    repositoryLink: string;
}

const useFetchStepDetails = (stepId: number) => {
    const [step, setStep] = useState<Step | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStep = async () => {
            try {
                const response = await axios.get<Step>(`http://localhost:3000/steps/${stepId}`);
                setStep(response.data);
            } catch (err) {
                setError('Error fetching step details');
            } finally {
                setLoading(false);
            }
        };

        fetchStep();
    }, [stepId]);

    return { step, loading, error };
};

export default useFetchStepDetails;
