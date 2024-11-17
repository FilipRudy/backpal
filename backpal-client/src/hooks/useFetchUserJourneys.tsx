import {useEffect, useState} from "react";
import { useOnce } from "./useOnce";
import axios from "axios";
import { Journey } from "../models/journey";
import {JourneyWithSteps} from "../models/journeyWithSteps";
import {UserJourneyWithSteps} from "../models/userJourneyWithSteps";

export const useFetchUserJourneys = (userId: string | null) => {
    const [journeys, setJourneys] = useState<UserJourneyWithSteps[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useOnce(() => {
        const fetchJourneys = async () => {
            setLoading(true);
            try {
                const response = await axios.get<any>(`http://localhost:3000/journeys/user/${userId}`);
                setJourneys(response.data);
            } catch (err) {
                setError('An error occurred while fetching journeys.');
            } finally {
                setLoading(false);
            }
        };

        fetchJourneys();
    });


    return {journeys} ;
};
