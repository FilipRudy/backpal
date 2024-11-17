import React from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Header } from '../../components/header/Header';
import backgroundImage1 from '../homepage/pattern.svg';
import polsl from '../project-description/polsl.png';
import { Footer } from '../../components/footer/Footer';
import './project-description.css';
import {useResponsiveFactor} from "../../hooks/useResponsiveFactor";

export const ProjectDescription = () => {
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
                                Why am I doing this?
                            </h1>

                            <div className="layout-container">
                                <div className="text-container">
                                    <h2 className="clash-font sicilian-orange">Project Goals</h2>
                                    <p className="jetbrains-mono light-green">
                                        This project was created as part of my engineering thesis at Silesian University of Technology
                                    </p>
                                    <p className="jetbrains-mono light-green">
                                        I believe that currently realized online backend courses guide the user too much, not leaving any space for personal growth, and that they don't focus on practical aspects enough
                                    </p>
                                    <p className="jetbrains-mono light-green">
                                        With this project I am trying to change that just a little bit, by offering completely free backend courses leading to complete projects from scratch
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
