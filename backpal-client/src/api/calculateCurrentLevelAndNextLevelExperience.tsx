export const calculateCurrentLevelAndNextLevelExperience = (experienceSum: number): [number, number] => {
    let level = 1;
    let expForNextLevel = 100;
    let expIncrement = 1.25;
    let totalExpForPreviousLevels = 0;

    while (experienceSum >= expForNextLevel) {
        totalExpForPreviousLevels += expForNextLevel;
        experienceSum -= expForNextLevel;
        level++;
        expForNextLevel = Math.ceil(expForNextLevel * expIncrement);
    }

    return [level, totalExpForPreviousLevels + expForNextLevel];
};
