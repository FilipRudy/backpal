import "../confirm-email/confirm-email.css"
import {useResponsiveFactor} from "../../hooks/useResponsiveFactor";
import {Parallax, ParallaxLayer} from "@react-spring/parallax";
import {Header} from "../../components/header/Header";
import backgroundImage1 from "../homepage/pattern.svg";
import {Footer} from "../../components/footer/Footer";
import React from "react";
import {useLocation} from "react-router-dom";
import {useVerifyUser} from "../../hooks/useVerifyUser";

export const ConfirmEmail = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");
    const { verificationResult, loading, error } = useVerifyUser(code || '');

    const [pagesValue, offsetValue, footerOffsetValue, parallaxKey] = useResponsiveFactor({
        widthBreakpoint: 750,
        heightBreakpoint: 600,
        increaseRate: 1.0,
        widthBasedPageOffset: 0.2,
        widthBasedOffset: 1.6,
        widthBasedFooterOffset: 0.15,
        heightBasedPageOffset: 0.8,
        heightBasedOffset: 2.5,
        heightBasedFooterOffset: 0.6
    });
    return (
        <div className="homepage-container">
            <div className="main-content">
                <Parallax className="parallax-container" pages={1.25 + pagesValue} key={parallaxKey}>
                    <ParallaxLayer offset={0} speed={0.5} style={{zIndex: '-900'}}>
                        <div className="centered-content">
                            <Header/>
                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer
                        offset={0}
                        speed={0}
                        factor={1.1 + offsetValue}
                        style={{backgroundImage: `url(${backgroundImage1})`, backgroundSize: 'cover', zIndex: '-1000'}}
                        className="background-container"
                    />

                    <ParallaxLayer offset={0.2 + (footerOffsetValue / 100)} speed={0.5} style={{zIndex: '950'}}>

                        <div className="login-page">

                            <div className="section-break"></div>
                            {loading ? (
                                <h1 className="clash-font sicilian-orange centered-text">Verifying...</h1>
                            ) : error ? (
                                <h1 className="clash-font sicilian-orange centered-text">{error}</h1>
                            ) : (
                                <h1 className="clash-font sicilian-orange centered-text">{verificationResult}</h1>
                            )}


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
    )
}