const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
console.log(newGameBtn);


let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//lets create function to initialize the game
function initGame() {
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    //UI pr empty bhi krna padega
    boxes.forEach((box, index) => {
        box.innerText="";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, initialize boxes with css again
        box.classList=`box box${index+1}`; 
    });
    // if (newGameBtn) {
    //     newGameBtn.classList.remove("active");
    // } else {
    //     console.error("newGameBtn element not found");
    // }
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    //UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPosition.forEach((position) => {
        //all three boxes should be non empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" ) 
        && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[2]]===gameGrid[position[1]])){

            //check if winner is x
            if(gameGrid[position[0]] === "X")
                answer="X";
            else
                answer="O";

            // disable pointer events
            boxes.forEach( (box) => {
                box.style.pointerEvents="none";
            })

                //now we know X or O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    //it means we have a winner
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //when there is no winner
    let fillCount = 0;
    gameGrid.forEach( (box) => {
        if(box !== "")
            fillCount++;
    });

    //board is filled,
    if(fillCount ===9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }

}

function handleClick(index){
    if(gameGrid[index] === "" ) {
        boxes[index].innerHTML=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap karo turn
        swapTurn();
        //check koi jeeta toh nahi gya
        checkGameOver();
    }; 
}

boxes.forEach((box, index ) =>{
    box.addEventListener("click", () =>{
        handleClick(index);
    })
}); 

newGameBtn.addEventListener("click", initGame);