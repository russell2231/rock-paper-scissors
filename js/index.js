const rockPaperScissors = document.querySelectorAll(
	'.choices-container .choice-container'
);
const game = document.querySelector('.game-container');
const shoot = document.querySelector('.shoot');
const results = document.querySelector('.results');
const p1 = document.querySelector('.p1 .choice-container');
const computer = document.querySelector('.computer .choice-container');
const score = document.querySelector('.score');
const playAgainBtn = document.querySelector('.restart');
const rulesBtn = document.querySelector('.rules');
const overlay = document.querySelector('.overlay');
const rulesModule = document.querySelector('.rules-module');
const closeBtn = document.querySelector('.close');
let gameScore = localStorage.getItem('score')
	? JSON.parse(localStorage.getItem('score'))
	: 0;

score.textContent = gameScore;

function housePicker() {
	// Pick a random choice for house
	const rockPaperScissorsArr = ['rock', 'paper', 'scissors'];
	const random = Math.floor(Math.random() * 3);

	return rockPaperScissorsArr[random];
}

function keepScore() {
	if (p1.parentElement.classList.contains('win')) {
		gameScore++;
		localStorage.setItem('score', gameScore);
	} else if (computer.parentElement.classList.contains('win')) {
		gameScore--;
		localStorage.setItem('score', gameScore);
	}

	score.textContent = gameScore;
}

function whoWon(p1Pick, computerPick) {
	const outcome = document.querySelector('.outcome');
	game.classList.remove('step-2');
	game.classList.add('step-3');
	results.classList.remove('hidden');

	// Check which pick wins and print results
	if (p1Pick === computerPick) {
		outcome.textContent = 'Tie';
	} else if (p1Pick === 'rock') {
		if (computerPick === 'paper') {
			outcome.textContent = 'You Lose';
			computer.parentElement.classList.add('win');
		} else {
			if (computerPick === 'scissors') {
				outcome.textContent = 'You Win';
				p1.parentElement.classList.add('win');
			}
		}
	} else if (p1Pick === 'paper') {
		if (computerPick === 'scissors') {
			outcome.textContent = 'You Lose';
			computer.parentElement.classList.add('win');
		} else {
			if (computerPick === 'rock') {
				outcome.textContent = 'You Win';
				p1.parentElement.classList.add('win');
			}
		}
	} else if (p1Pick === 'scissors') {
		if (computerPick === 'rock') {
			outcome.textContent = 'You Lose';
			computer.parentElement.classList.add('win');
		} else {
			if (computerPick === 'paper') {
				outcome.textContent = 'You Win';
				p1.parentElement.classList.add('win');
			}
		}
	}

	// Change Score
	keepScore();
}

// Start Game
rockPaperScissors.forEach((choice) => {
	choice.addEventListener('click', () => {
		game.classList.add('step-2');
		shoot.classList.remove('hidden');

		// Set users choice
		let p1Pick;

		if (choice.classList.contains('rock')) {
			p1.classList.add('rock');
			p1Pick = 'rock';
		} else if (choice.classList.contains('paper')) {
			p1.classList.add('paper');
			p1Pick = 'paper';
		} else {
			p1.classList.add('scissors');
			p1Pick = 'scissors';
		}

		// House Picks
		const housePick = housePicker();

		setTimeout(() => {
			if (housePick === 'rock') {
				computer.classList.add('rock');
			} else if (housePick === 'paper') {
				computer.classList.add('paper');
			} else {
				computer.classList.add('scissors');
			}
		}, 2000);

		// Show game results
		setTimeout(() => {
			whoWon(p1Pick, housePick);
		}, 4000);
	});
});

// Event Listeners

rulesBtn.addEventListener('click', () => {
	overlay.classList.toggle('rules-open');
	rulesModule.classList.toggle('open');
});

// Close Rules Module
closeBtn.addEventListener('click', () => {
	overlay.classList.toggle('rules-open');
	rulesModule.classList.toggle('open');
});

// Restart Game
playAgainBtn.addEventListener('click', () => {
	location.reload();
});
