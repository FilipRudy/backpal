import {Step} from "./step";
import {StepStatus} from "./stepStatus";


export interface UserProgressStep extends Step {
    status: StepStatus
}