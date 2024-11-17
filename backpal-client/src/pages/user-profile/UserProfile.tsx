import React, {useEffect, useState} from 'react';
import "../user-profile/user-profile.css";
import {Parallax, ParallaxLayer} from "@react-spring/parallax";
import {Header} from "../../components/header/Header";
import backgroundImage1 from "../homepage/pattern.svg";
import {Footer} from "../../components/footer/Footer";
import {useResponsiveFactor} from "../../hooks/useResponsiveFactor";
import {getUserId} from "../../api/auth/getUserId";
import {useNavigate, useParams} from "react-router-dom";
import {isAuthenticated} from "../../api/auth/isAuthenticated";
import {useFetchUserJourneys} from "../../hooks/useFetchUserJourneys";
import beginner from "../journeys-browser/beginner.svg";
import intermediate from "../journeys-browser/intermediate.svg";
import advanced from "../journeys-browser/advanced.svg";
import {UserProgressStep} from "../../models/userProgressStep";
import {StepStatus} from "../../models/stepStatus";
import {ButtonDark} from "../../components/button-dark/ButtonDark";
import {useFetchJourneys} from "../../hooks/useFetchJourneys";
import {useFetchUserExperienceSum} from "../../hooks/useFetchUserExperienceSum";
import {
    calculateCurrentLevelAndNextLevelExperience
} from "../../api/calculateCurrentLevelAndNextLevelExperience";
import {useAddUserProgress} from "../../hooks/useAddUserProgress";
import {AdminPanel} from "../../components/admin-panel/AdminPanel";
import {getUserRole} from "../../api/auth/getUserRole";

export const UserProfile = () => {
    const [pagesValue, offsetValue, footerOffsetValue, parallaxKey] = useResponsiveFactor({
        widthBreakpoint: 750,
        heightBreakpoint: 600,
        increaseRate: 1.0,
        widthBasedPageOffset: 0.4,
        widthBasedOffset: 1.6,
        widthBasedFooterOffset: 0.45,
        heightBasedPageOffset: 0.8,
        heightBasedOffset: 2.5,
        heightBasedFooterOffset: 0.6
    });
    const isUserAuthenticated = isAuthenticated();
    const userId = getUserId();
    const { userId: urlUserId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserAuthenticated) {
            navigate('/login');
        }
    }, [isUserAuthenticated, navigate]);

    const userExperienceSum = useFetchUserExperienceSum(userId!);
    const [currentLevel, expNeeded] = calculateCurrentLevelAndNextLevelExperience(userExperienceSum.experienceSum!);
    const nextLevel = currentLevel + 1;
    const currentExp = userExperienceSum.experienceSum;

    const currentJourneys = useFetchUserJourneys(userId).journeys
    const allAvailableJourneys = useFetchJourneys().journeys
    const journeysToStart = allAvailableJourneys.filter(
        (journey) => !currentJourneys.some((current) => current.journey.id === journey.journey.id)
    );

    const [expandedSection, setExpandedSection] = useState<{ started: boolean; toStart: boolean }>({ started: true, toStart: true });
    const [selectedJourney, setSelectedJourney] = useState<any>(null);

    const toggleSection = (section: 'started' | 'toStart') => {
        setExpandedSection({ ...expandedSection, [section]: !expandedSection[section] });
    };

    const handleJourneyClick = (journey: any) => {
        setSelectedJourney(journey);
    };
    const { addUserProgress } = useAddUserProgress();
    const handleAddJourney = async () => {
        if (selectedJourney) {
            const journeyId = selectedJourney.journey.id;
            const stepId = Math.min(...selectedJourney.steps.map((step: UserProgressStep) => step.id));
            const userAccountId = userId!;

            try {
                await addUserProgress(journeyId, userAccountId, stepId);
                window.location.reload();
            } catch (error) {
                console.error("Error adding journey:", error);
            }
        }
    };

    const role = getUserRole();

    const progressPercentage = (currentExp! / expNeeded) * 100;

    return (
        <div className="homepage-container">
            <div className="main-content">
                <Parallax className="parallax-container" pages={1.25 + pagesValue} key={parallaxKey}>
                    <ParallaxLayer offset={0} speed={0.5} style={{ zIndex: 10, pointerEvents: 'inherit', height: '60px'
                    }}>
                        <div className="centered-content">
                            <Header />
                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer
                        offset={0}
                        speed={0}
                        factor={1.1 + offsetValue}
                        style={{ backgroundImage: `url(${backgroundImage1})`, backgroundSize: 'cover' }}
                        className="background-container"
                    />
                    <ParallaxLayer offset={0.1 + footerOffsetValue / 100} speed={0.5} style={{ zIndex: 5 }}>
                        <div className="section-break"></div>

                        {(isUserAuthenticated && (userId === urlUserId)) ? (
                            role === 'admin' ? (
                                <AdminPanel />
                            ) : (
                                <div className="centered-content">
                                    <div className="level-section jetbrains-mono">
                                        <div className="level-info">
                                            <h2>Level {currentLevel}</h2>
                                        </div>

                                        <div className="progress-bar-container">
                                            <span className="current-level">Level {currentLevel}</span>
                                            <div className="progress-bar">
                                                <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
                                            </div>
                                            <span className="next-level">Level {nextLevel}</span>
                                        </div>

                                        <div className="exp-info">
                                            <span>{currentExp} EXP / {expNeeded} EXP</span>
                                        </div>
                                    </div>

                                    <div className="user-journey-browser-container jetbrains-mono">
                                        <h3 className="user-journeys-title">Your Current Journeys</h3>
                                        <div className="user-journey-content">
                                            <div className="user-journey-sidebar">
                                                <div className="journey-section">
                                                    <div className="section-header" onClick={() => toggleSection('toStart')}>
                                                        <h4 className={`section-title ${expandedSection.toStart ? 'expanded' : ''}`}>Journeys To Start</h4>
                                                    </div>
                                                    {expandedSection.toStart ? (
                                                        journeysToStart.length > 0 ? (
                                                            <ul className="journey-list scrollable">
                                                                {journeysToStart.map((journey) => (
                                                                    <li key={journey.journey.id} className="journey-item" onClick={() => handleJourneyClick(journey)}>
                                                                        {journey.journey.name}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p className="journey-non-clickable">No journeys available to start.</p>
                                                        )
                                                    ) : null}
                                                </div>

                                                <div className="journey-section">
                                                    <div className="section-header" onClick={() => toggleSection('started')}>
                                                        <h4 className={`section-title ${expandedSection.started ? 'expanded' : ''}`}>Current Journeys</h4>
                                                    </div>
                                                    {expandedSection.started ? (
                                                        currentJourneys.length > 0 ? (
                                                            <ul className="journey-list scrollable">
                                                                {currentJourneys.map((journey) => (
                                                                    <li key={journey.journey.id} className="journey-item" onClick={() => handleJourneyClick(journey)}>
                                                                        {journey.journey.name}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p className="journey-non-clickable">No current journeys available</p>
                                                        )
                                                    ) : null}
                                                </div>
                                            </div>

                                            <div className="user-journey-details">
                                                {selectedJourney &&
                                                selectedJourney.steps.filter((step: UserProgressStep) => step.status == null).length === 0 ? (
                                                    <div className="journey-details-profile">
                                                        <img
                                                            src={
                                                                selectedJourney.journey.difficultyLevel === 0
                                                                    ? beginner
                                                                    : selectedJourney.journey.difficultyLevel === 1
                                                                        ? intermediate
                                                                        : advanced
                                                            }
                                                            alt={selectedJourney.journey.name}
                                                            className="journey-image"
                                                        />
                                                        <h2>{selectedJourney.journey.name}</h2>
                                                        <p>{selectedJourney.journey.description}</p>

                                                        <h2>Steps Available in This Journey:</h2>
                                                        {selectedJourney.steps && selectedJourney.steps.length > 0 ? (
                                                            <ol>
                                                                {selectedJourney.steps
                                                                    .slice()
                                                                    .sort((a: UserProgressStep, b: UserProgressStep) => a.id - b.id)
                                                                    .map((step: UserProgressStep) => (
                                                                        <li key={step.id}>
                                                                            <div
                                                                                className="journey-step"
                                                                                onClick={() => window.location.href = `/code-editor/${step.id}`}
                                                                                style={{
                                                                                    cursor: 'pointer',
                                                                                    padding: '8px',
                                                                                    display: 'flex',
                                                                                    alignItems: 'center'
                                                                                }}
                                                                            >
                                                            <span
                                                                style={{flexGrow: 1}}>{step.name}:</span>
                                                                                <span
                                                                                    style={{paddingLeft: '8px'}}>{step.description}</span>
                                                                                {step.status === StepStatus.started ? (
                                                                                    <span
                                                                                        style={{paddingLeft: '8px'}}>🔜</span>
                                                                                ) : step.status === StepStatus.completed ? (
                                                                                    <span
                                                                                        style={{paddingLeft: '8px'}}>✅</span>
                                                                                ) : (
                                                                                    <span
                                                                                        style={{paddingLeft: '8px'}}>⬜</span>
                                                                                )}
                                                                            </div>
                                                                        </li>
                                                                    ))}
                                                            </ol>
                                                        ) : (
                                                            <p>No steps available for this journey.</p>
                                                        )}
                                                    </div>
                                                ) : selectedJourney ? (
                                                    <div className="journey-details-profile">
                                                        <img
                                                            src={
                                                                selectedJourney.journey.difficultyLevel === 0
                                                                    ? beginner
                                                                    : selectedJourney.journey.difficultyLevel === 1
                                                                        ? intermediate
                                                                        : advanced
                                                            }
                                                            alt={selectedJourney.journey.name}
                                                            className="journey-image"
                                                        />
                                                        <h2>{selectedJourney.journey.name}</h2>
                                                        <p>{selectedJourney.journey.description}</p>

                                                        <h2>Steps Available in This Journey:</h2>
                                                        {selectedJourney.steps && selectedJourney.steps.length > 0 ? (
                                                            <ol>
                                                                {selectedJourney.steps
                                                                    .slice()
                                                                    .sort((a: UserProgressStep, b: UserProgressStep) => a.id - b.id)
                                                                    .map((step: UserProgressStep, index: number) => (
                                                                        <li key={index}>
                                                                            <strong>{step.name}</strong>:
                                                                            <span style={{ paddingLeft: '8px' }}>{step.description}</span>
                                                                        </li>
                                                                    ))}
                                                            </ol>
                                                        ) : (
                                                            <p>No steps available for this journey.</p>
                                                        )}
                                                        <div className="journey-button">
                                                            {isUserAuthenticated ? (
                                                                <button className="button-dark jetbrains-mono" onClick={handleAddJourney}>Add Journey</button>
                                                            ) : (
                                                                <ButtonDark message={"Log in now to pick this journey!"}
                                                                            path={"/login"}/>
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="no-journey-selected">Select a journey to see the details</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        ) : (
                            <div></div>
                        )}
                    </ParallaxLayer>


                    <ParallaxLayer offset={1.05 + footerOffsetValue} speed={0}>
                        <div className="centered-content">
                            <Footer />
                        </div>
                    </ParallaxLayer>
                </Parallax>
            </div>
        </div>
    );
};
