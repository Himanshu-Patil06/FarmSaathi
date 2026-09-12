const getCurrentStage = (crop, plantingDate) => {
    const today = new Date();

    const days = Math.floor(
        (today - new Date(plantingDate)) / (1000 * 60 * 60 * 24)
    );

    const stage = crop.stages.find(
        stage => days >= stage.startDay && days <= stage.endDay
    );

    return stage ? stage.name : null;
};

module.exports = { getCurrentStage }