const gameboard = document.getElementById('gameboard');
const verticalLength = 10;
const horizontalLength = 10;
const nbAnswer = 3;
const showingAnswerDuration = 3;
let answers = [];
let goodAnswers = 0;
let nbInput = 0;

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function createGame()
{
	let table = document.createElement('table');
	table.classList.add('game');
	for (let i = 0; i < horizontalLength; i++)
	{
		let tr = document.createElement('tr');
		tr.classList.add('row');
		for(let j = 0; j < verticalLength; j++) 
		{
			let td = document.createElement('td');
			td.classList.add('column');
			let button = document.createElement('button');
			button.classList.add('entry');
			button.classList.add('grey');
			button.disabled = true;
			td.appendChild(button);
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	let score = document.createElement('span');
	score.classList.add('score');
	score.innerHTML = "Coups joués : 0/3";
	let playAgainBtn = document.createElement('button');
	playAgainBtn.classList.add('playAgainBtn');
	playAgainBtn.style.display = "none";
	playAgainBtn.innerHTML = "Rejouer";
	playAgainBtn.addEventListener('click', function(){
		window.location.reload();
	})
	gameboard.appendChild(table);
	gameboard.appendChild(score);
	gameboard.appendChild(playAgainBtn);
}

function createSolution()
{
	for(let i = 0; i < nbAnswer; i++) 
	{
		let rowNumberIndex = getRandomInt(verticalLength);
		let columnNumberIndex = getRandomInt(horizontalLength);
		let rowTrigger = document.querySelectorAll('.row')[rowNumberIndex];
		answers[i] = rowTrigger.childNodes[columnNumberIndex].childNodes[0];
	}
}

function showSolution()
{
	for(let i = 0; i < answers.length; i++) {
		answers[i].classList.remove('grey');
		answers[i].classList.add('red');
	}
	setTimeout(function(){
		for(let i = 0; i < answers.length; i++) {
			answers[i].classList.remove('red');
			answers[i].classList.add('grey');
		}
		enableEntries();
	}, 2000);
}

function enableEntries()
{
	for(let j = 0; j < document.querySelectorAll('.entry').length; j++){
		document.querySelectorAll('.entry')[j].disabled = false;
		document.querySelectorAll('.entry')[j].setAttribute('id', j);
		document.querySelectorAll('.entry')[j].addEventListener('click', function(){
			checkEntriesMatch(this);
		})
	}
}

function checkEntriesMatch(element)
{
	if(answers.includes(element)){
		element.classList.remove('grey');
		element.classList.add('red');
		element.disabled = true;
		goodAnswers++;
		
		if (goodAnswers == answers.length) {
			document.querySelector('.score').innerHTML = "Coups joués : " + goodAnswers + "/" + answers.length;
			win();
			disableEntries();
		}
	} else {
		element.classList.remove('grey');
		element.classList.add('black');
		element.disabled = true;
		lose();
		disableEntries();
	}
	nbInput++;
	document.querySelector('.score').innerHTML = "Coups joués : " + nbInput + "/" + answers.length;
}

function disableEntries()
{
	for(let j = 0; j < document.querySelectorAll('.entry').length; j++){
		document.querySelectorAll('.entry')[j].disabled = true;
	}
}

function win()
{
	alert('Bravo ! Vous avez gagné');
	document.querySelector('.playAgainBtn').style.display = "block";
}

function lose()
{
	alert('Dommage ! Vous avez perdu');
	document.querySelector('.playAgainBtn').style.display = "block";
}

createGame();
createSolution();
showSolution();