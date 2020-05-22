const blockElements = document.querySelectorAll('[block-data]')
const board = document.getElementById('board')
const winningPrompt = document.getElementById('prompt-box')
const winningMessage = document.getElementById('prompt-message')
const restartButton = document.getElementById('restart-button')
const X_CLASS = 'x'
const O_CLASS = 'o'
let oTurn
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

startGame()
restartButton.addEventListener('click', startGame)

function startGame() {
    oTurn = false
    blockElements.forEach(block => {
        block.classList.remove(X_CLASS)
        block.classList.remove(O_CLASS)
        block.removeEventListener('click', handleClick)
        block.addEventListener('click', handleClick, {
            once: true
        })
    })
    setBoardHoverClass()
    winningPrompt.classList.remove('show')
}

function handleClick(e) {
    const block = e.target
    const currentClass = oTurn ? O_CLASS : X_CLASS

    placeMark(block, currentClass)

    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurn()
        setBoardHoverClass()
    }
}

function placeMark(block, currentClass) {
    block.classList.add(currentClass)
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)

    if (oTurn) {
        board.classList.add(O_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}


function swapTurn() {
    oTurn = !oTurn
}


function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return blockElements[index].classList.contains(currentClass)
        })
    })
}


function isDraw(){
    return [...blockElements].every(block =>{
        return block.classList.contains(X_CLASS) || block.classList.contains(O_CLASS)
    })
}

function endGame(draw) {
    if (draw) {
        winningMessage.innerText = 'Draw !'
    } else {
        winningMessage.innerText = `${oTurn ? "O" : "X"} is the winner !`
    }
    winningPrompt.classList.add('show')
}
