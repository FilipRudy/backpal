import {Journey} from "./journey";
import {Step} from "./step";

export interface JourneyWithSteps {
    journey: Journey
    steps: Step[]
}