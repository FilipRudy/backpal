export interface Step {
    id: number
    name: string
    description: string
    isFreeTierEligible: boolean
    experienceAmount: number
    taskContent: string
    previousStepId: number
}