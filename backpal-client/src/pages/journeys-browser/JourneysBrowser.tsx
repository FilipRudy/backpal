import React, { useState } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import "../journeys-browser/journeys-browser.css";
import { useResponsiveFactor } from "../../hooks/useResponsiveFactor";
import backgroundImage1 from "../homepage/pattern.svg";
import beginner from "./beginner.svg";
import intermediate from "./intermediate.svg";
import advanced from "./advanced.svg";
import { ButtonDark } from "../../components/button-dark/ButtonDark";
import { isAuthenticated } from "../../api/auth/isAuthenticated";
import { getUserId } from "../../api/auth/getUserId";
import { useFetchJourneys } from "../../hooks/useFetchJourneys";

export const JourneysBrowser = () => {
    const isUserAuthenticated = isAuthenticated();
    const userId = getUserId();
    const { journeys, error, loading } = useFetchJourneys();
    const [selectedJourneyWithSteps, setSelectedJourneyWithSteps] = useState(journeys[0]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [pagesValue, offsetValue, footerOffsetValue, parallaxKey] = useResponsiveFactor({
        widthBreakpoint: 750,
        heightBreakpoint: 600,
        increaseRate: 1.0,
        widthBasedPageOffset: 0.2,
        widthBasedOffset: 1.6,
        widthBasedFooterOffset: 0.15,
        heightBasedPageOffset: 0.8,
        heightBasedOffset: 2.5,
        heightBasedFooterOffset: 0.6,
    });
console.log(selectedJourneyWithSteps?.journey.difficultyLevel)
    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="homepage-container">
            <div className="main-content">

                    <Parallax className="parallax-container" pages={1.25 + pagesValue} key={parallaxKey}>
                        <ParallaxLayer offset={0} speed={0.5} style={{ zIndex: "-900" }}>
                            <div className="centered-content">
                                <Header />
                            </div>
                        </ParallaxLayer>

                        <ParallaxLayer
                            offset={0}
                            speed={0}
                            factor={1.1 + offsetValue}
                            style={{ backgroundImage: `url(${backgroundImage1})`, backgroundSize: "cover", zIndex: "-1000" }}
                            className="background-container"
                        />

                        <ParallaxLayer offset={0.1 + footerOffsetValue / 100} speed={0.5} style={{ zIndex: "950" }}>
                            <div className="centered-content">
                                <div className="section-break"></div>
                                <h1 className="clash-font sicilian-orange centered-text"> Explore our journeys below, and pick the perfect one for yourself </h1>
                                <div className="section-break"></div>

                                <div className={`journey-browser-container ${isExpanded ? "expanded" : ""}`}>
                                    <div className="journey-sidebar">
                                        <div className="mobile-journey-header" onClick={handleToggleExpand}>
                                            <span>{selectedJourneyWithSteps?.journey.name || "Select a journey"}</span>
                                            <span className="expand-arrow">{isExpanded ? "▲" : "▼"}</span>
                                        </div>
                                        <ul className={`journey-list ${isExpanded ? "show" : "hide"}`}>
                                            {journeys.map((journeyWithSteps) => (
                                                <li
                                                    key={journeyWithSteps.journey.id}
                                                    className={`journey-item ${journeyWithSteps.journey.id === selectedJourneyWithSteps?.journey.id ? "active" : ""}`}
                                                    onClick={() => {
                                                        setSelectedJourneyWithSteps(journeyWithSteps);
                                                        setIsExpanded(false);
                                                    }}
                                                >
                                                    {journeyWithSteps.journey.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="journey-details jetbrains-mono">
                                        {selectedJourneyWithSteps ? (
                                            <>
                                                <img
                                                    src={
                                                        selectedJourneyWithSteps.journey.difficultyLevel === 0
                                                            ? beginner
                                                            : selectedJourneyWithSteps.journey.difficultyLevel === 1
                                                                ? intermediate
                                                                : advanced
                                                    }
                                                    alt={selectedJourneyWithSteps.journey.name}
                                                    className="journey-image"
                                                />
                                                <h2>{selectedJourneyWithSteps.journey.name}</h2>
                                                <p>{selectedJourneyWithSteps.journey.description}</p>

                                                <h2>Steps Available in This Journey:</h2>
                                                {selectedJourneyWithSteps.steps && selectedJourneyWithSteps.steps.length > 0 ? (
                                                    <ol>
                                                        {selectedJourneyWithSteps.steps.map((step, index) => (
                                                            <li key={index}>
                                                                <strong>{step.name}</strong>: {step.description}
                                                            </li>
                                                        ))}
                                                    </ol>
                                                ) : (
                                                    <p>No steps available for this journey.</p>
                                                )}

                                                <div className="journey-button">
                                                    {isUserAuthenticated ? (
                                                        <ButtonDark
                                                            message={"Click here to pick this journey in your profile!"}
                                                            path={`/profile/${userId}`}/>
                                                    ) : (
                                                        <ButtonDark message={"Log in now to pick this journey!"}
                                                                    path={"/login"}/>
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="pick-a-journey-section jetbrains-mono">
                                                <h2>Select a journey on the sidebar to view its details.</h2>
                                            </div>
                                        )}

                                    </div>

                                </div>

                                <div className="section-break"></div>
                            </div>
                        </ParallaxLayer>

                        <ParallaxLayer offset={1.05 + footerOffsetValue} speed={0}>
                            <div className="centered-content">
                                <Footer/>
                            </div>
                        </ParallaxLayer>
                    </Parallax>

            </div>
        </div>
    );
};
