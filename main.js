//Java variables
const choices = ["✊🏻", "📃", "✂️"];
let opponent1Score = 0;
let opponent2Score = 0;
let drawScore = 0;
let result;

let opponent1Choice;
let opponent2Choice;

let difficulty = "Normal";

let isGateOpen = false;

//HTML-related variables
let htmlModeButton = document.getElementById("mode-button");
let htmlLevelButton = document.getElementById("level-button");

let htmlChosenDisplay = document.getElementById("chosen-display");
let htmlResultDisplay = document.getElementById("result-display");

let htmlOpponent1Score = document.getElementById("opponent1-display");
let htmlOpponent2Score = document.getElementById("opponent2-display");
let htmlDrawDisplay = document.getElementById("draw-display");

//Determine if player vs computer or player vs player
function handleChoice(opponentChoice) {
    if (htmlLevelButton.disabled) {
        htmlResultDisplay.classList.remove("blue-text","red-text");      
        if (!isGateOpen) {         
            opponent1Choice = opponentChoice;
            isGateOpen = true;
            
            htmlChosenDisplay.textContent = "Player 1: ❓"+"\u00A0".repeat(6)+" Player 2: "+"\u00A0".repeat(4);
            htmlResultDisplay.textContent = "Who will win?";          
        } else {                         
            opponent2Choice = opponentChoice;            
            isGateOpen = false;
            
            htmlChosenDisplay.textContent = "Player 1: "+opponent1Choice+"\u00A0".repeat(6)+" Player 2: "+opponent2Choice;
            winCondition();
        }                   
    } else {        
        opponent1Choice = opponentChoice;
        aiChoice(); 
    }              
}

//update the difficulty type
function aiDifficulty(difType) {   
    difficulty = difType; 
    
    htmlLevelButton.textContent = difType;
    handleReset();
}

//AI process the opponent's input and response to it based on the diffuclty
function aiChoice() {
    let chance;

    //Default AI response 👇
    opponent2Choice = choices[Math.floor(Math.random() * 3)];

    //AI current response would change depend on difficulty 👇
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
    htmlChosenDisplay.textContent = "You: "+opponent1Choice+"\u00A0".repeat(6)+" Computer: "+opponent2Choice;
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
            if (htmlLevelButton.disabled) {
                result = "Player 1 win!";
            } else {
                result = "You win!";
            }        
            opponent1Score ++;
        } else {
            if (htmlLevelButton.disabled) {
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
function handleMode(modeType) {
    switch (modeType) {
        case "P-C":
            document.getElementById("level-button").disabled = false;
            htmlModeButton.textContent = "1 Player";   
            handleReset();       
            break;
        case "P-P":
            document.getElementById("level-button").disabled = true;
            htmlModeButton.textContent = "2 Player";
            handleReset();
            break;
    }  
}

//Reset and Display most information dynamically
function handleReset() {
    opponent1Score = 0;
    opponent2Score = 0;
    drawScore = 0;

    isGateOpen = false;

    result = "Who will win?";

    htmlChosenDisplay.textContent = "You ⚔️ Opponent";
    displayText();  
}
function displayText() {
    htmlResultDisplay.classList.remove("blue-text","red-text");
    switch (result) {
        case "Player 1 win!":
        case "You win!":
            htmlResultDisplay.classList.add("blue-text");
            break;
        case "Player 2 win!":
        case "Computer win!":
            htmlResultDisplay.classList.add("red-text");
            break;        
    }
    htmlResultDisplay.textContent = (result);
    if (htmlLevelButton.disabled) {        
        htmlOpponent1Score.textContent = "Player 1 score: "+opponent1Score;
        htmlOpponent2Score.textContent = "Player 2 score: "+opponent2Score;
        htmlDrawDisplay.textContent = "Draws: "+drawScore;
    } else {
        htmlOpponent1Score.textContent = "Your score: "+opponent1Score;
        htmlOpponent2Score.textContent = "Computer's score: "+opponent2Score;
        htmlDrawDisplay.textContent = "Draws: "+drawScore;
    }
}  
 

    
