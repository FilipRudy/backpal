import {RegisterCard} from "../../components/register-card/RegisterCard";
import "../register-page/register-page.css"
import {useResponsiveFactor} from "../../hooks/useResponsiveFactor";
import {Parallax, ParallaxLayer} from "@react-spring/parallax";
import {Header} from "../../components/header/Header";
import backgroundImage1 from "../homepage/pattern.svg";
import {Footer} from "../../components/footer/Footer";
import React from "react";


export const RegisterPage = () => {
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

                    <ParallaxLayer offset={0.1 + (footerOffsetValue / 100)} speed={0.5} style={{zIndex: '950'}}>


                        <div>
                            <div className="section-break"></div>
                            <h1 className="clash-font sicilian-orange centered-text">
                                Join us and see for yourself, completely for free
                            </h1>
                            <div className="section-break"></div>

                            <RegisterCard/>
                            <div className="section-break"></div>

                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer offset={(1.05) + footerOffsetValue} speed={0}>
                        <div className="centered-content">
                            <Footer/>
                        </div>
                    </ParallaxLayer>
                </Parallax>
            </div>
        </div>
    )
}
