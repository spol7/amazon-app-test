const scrollDown = async function (driver) {

    const { width, height } = await driver.getWindowSize();
    const leftSide = 10;

    await driver.touchPerform([
        {
            action: 'press',
            options: {
                x: leftSide,
                y: height*0.9,
            },
        },
        {
            action: 'wait',
            options: {
                ms: 300,
            },
        },
        {
            action: 'moveTo',
            options: {
                x: leftSide,
                y: height*0.7,
            },
        },
        {
            action: 'release',
            options: {},
        },
    ]);
}

exports.scrollDown = scrollDown;