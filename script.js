function getComputerChoice() {
  let handSigns = ["rock", "paper", "scissors"];

  // Fisher-Yates shuffle algorithm produce unbiased permutation
  function shuffle(arr){
    for(let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    } 
  }
  
  for(let i = 0; i < 1000000; i++) {
    shuffle(handSigns);
  }
  
  return handSigns[0];
}

function playGame() {
  const signBtn = document.querySelector(".sign-btn");
  const log = document.querySelector("#log");
  log.textContent = "beat computer if you win 5 times first!\n\n";

  // Declare scores and winner which are the targeted output of a game
  let roundCount = 0;
  let humanScore = 0;
  let computerScore = 0;
  let winner;

  function playRound(humanChoice, computerChoice) {
    if (
      (humanChoice === "rock" && computerChoice === "scissors") ||
      (humanChoice === "paper" && computerChoice === "rock") ||
      (humanChoice === "scissors" && computerChoice === "paper")
    ) {
      log.textContent +=
        `You win! ${humanChoice.at(0).toUpperCase() + humanChoice.slice(1)} beats ${computerChoice}` + "\n";
      humanScore++;
    } else if (humanChoice === computerChoice) {
      log.textContent += `It's a tie! Both are ${humanChoice}` + "\n";
    } else {
      log.textContent +=
        `Computer wins! ${computerChoice.at(0).toUpperCase() + computerChoice.slice(1)} beats ${humanChoice}` + "\n";
      computerScore++;
    }
  }

  // Play round when signBtn's even handler gets triggered before one player hits 5 points
  signBtn.addEventListener("click", (e) => {
    if (!winner && e.target.id) {
      // Get inputs of human and computer
      const humanSelection = e.target.id;
      const computerSelection = getComputerChoice();

      log.textContent += "round " + ++roundCount + "\n";

      // Logic for scores manipulating
      playRound(humanSelection, computerSelection);

      // Print real-time scoreline with humanScore and computerScore variable
      if (humanScore >= computerScore) {
        log.textContent += `${humanScore} - ${computerScore}` + "\n\n";
      } else {
        log.textContent += `${computerScore} - ${humanScore}` + "\n\n";
      }

      // Print the final output which is winner variable
      if (humanScore === 5 || computerScore === 5) {
        winner = humanScore > computerScore ? "you" : "computer";
        log.textContent += `Game over! The final winner is ${winner}!` + "\n";
      }
    }
  });
}

playGame();