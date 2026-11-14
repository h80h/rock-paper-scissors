function playGame() {
  const signBtn = document.querySelector(".sign-btn");
  const log = document.querySelector("#log");
  const handSigns = ["rock", "paper", "scissors"];
  const amountOfSign = handSigns.length;
  log.textContent = "beat computer if you win 5 times first!\n\n";

  // Declare scores and winner which are the targeted output of a game
  let roundCount = 0;
  let humanScore = 0;
  let computerScore = 0;
  let winner;

  function getComputerChoice() {
    let indexArr = new Array(amountOfSign);
    for(let i = 0; i < amountOfSign; i++) indexArr[i] = i;

    // Fisher-Yates shuffle algorithm produce unbiased permutation
    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    for (let i = 0; i < 1000000; i++) shuffle(indexArr);
    return indexArr[0];
  }

  function playRound(humanChoice, computerChoice) {
    const indexOfHumanChoice = handSigns.indexOf(humanChoice);
    const signRelationship = indexOfHumanChoice - computerChoice;
    const capitalizedHandSign = handSigns.map(sign => sign.at(0).toUpperCase() + sign.slice(1));

    if (signRelationship === -(amountOfSign - 1) || signRelationship === 1) {
      log.textContent +=
        `You win! ${capitalizedHandSign[indexOfHumanChoice]} beats ${handSigns[computerChoice]}` +
        "\n";
      humanScore++;
    } else if (humanChoice === handSigns[computerChoice]) {
      log.textContent += `It's a tie! Both are ${humanChoice}` + "\n";
    } else {
      log.textContent +=
        `Computer wins! ${capitalizedHandSign[computerChoice]} beats ${humanChoice}` +
        "\n";
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