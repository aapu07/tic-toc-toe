let currentPlayer = 'Julie'; // Julie is the starting player.
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

// Get all .grid-cell elements from the DOM and store in cellElementArray (see Resources links below):
let cellElementArray = document.querySelectorAll('.grid-cell');
// Loop over each element in our cellElementArray:
for (let elementIndex = 0; elementIndex < cellElementArray.length; elementIndex = elementIndex + 1) {
    // Set the cell element at cellElementArray[cellIndex] to the currentCell variable:
    let currentCellElement = cellElementArray[elementIndex]
    // Add an event listener to the currentCellElement:
    currentCellElement.addEventListener('click', function (event) {
        // event.target tells us which element the user clicked (see Resources links below):
        let clickedCellElement = event.target;

        if (clickedCellElement.innerHTML === "") {
            if (currentPlayer === "Julie") {
                clickedCellElement.innerHTML = "Julie"
                currentPlayer = "Aapu"
                playerXSelections.push(Number(clickedCellElement.id))
                if (checkForWin(winningCombinations, playerXSelections)) {
                    alert("Julie wins")
                    resetBoard()
                }
            } else {
                clickedCellElement.innerHTML = "Aapu"
                currentPlayer = "Julie"
                playerOSelections.push(Number(clickedCellElement.id))
                if (checkForWin(winningCombinations, playerOSelections)) {
                    alert("Aapu wins")
                    resetBoard()
                }
            }
            if(checkForDraw()){
                alert("draw")
                resetBoard()
            }
        }
    });
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

function resetBoard(){
    playerXSelections = []
    playerOSelections = []
    for(let i = 0; i < cellElementArray.length; i = i + 1){
        let currentElement = cellElementArray[i]
        currentElement.innerHTML = ""
    }
}

function checkForDraw(){
    if(playerXSelections.length >= 5){
        return true
    } else {
        return false
    }
}

function ani(element) {
    element.classList.add('animate');
}

