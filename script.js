const screens = document.querySelectorAll('.screen');
const choose_halak_btns = document.querySelectorAll('.choose-halak-btn');
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
let seconds = 0
let score = 0
let selected_halak = {}

start_btn.addEventListener('click', () => screens[0].classList.add('up'))

choose_halak_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_halak = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createHalak, 1000)
        startGame()
    })
})

function startGame() {
    setInterval(increaseTime, 1000)
    audioElement.play();
}

function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Czas: ${m}:${s}`
    seconds++
}

function createHalak() {
    const halak = document.createElement('div')
    halak.classList.add('halak')
    const { x, y } = getRandomLocation()
    halak.style.top = `${y}px`
    halak.style.left = `${x}px`
    halak.innerHTML = `<img src="${selected_halak.src}" alt="${selected_halak.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    halak.addEventListener('click', catchHalak)

    game_container.appendChild(halak)
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

function catchHalak() {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addHalaks()
}

function addHalaks() {
    setTimeout(createHalak, 1000)
    setTimeout(createHalak, 1500)
}

function increaseScore() {
    score++
    if(score > 19) {
        message.classList.add('visible')
    }
    scoreEl.innerHTML = `Wynik: ${score}`
    if(score === 100) {
        message.innerHTML = `Wygrałeś! ${timeEl.innerHTML}<br> Zagraj jeszcze raz!<br> Kliknij w przycisk poniżej<br> aby zacząć od nowa<br><button class="btn" id="start-btn" onClick="window.location.reload();">Zagraj jeszcze raz</button>`
    }
}