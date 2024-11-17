import React from "react";
import "./info-card.css";

interface InfoCardProps {
    number: number;
    content: string;
}

export const InfoCard = (props: InfoCardProps) => {
    return (
        <div className="card-container">
            <div className="card-content">
                {props.content}
            </div>
            <div className="card-number-circle">
                <span className="card-number">{props.number}</span>
            </div>
        </div>
    );
}
