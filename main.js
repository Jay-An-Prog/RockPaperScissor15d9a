//Variables
const choices = ["✊🏻", "📃", "✂️"];
let opponent1Score = 0;
let opponent2Score = 0;
let drawScore = 0;
let result;

let opponent1Choice;
let opponent2CHoice;

let difficulty = "Normal";

let gate = false;

//Determine if player vs computer or player vs player
function handleChoice(opponentChoice) {
    if (level.disabled) {
        if (!gate) {
            opponent1Choice = opponentChoice;
            chosenResult.textContent = "Player 1: ❓ --- Player 2: ";
            gate = true;
        } else {
            opponent2Choice = opponentChoice;   
            chosenResult.textContent = "Player 1: "+opponent1Choice+" --- Player 2: "+opponent2Choice;   
            winCondition();
            gate = false;
        }                   
    } else {        
        opponent1Choice = opponentChoice;
        aiChoice(); 
    }              
}

//update the difficulty status
function aiDifficulty(status) {
    difficulty = status;
    level.textContent = status;
}

//AI process the opponent's input and response to it based on the diffuclty
function aiChoice() {
    let chance;
    //Default AI response 👇
    opponent2Choice = choices[Math.floor(Math.random() * 3)];
    //AI response would change depend on difficulty 👇
    switch (difficulty) {
        case "Easy":
            chance = Math.floor(Math.random() * 3) + 1;
            if (chance == 1) {
                const counterMovesOf = {
                    "✊🏻": "✂️",
                    "📃": "✊🏻",
                    "✂️": "📃"
                };            
                opponent2Choice = counterMovesOf[opponent1Choice]; 
            }
            break;    
        case "Hard": 
            chance = Math.floor(Math.random() * 10) + 1;
            if (chance <= 3) {
                const counterMovesFor = {
                    "✊🏻": "📃",
                    "📃": "✂️",
                    "✂️": "✊🏻"
                };            
                opponent2Choice = counterMovesFor[opponent1Choice];
            }
            break;
        case "Expert":  
            chance = Math.floor(Math.random() * 10) + 1; 
            if (chance <= 5) {
                const counterMovesFor = {
                    "✊🏻": "📃",
                    "📃": "✂️",
                    "✂️": "✊🏻"
                };            
                opponent2Choice = counterMovesFor[opponent1Choice];  
            }
            break;
    }  
    chosenResult.textContent = "You: "+opponent1Choice+" --- Computer: "+opponent2Choice;   
    winCondition();
}

//Win condition
function winCondition() {
    if (opponent1Choice === opponent2Choice) {
        result = "It's a draw!";
        drawScore ++;
    } else {
        if (opponent1Choice === "✊🏻" && opponent2Choice === "✂️" ||
            opponent1Choice === "📃" && opponent2Choice === "✊🏻" ||
            opponent1Choice === "✂️" && opponent2Choice === "📃") {
            if (level.disabled) {
                result = "Player 1 win!";
            } else {
                result = "You win!";
            }        
            opponent1Score ++;
        } else {
            if (level.disabled) {
                result = "Player 2 win!";
            } else {
                result = "Computer win!";
            }           
            opponent2Score ++;
        }     
    }
    displayText();
}

//Player-Player or Player-Computer mode
function disableLevel() {
    document.getElementById("level").disabled = true;
    mode.textContent = "2 Player";
    handleReset(); 
}
function enableLevel() {
    document.getElementById("level").disabled = false;
    mode.textContent = "1 Player";
    handleReset();
}

//Reset and Display
function handleReset() {
    chosenResult.textContent = "You --- Opponent";
    result = "Who will win?";

    opponent1Score = 0;
    opponent2Score = 0;
    drawScore = 0;

    gate = false;

    displayText();
}
function displayText() {
    resultDisplay.classList.remove("blueText","redText");

    switch (result) {
        case "Player 1 win!":
        case "You win!":
            resultDisplay.classList.add("blueText");
            break;
        case "Player 2 win!":
        case "Computer win!":
            resultDisplay.classList.add("redText");
            break;        
    }

    resultDisplay.textContent = (result);
    if (level.disabled) {        
        opponent1Display.textContent = "Player 1 score: "+opponent1Score;
        opponent2Display.textContent = "Player 2 score: "+opponent2Score;
        drawsDisplay.textContent = "Draws: "+drawScore;
    } else {
        opponent1Display.textContent = "Your score: "+opponent1Score;
        opponent2Display.textContent = "Computer's score: "+opponent2Score;
        drawsDisplay.textContent = "Draws: "+drawScore;
    }
}  

    