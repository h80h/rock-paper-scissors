function getComputerChoice() {
  let choice;
  let randomNum;
  const handSigns = ["rock", "paper", "scissors"];

  randomNum = Math.floor(Math.random() * 3);
  choice = handSigns[randomNum];
  
  return choice;
    
}

function getHumanChoice() {
  let choice = prompt("rock? paper? or scissors?", "rock");
  return choice;
  
}

function playGame() {
  // Declare scores and winner which are the targeted output of a game
  let humanScore = 0;
  let computerScore = 0;
  let winner;

  function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase();

    if (
      (humanChoice === "rock" && computerChoice === "scissors") ||
      (humanChoice === "paper" && computerChoice === "rock") ||
      (humanChoice === "scissors" && computerChoice === "paper")
    ) {
      console.log(
        `You win! ${humanChoice.at(0).toUpperCase() + humanChoice.slice(1)} beats ${computerChoice}`,
      );
      humanScore++;
    } else if (humanChoice === computerChoice) {
      console.log(`It's a tie! Both are ${humanChoice}`);
    } else {
      console.log(
        `Computer wins! ${computerChoice.at(0).toUpperCase() + computerChoice.slice(1)} beats ${humanChoice}`,
      );
      computerScore++;
    }
  }

  alert(
    "Let's play Rock Paper Scissors game!\nYou v.s. Computer\n\nThere will be 5 rounds\nYou need to undock the devtool as a separate window to get real-time log in console",
  );


  // Run five rounds
  for (let i = 0; i < 5; i++) {
    // The whole for loop body is a complete single round

    alert(`round ${i + 1}`);

    // Get inputs of computer and human
    let computerSelection = getComputerChoice();
    let humanSelection = getHumanChoice();

    // Logic for scores manipulating
    playRound(humanSelection, computerSelection);

    // Print real-time scoreline with humanScore and computerScore variable
    if (humanScore >= computerScore) {
      console.log(`${humanScore} - ${computerScore}`);
    } else {
      console.log(`${computerScore} - ${humanScore}`);
    }
  }

  // Print the final output which is winner variable
  if (humanScore === computerScore) {
    winner = "no winner";
    console.log("Game over! It's a tie, no one wins!");
  } else {
    winner = humanScore > computerScore ? "you" : "computer";
    console.log(`Game over! The final winner is ${winner}!`);
  }
}

playGame();