import "../our-approach/our-approach.css"
import {Parallax, ParallaxLayer} from "@react-spring/parallax";
import {Header} from "../../components/header/Header";
import backgroundImage1 from "../homepage/pattern.svg";
import arrow from "../our-approach/arrow-down-icon.svg";
import {Footer} from "../../components/footer/Footer";
import React from "react";
import {useResponsiveFactor} from "../../hooks/useResponsiveFactor";

export const OurApproach = () => {
    const [pagesValue, offsetValue, footerOffsetValue, parallaxKey] = useResponsiveFactor({
        widthBreakpoint: 750,
        heightBreakpoint: 600,
        increaseRate: 1.0,
        widthBasedPageOffset: 1.0,
        widthBasedOffset: 1.6,
        widthBasedFooterOffset: 1.0,
        heightBasedPageOffset: 2.4,
        heightBasedOffset: 2.5,
        heightBasedFooterOffset: 2.6
    });
    return (
    <div className="homepage-container">
        <div className="main-content">
            <Parallax className="parallax-container" pages={1.58 + pagesValue} key={parallaxKey}>
                <ParallaxLayer offset={0} speed={0.5} style={{zIndex: '-900'}}>
                    <div className="centered-content">
                        <Header/>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer
                    offset={0}
                    speed={0}
                    factor={1.4 + offsetValue}
                    style={{backgroundImage: `url(${backgroundImage1})`, backgroundSize: 'cover', zIndex: '-1000'}}
                    className="background-container"
                />

                <ParallaxLayer offset={0.2 + (footerOffsetValue / 100)} speed={0.5} style={{zIndex: '-950'}}>
                    <div className="centered-content">
                        <h1 className="clash-font light-green centered-text">
                            Our approach in greater detail
                        </h1>
                        <div className="section-break"></div>

                        <div className="jetbrains-mono centered-text sicilian-orange">
                            <h3>We understand that our main target are people who have probably never written a single
                                line of code in their life,
                                and that's completely okay! Our journeys are specifically designed not to overwhelm
                                beginners with too much of.. well everything.
                            </h3>
                        </div>
                        <div className="section-break-small"></div>
                        <img src={arrow} className="our-approach-arrow" alt="arrow"/>

                        <div className="section-break-small"></div>
                        <div className="jetbrains-mono centered-text sicilian-orange">
                            <h3>Each journey consists of several smaller sized lessons called steps. Each of the steps
                                will bring you closer to
                                finishing your journey to a complete backend service! They do not only provide practical
                                experience, but also
                                much needed theoretical knowledge - sometimes engaging you to look for some aspects
                                alone!
                            </h3>
                        </div>
                        <div className="section-break-small"></div>
                        <img src={arrow} className="our-approach-arrow" alt="arrow"/>
                        <div className="section-break-small"></div>

                        <div className="jetbrains-mono centered-text sicilian-orange">
                            <h3>After completing one of our entry-level journeys you actually have a few ways to further
                                hone your skills.
                                One of them, and the best one in our opinion is to try and develop a project of a
                                similar scope, completely by yourself!
                                But if you are not feeling ready yet, the best course of action may be to try another
                                entry-level journey, but in different technology
                                to better grasp the universal concepts.
                            </h3>
                        </div>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer offset={1.15 + footerOffsetValue} speed={0.5}>
                    <div className="centered-content">
                        <Footer/>
                    </div>
                </ParallaxLayer>
            </Parallax>
        </div>
    </div>
)
}