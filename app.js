
// toggler button
const menuButton = document.querySelector(".button, .toggler")
const navbar = document.querySelector(".navbar")
const bar = document.querySelector(".menu-line")

menuButton.addEventListener("click", () => {
    navbar.classList.toggle("nav-toggler")
    bar.classList.toggle("active")
})

// box4 (task) menu button
const taskActive = document.querySelector(".toggler-one")
const completedActive = document.querySelector(".toggler-two")
const displayTask = document.querySelector(".task-output")
const displayCompleted = document.querySelector(".task-completed")

taskActive.addEventListener("click", () => { // task button
    displayTask.classList.remove("active-output")
    displayCompleted.classList.remove("active-comleted")
})
completedActive.addEventListener("click", () => { // complete button
    displayTask.classList.add("active-output")
    displayCompleted.classList.add("active-comleted")
})
// box1 (timer)
const timerCount = document.querySelector(".timer")
const timerUpArrow = document.querySelector(".up-button")
const timerDownArrow = document.querySelector(".down-button")
const timerStartButton = document.querySelector(".start-button")
const mainDisplay = document.querySelector(".box1-container")
const overlayDisplay = document.querySelector(".box1-overlay")
const progressValue = document.querySelector(".progress-value")

const countDownNumber = [25,50]
let pressButton = true
timerUpArrow.addEventListener("click", () => { // upButton
    countDownDisplayDOM(countDownNumber[1])
})
timerDownArrow.addEventListener("click", () => { // downButton
    countDownDisplayDOM(countDownNumber[0])
})

function countDownDisplayDOM(item = 25) { // display counting to DOM
    let countDown = item
    timerCount.innerText = countDown
}
countDownDisplayDOM()

timerStartButton.addEventListener("click", () => { // startButton
    mainDisplay.classList.add("hide")
    overlayDisplay.classList.add("show")
    progressValue.innerText = `${timerCount.innerText - 1}:59`
    countingDown()
})



function countingDown() {
    let choosenCount = timerCount.innerText - 1
    let sec = 59
    let localArray = []
    let countingInterval = setInterval(() => {
        sec--;
        if(sec == -1) {
            sec = 59
        }
        if(sec < 10) {
            sec = `0${sec}`
        }
        if(sec == 59) {
            choosenCount--
        }
        progressValue.innerText = `${choosenCount}:${sec}`
        if(choosenCount < 10) {
            progressValue.innerText = `0${choosenCount}:${sec}`
        }
        localArray.push([choosenCount,sec])
        console.log(localArray)
    },1000)

    const stopButton = document.querySelector(".stop-button")
    stopButton.addEventListener("click", () => { // startButton
        mainDisplay.classList.remove("hide")
        overlayDisplay.classList.remove("show")
        pauseButton.classList.remove("hide")
        continueButton.classList.remove("show")
        clearInterval(countingInterval)
        preparingTime()
    })
    const pauseButton = document.querySelector(".pause-button")
    pauseButton.addEventListener("click", () => { // startButton
        pauseButton.classList.add("hide")
        continueButton.classList.add("show")
        clearInterval(countingInterval)
    })
    const continueButton = document.querySelector(".continue-button")
    continueButton.addEventListener("click", () => { // startButton
        pauseButton.classList.remove("hide")
        continueButton.classList.remove("show")
        countingDown()
    })
}

function preparingTime() { // save the time to local storage
    localStorage.setItem('time',JSON.stringify(localArray))
    let setting = JSON.parse(localStorage.getItem('time'))
    let getLocalArray = []
    getLocalArray.push(setting)
    console.log(setting + 'local')
}