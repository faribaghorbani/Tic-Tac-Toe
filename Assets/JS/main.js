const board = document.getElementsByClassName("board")[0];
const turnLabel = document.querySelector(".turnlabel")
const oClass = "fill-o";
const xClass = "fill-x";
let gameContinue = true;
let xTurn = true;
let winnings = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const tiles = document.querySelectorAll(".tile");

tiles.forEach(tile => {
    tile.addEventListener('click', e => {
        if (!board.classList.contains("game-over")) {
            let clickedTile = e.target;
            let currentClass = xTurn ? xClass : oClass;
            clickedTile.classList.add(currentClass);
            let winOrNorSenarios = winOrNotList(currentClass)
            // check win
            if (winOrNorSenarios.length !== 0) {
                gameContinue = false;
                board.classList.add("game-over")
                for (let i of winOrNorSenarios) {
                    tiles[i].style.backgroundColor = "blue"
                }
                setTimeout(() => {
                    xTurn? board.classList.add("win-x") : board.classList.add("win-o")
                }, 1000)
                setTimeout(() => {
                    document.body.addEventListener('click', e => {
                        window.location.reload();
                    })
                }, 1000)
                return
            }
            // check draw
            else if (drawOrNot(tiles) === 9){
                board.classList.add("game-over")
                board.classList.add("draw")
                setTimeout(() => {
                    document.body.addEventListener('click', e => {
                        window.location.reload();
                    }, true)
                }, 500)
                return
            }
            // continue
            else {
                xTurn = !xTurn;
                turnLabel.innerText = xTurn? "X": "O"
                console.log(drawOrNot(tiles))
            }
        }
    },
    {once:true})
})

function winOrNotList(currentClass) {
    let temp1 = winnings.filter(senario => {
        return senario.every(index => {
            return tiles[index].classList.contains(currentClass)
        })
    })
    let temp2 = []
    for (let i of temp1) {
        for (let j of i) {
            if (!temp2.includes(j)) {
                temp2.push(j)
            }
        }
    }
    return temp2
}

function drawOrNot(tiles) {
    let tilesList = Array.from(tiles)
    return tilesList.filter(tile => tile.classList.contains(oClass) || tile.classList.contains(xClass)).length
}

