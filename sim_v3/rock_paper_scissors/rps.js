function handleUserChoice(choice) {
    console.log("User chose: " + choice);
    document.getElementById('result').textContent = "You chose: " + choice;
    const computerChoice = getComputerChoice();
    document.getElementById('computer-choice').textContent = "Computer chose: " + computerChoice;
}

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

document.getElementById('rock').addEventListener('click', function() {
    handleUserChoice('rock');
});

document.getElementById('paper').addEventListener('click', function() {
    handleUserChoice('paper');
});

document.getElementById('scissors').addEventListener('click', function() {
    handleUserChoice('scissors');
});
