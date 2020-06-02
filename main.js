let currentPlayer = 'X'; // X is the starting player.
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
            if (currentPlayer === "X") {
                currentPlayer = "O"
                clickedCellElement.innerHTML = "X"
                playerXSelections.push(Number(clickedCellElement.id))                
                
               if( checkForWin(winningCombinations,playerXSelections)){
                   alert ("X wins")
                   resetBoard(cellElementArray)
               }

            } else {
                clickedCellElement.innerHTML = "O"
                currentPlayer = "X"
                playerOSelections.push(Number(clickedCellElement.id))
                if(checkForWin(winningCombinations,playerOSelections)){
                    alert ("O wins")
                    resetBoard(cellElementArray)
                }
            }
        }
        // Log the ID of the cell which was just clicked:
        
    });

}

function checkForWin(winningCombinations, playerSelections) {
    for (let i = 0; i < winningCombinations.length; i = i + 1) {
        let currentCombinations = winningCombinations[i]

        let matches = 0
        for (let j = 0; j < currentCombinations.length; j = j + 1) {
            let currentNumber = currentCombinations[j]
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
function resetBoard(elementsArray){
    playerXSelections = []
    playerOSelections = []
    for ( let i = 0 ; i< elementsArray.length; i = i + 1){
        let currentElement = elementsArray[i]
        currentElement.innerHTML = ""

    }

}
resetBoard(cellElementArray)
//let testArray = [1, 2, 3]
//let testArray2 = [7, 2, 5]

// main>div.grid-cell*9 ( this code should be on index.html//