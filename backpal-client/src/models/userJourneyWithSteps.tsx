import {Journey} from "./journey";
import {Step} from "./step";
import {UserProgressStep} from "./userProgressStep";

export interface UserJourneyWithSteps {
    journey: Journey
    steps: UserProgressStep[]
}