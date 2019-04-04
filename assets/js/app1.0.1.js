const gameboard = document.getElementById('gameboard');
const initialVerticalLength = 2;
const initialHorizontalLength = 2;
let verticalLength = 2;
let horizontalLength = 2;
let nbAnswer = 3;
const showingAnswerDuration = 2;
let answers = [];
let inputAnswers = [];
let goodAnswers = 0;
let nbInput = 0;
let level = 1;
const nbAnswerIncreaseLevel = [5, 10, 15];

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function removeElement(className) {
    var elem = document.querySelector('.' + className);
    return elem.parentNode.removeChild(elem);
}

function createGame()
{
	let table = document.createElement('table');
	table.classList.add('game');
	for (let i = 0; i < verticalLength; i++)
	{
		let tr = document.createElement('tr');
		tr.classList.add('row');
		for(let j = 0; j < horizontalLength; j++) 
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
	let levelElement = document.createElement('level');
	levelElement.classList.add('level');
	levelElement.innerHTML = "Level : " + level;
	let playAgainBtn = document.createElement('button');
	playAgainBtn.classList.add('playAgainBtn');
	playAgainBtn.style.display = "none";
	playAgainBtn.addEventListener('click', function(){
		if(playAgainBtn.classList.contains('nextLevel')){
			deleteGame();
			if(verticalLength < 9){
				verticalLength++;
				horizontalLength++;
			}
			level++;
			if (nbAnswerIncreaseLevel.includes(level)) {
				nbAnswer++;
			}
			createGame();
			createSolution();
			showSolution();
		} else {
			level = 1;
			window.location.reload();
		}
	})
	gameboard.appendChild(table);
	gameboard.appendChild(score);
	gameboard.appendChild(levelElement);
	gameboard.appendChild(playAgainBtn);
}

function createSolution()
{
	for(let i = 0; i < nbAnswer; i++) 
	{
		let rowNumberIndex = getRandomInt(verticalLength);
		let columnNumberIndex = getRandomInt(horizontalLength);
		let rowTrigger = document.querySelectorAll('.row')[rowNumberIndex];
		if(answers.includes(rowTrigger.childNodes[columnNumberIndex].childNodes[0])) {
			i--;
		} else {
			answers[i] = rowTrigger.childNodes[columnNumberIndex].childNodes[0];
		}
	}
	document.querySelector('.score').innerHTML = "Good matches : 0/" + answers.length;
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
	}, showingAnswerDuration * 1000);
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
			win();
			disableEntries();
			alert('Congratulations ! You have won ! :D');
		}
	} else {
		element.classList.remove('grey');
		element.classList.add('black');
		element.disabled = true;
		lose();
		disableEntries();
		alert('Argh ! You have lost :/');
	}
	nbInput++;
	document.querySelector('.score').innerHTML = "Good matches : " + goodAnswers + "/" + answers.length;
}

function disableEntries()
{
	for(let j = 0; j < document.querySelectorAll('.entry').length; j++){
		document.querySelectorAll('.entry')[j].disabled = true;
	}
}

function win()
{
	document.querySelector('.playAgainBtn').classList.add("nextLevel");
	document.querySelector('.playAgainBtn').innerHTML = "Next level";
	document.querySelector('.playAgainBtn').style.display = "block";
}

function lose()
{
	document.querySelector('.playAgainBtn').classList.remove('nextLevel');
	document.querySelector('.playAgainBtn').style.display = "block";
	document.querySelector('.playAgainBtn').innerHTML = "Play again";
	for(let i = 0; i < answers.length; i++) {
		answers[i].classList.remove('grey');
		if (!(answers[i].classList.contains('red')))
		{
			answers[i].classList.add('orange');
		}
	}
}

function deleteGame(){
	answers = [];
	inputAnswers = [];
	goodAnswers = 0;
	nbInput = 0;
	removeElement('game');
	removeElement('score');
	removeElement('level');
	removeElement('playAgainBtn');
}

createGame();
createSolution();
showSolution();