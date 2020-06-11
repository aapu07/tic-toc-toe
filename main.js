let currentPlayer = 'X';
let playerXSelections = [];
let playerOSelections = [];
const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

// get elements we need from our HTML
let winnerDiv = document.querySelector("#winner")
let turnDiv = document.querySelector("#turn")
let resetButton = document.querySelector("#reset")

// get an array of all the elements with a class of grid-cell from the page
let cellElementArray = document.querySelectorAll('.grid-cell');

// loop through cellElementArray and add a "click" event listener to each element
for (let i = 0; i < cellElementArray.length; i = i + 1) {
    let currentCellElement = cellElementArray[i]
    currentCellElement.addEventListener('click', moveHandler);
}

// add click event listener to reset button
resetButton.addEventListener("click", resetBoard)

function moveHandler(event) {
    let clickedCellElement = event.target;
    if(winnerDiv.innerHTML === ""){
        if (clickedCellElement.innerHTML === "") {
            startAnimation(clickedCellElement)
            if (currentPlayer === "X") {
                clickedCellElement.innerHTML = "X"
                turnDiv.innerHTML = "X's turn"
                currentPlayer = "O"
                playerXSelections.push(Number(clickedCellElement.id))
                if (checkForWin(winningCombinations, playerXSelections)) {
                    winnerDiv.innerHTML = "X wins!"
                    turnDiv.innerHTML = "game over:"
                }
            } else {
                clickedCellElement.innerHTML = "O"
                turnDiv.innerHTML = "O's turn"
                currentPlayer = "X"
                playerOSelections.push(Number(clickedCellElement.id))
                if (checkForWin(winningCombinations, playerOSelections)) {
                    winnerDiv.innerHTML = "O wins!"
                    turnDiv.innerHTML = "game over:"
                }
            }
            if (checkForDraw()) {
                winnerDiv.innerHTML = "draw"
                turnDiv.innerHTML = "game over:"
            }
        }
    }
}

function checkForWin(winningCombinations, playerSelections) {
    for (let i = 0; i < winningCombinations.length; i = i + 1) {
        let currentCombination = winningCombinations[i]
        let matches = 0
        for (let j = 0; j < currentCombination.length; j = j + 1) {
            let currentNumber = currentCombination[j]
            if (playerSelections.includes(currentNumber)) {
                matches = matches + 1
            }
            if (matches === 3) {
                return true
            }
        }
    }
    return false
}

function resetBoard() {
    playerXSelections = []
    playerOSelections = []
    for (let i = 0; i < cellElementArray.length; i = i + 1) {
        let currentElement = cellElementArray[i]
        currentElement.innerHTML = ""
    }
    winnerDiv.innerHTML = ""
    turnDiv.innerHTML = ""
}

function checkForDraw() {
    if (playerXSelections.length >= 5) {
        return true
    } else {
        return false
    }
}

function startAnimation(element) {
    return element.animate([
        // keyframes
        { transform: 'scale(1)' },
        { transform: 'scale(0.5)' },
        { transform: 'scale(1)' },
    ], {
        // timing options
        duration: 500
    });
}