import {useResponsiveFactor} from "../../hooks/useResponsiveFactor";
import {Parallax, ParallaxLayer} from "@react-spring/parallax";
import {Header} from "../../components/header/Header";
import backgroundImage1 from "../homepage/pattern.svg";
import polsl from "../about-me/about-me-section.png";
import {Footer} from "../../components/footer/Footer";
import React from "react";

export const AboutMe = () => {
    const [pagesValue, offsetValue, footerOffsetValue, parallaxKey] = useResponsiveFactor({
        widthBreakpoint: 885,
        heightBreakpoint: 600,
        increaseRate: 1.0,
        widthBasedPageOffset: 0.6,
        widthBasedOffset: 0.6,
        widthBasedFooterOffset: 0.4,
        heightBasedPageOffset: 0.9,
        heightBasedOffset: 0.8,
        heightBasedFooterOffset: 0.8
    });
    return (
        <div className="homepage-container">
            <div className="main-content">
                <Parallax className="parallax-container" pages={1.1 + pagesValue} key={parallaxKey}>
                    <ParallaxLayer offset={0} speed={0.5} style={{ zIndex: '-900' }}>
                        <div className="centered-content">
                            <Header />
                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer
                        offset={0}
                        speed={0}
                        factor={1+offsetValue}
                        style={{ backgroundImage: `url(${backgroundImage1})`, backgroundSize: 'cover', zIndex: '-1000' }}
                        className="background-container"
                    />

                    <ParallaxLayer offset={0.2} speed={0.5} style={{ zIndex: '-950' }}>
                        <div className="centered-content">
                            <h1 className="clash-font light-green centered-text">
                                Who am I ?
                            </h1>

                            <div className="layout-container">
                                <div className="text-container">
                                    <h2 className="clash-font sicilian-orange">Hello there!</h2>
                                    <p className="jetbrains-mono light-green">
                                        I am currently a student enrolled at Silesian University of Technology, on computer science course
                                    </p>
                                    <p className="jetbrains-mono light-green">
                                        My main passion is backend development, but I also like to have fun with frontend aspect of things
                                    </p>
                                    <p className="jetbrains-mono light-green">
                                        If you have an idea for an app or a job offer, do not hesitate to contact me on my email: filip.rudy5@gmail.com
                                    </p>
                                    <p className="jetbrains-mono light-green">
                                        Or look me up on my github page: https://github.com/FilipRudy !
                                    </p>
                                </div>
                                <div className="image-container">
                                    <img src={polsl} alt="POLSL" className="image" />
                                </div>
                            </div>
                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer offset={0.95 + footerOffsetValue} speed={0.5}>
                        <div className="centered-content">
                            <Footer />
                        </div>
                    </ParallaxLayer>
                </Parallax>
            </div>
        </div>
    );
};
