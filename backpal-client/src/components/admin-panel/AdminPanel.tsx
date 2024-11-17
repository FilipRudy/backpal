import React, { useState } from "react";
import "./admin-panel.css";
import axios from "axios";
import { useFetchJourneys } from "../../hooks/useFetchJourneys";
import { JourneyWithSteps } from "../../models/journeyWithSteps";

export const AdminPanel: React.FC = () => {
    const { journeys, error, loading } = useFetchJourneys();
    const [journeyData, setJourneyData] = useState({
        name: "",
        difficultyLevel: 1,
        description: "",
    });
    const [stepData, setStepData] = useState({
        name: "",
        description: "",
        taskContent: "",
        journeyId: 0,
        experienceAmount: 100,
        theoreticalIntro: "",
        lambdaUrl: "",
        initialCode: "",
        repositoryLink: "",
    });
    const [journeyErrors, setJourneyErrors] = useState({});
    const [stepErrors, setStepErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Handle Journey Form Change
    const handleJourneyChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setJourneyData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle Step Form Change
    const handleStepChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name === "journeyId") {
            setStepData((prev) => ({ ...prev, journeyId: Number(value) }));
        } else {
            setStepData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleJourneySubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setJourneyErrors({});

        try {
            const response = await axios.post("http://localhost:3000/journeys", journeyData);
            alert("Journey added successfully!");
            setJourneyData({
                name: "",
                difficultyLevel: 1,
                description: "",
            });
        } catch (error) {
            setJourneyErrors({ general: "Failed to add journey. Please try again." });
        }
        setIsLoading(false);
    };

    const handleStepSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setStepErrors({});

        try {
            const response = await axios.post("http://localhost:3000/steps", stepData);
            alert("Step added successfully!");
            setStepData({
                name: "",
                description: "",
                taskContent: "",
                journeyId: 0,
                experienceAmount: 100,
                theoreticalIntro: "",
                lambdaUrl: "",
                initialCode: "",
                repositoryLink: "",
            });
        } catch (error) {
            setStepErrors({ general: "Failed to add step. Please try again." });
        }
        setIsLoading(false);
    };

    return (
        <div className="admin-panel-container centered-content">
            <div className="admin-panel-left">
                <h2 className="admin-panel-header">Add Journey</h2>
                <form className="admin-panel-form" onSubmit={handleJourneySubmit}>
                    <label className="admin-panel-label" htmlFor="name">Journey Name</label>
                    <input
                        className="admin-panel-input"
                        type="text"
                        id="name"
                        name="name"
                        value={journeyData.name}
                        onChange={handleJourneyChange}
                        required
                    />
                    <label className="admin-panel-label" htmlFor="difficultyLevel">Difficulty Level</label>
                    <input
                        className="admin-panel-input"
                        type="number"
                        id="difficultyLevel"
                        name="difficultyLevel"
                        value={journeyData.difficultyLevel}
                        onChange={handleJourneyChange}
                        required
                        min={1}
                        max={5}
                    />
                    <label className="admin-panel-label" htmlFor="description">Description</label>
                    <textarea
                        className="admin-panel-textarea"
                        id="description"
                        name="description"
                        value={journeyData.description}
                        onChange={handleJourneyChange}
                        required
                    />
                    {journeyErrors && <span className="admin-panel-error-message">{}</span>}
                    <button className="admin-panel-button" type="submit" disabled={isLoading}>
                        {isLoading ? "Adding..." : "Add Journey"}
                    </button>
                </form>
            </div>

            <div className="admin-panel-right">
                <h2 className="admin-panel-header">Add Step</h2>
                <form className="admin-panel-form" onSubmit={handleStepSubmit}>
                    <div className="admin-panel-step-fields">
                        <div className="admin-panel-field-group">
                            <label className="admin-panel-label" htmlFor="name">Step Name</label>
                            <input
                                className="admin-panel-input"
                                type="text"
                                id="name"
                                name="name"
                                value={stepData.name}
                                onChange={handleStepChange}
                                required
                            />
                        </div>
                        <div className="admin-panel-field-group">
                            <label className="admin-panel-label" htmlFor="description">Step Description</label>
                            <textarea
                                className="admin-panel-textarea"
                                id="description"
                                name="description"
                                value={stepData.description}
                                onChange={handleStepChange}
                                required
                            />
                        </div>
                        <div className="admin-panel-field-group">
                            <label className="admin-panel-label" htmlFor="taskContent">Task Content</label>
                            <textarea
                                className="admin-panel-textarea"
                                id="taskContent"
                                name="taskContent"
                                value={stepData.taskContent}
                                onChange={handleStepChange}
                                required
                            />
                        </div>
                        <div className="admin-panel-field-group">
                            <label className="admin-panel-label" htmlFor="journeyId">Journey ID</label>
                            <select
                                className="admin-panel-select"
                                id="journeyId"
                                name="journeyId"
                                value={stepData.journeyId}
                                onChange={handleStepChange}
                                required
                            >
                                <option value={0}>Select Journey</option>
                                {journeys.map((journey: JourneyWithSteps) => (
                                    <option key={journey.journey.id} value={journey.journey.id}>
                                        {journey.journey.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="admin-panel-step-fields">
                        <div className="admin-panel-field-group">
                            <label className="admin-panel-label" htmlFor="experienceAmount">Experience Amount</label>
                            <input
                                className="admin-panel-input"
                                type="number"
                                id="experienceAmount"
                                name="experienceAmount"
                                value={stepData.experienceAmount}
                                onChange={handleStepChange}
                                required
                            />
                        </div>
                        <div className="admin-panel-field-group">
                            <label className="admin-panel-label" htmlFor="theoreticalIntro">Theoretical Intro</label>
                            <textarea
                                className="admin-panel-textarea"
                                id="theoreticalIntro"
                                name="theoreticalIntro"
                                value={stepData.theoreticalIntro}
                                onChange={handleStepChange}
                                required
                            />
                        </div>
                        <div className="admin-panel-field-group">
                            <label className="admin-panel-label" htmlFor="lambdaUrl">Lambda URL</label>
                            <input
                                className="admin-panel-input"
                                type="text"
                                id="lambdaUrl"
                                name="lambdaUrl"
                                value={stepData.lambdaUrl}
                                onChange={handleStepChange}
                                required
                            />
                        </div>
                        <div className="admin-panel-field-group">
                            <label className="admin-panel-label" htmlFor="initialCode">Initial Code</label>
                            <textarea
                                className="admin-panel-textarea"
                                id="initialCode"
                                name="initialCode"
                                value={stepData.initialCode}
                                onChange={handleStepChange}
                                required
                            />
                        </div>
                        <div className="admin-panel-field-group">
                            <label className="admin-panel-label" htmlFor="repositoryLink">Repository Link</label>
                            <input
                                className="admin-panel-input"
                                type="url"
                                id="repositoryLink"
                                name="repositoryLink"
                                value={stepData.repositoryLink}
                                onChange={handleStepChange}
                                required
                            />
                        </div>
                    </div>
                    <button className="admin-panel-button" type="submit" disabled={isLoading}>
                        {isLoading ? "Adding..." : "Add Step"}
                    </button>
                </form>
            </div>
        </div>
    );
};
