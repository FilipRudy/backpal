import React from 'react';
import './App.css'
import {Homepage} from "./pages/homepage/Homepage";
import {RegisterPage} from "./pages/register-page/RegisterPage";
import {LoginPage} from "./pages/login-page/LoginPage";
import {Navigate, Route, Routes} from "react-router-dom";
import {ProjectDescription} from "./pages/project-description/ProjectDescription";
import {AboutMe} from "./pages/about-me/AboutMe";
import {OurApproach} from "./pages/our-approach/OurApproach";
import {ConfirmEmail} from "./pages/confirm-email/ConfirmEmail";
import {JourneysBrowser} from "./pages/journeys-browser/JourneysBrowser";
import {UserProfile} from "./pages/user-profile/UserProfile";
import {CodeEditor} from "./pages/code-editor/CodeEditor";

export const App = () => {

    return (
        <div className='background-color'>
        <div className='background'>

            <Routes>
                <Route path="/login" element={<LoginPage/>}  />
                <Route path="/register" element={<RegisterPage/>}  />
                <Route path="/project-description" element={<ProjectDescription/>}  />
                <Route path="/about-me" element={<AboutMe/>}  />
                <Route path="/our-approach" element={<OurApproach/>}  />
                <Route path="/confirm" element={<ConfirmEmail/>}  />
                <Route path="/journeys" element={<JourneysBrowser/>}  />
                <Route path="/profile/:userId" element={<UserProfile />} />
                <Route path="/code-editor/:stepId" element={<CodeEditor />} />
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route path="/" element={<Homepage/>}  />
            </Routes>

        </div>
            </div>
    );
};
