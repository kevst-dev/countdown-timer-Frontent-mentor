const MILLISECONDS_OF_A_SECOND = 1000;
const MILLISECONDS_OF_A_MINUTE = MILLISECONDS_OF_A_SECOND * 60;
const MILLISECONDS_OF_A_HOUR = MILLISECONDS_OF_A_MINUTE * 60;
const MILLISECONDS_OF_A_DAY = MILLISECONDS_OF_A_HOUR * 24

// Solo se ejecuta cuando se ha cargado todo el HTML
document.addEventListener('DOMContentLoaded', function () {
    countdown()
})

const countdown = () => {
    const dateNow = new Date()
    const timerUpdate = setInterval(() => {
        currentTime = getRemainingTime(getDateDuration(dateNow, 14, 0, 0, 0))
        paintClock(currentTime)
        if (timeIsUp(currentTime)) { clearInterval(timerUpdate); }

    }, MILLISECONDS_OF_A_SECOND)
}

const timeIsUp = (currentTime) => {
    if (
        currentTime.remainingSeconds == 0 &&
        currentTime.remainingMinutes == 0 &&
        currentTime.remainingHours == 0 &&
        currentTime.remainingDays == 0
    ) {
        return true
    } else {
        return false
    }
}

const paintClock = (currentTime) => {
    paintCountdownDisplay('valueSecond', currentTime.remainingSeconds)
    paintCountdownDisplay('valueMinutes', currentTime.remainingMinutes)
    paintCountdownDisplay('valueHours', currentTime.remainingHours)
    paintCountdownDisplay('valueDays', currentTime.remainingDays)
}

const paintCountdownDisplay = (idElement, time) => {
    const element = document.getElementById(idElement)
    element.innerHTML = time;
}

const getRemainingTime = (deadDate) => {
    const dateNow = new Date()
    const duration = (deadDate - dateNow)
    const remainingDays = ('0' + Math.floor(duration / MILLISECONDS_OF_A_DAY)).slice(-2)
    const remainingHours = ('0' + Math.floor((duration % MILLISECONDS_OF_A_DAY) / MILLISECONDS_OF_A_HOUR)).slice(-2)
    const remainingMinutes = ('0' + Math.floor((duration % MILLISECONDS_OF_A_HOUR) / MILLISECONDS_OF_A_MINUTE)).slice(-2)
    const remainingSeconds = ('0' + Math.floor((duration % MILLISECONDS_OF_A_MINUTE) / MILLISECONDS_OF_A_SECOND)).slice(-2)

    return {
        remainingDays,
        remainingHours,
        remainingMinutes,
        remainingSeconds
    }
}

const getDateDuration = (dateNow, days, hours, minutes, seconds) => {
    const daysToMilliseconds = days * MILLISECONDS_OF_A_DAY
    const hoursToMilliseconds = hours * MILLISECONDS_OF_A_HOUR
    const minutesToMilliseconds = minutes * MILLISECONDS_OF_A_MINUTE 
    const secondsToMilliseconds = seconds * MILLISECONDS_OF_A_SECOND

    const extraTime = daysToMilliseconds + hoursToMilliseconds + minutesToMilliseconds + secondsToMilliseconds

    return (new Date(dateNow.getTime() + extraTime))
} 
