var button1 = document.getElementById('pro');
var button2 = document.getElementById('none');
var button3 = document.getElementById('contra');
var button4 = document.getElementById('skips');
const head = document.getElementById('title');
const statement = document.getElementById('statement');
var sub = subjects[0]['title'];
var partie = subjects[0]['parties'][0]['name'];
var position = subjects[0]['parties'][0]['position'];
var qstNum = 0;
var answers = [];
var results = [];

for (var i = 0; i < parties.length; i++) 
{
	results[i] = {'name': parties[i].name, 'points': 0}

}

console.log(results);
//questionAnswer stores the answer entered and starts the next question
function questionAnswers(answer)
{
	answers[qstNum] = answer;
	console.log(answers);
	nextQuestion("up");

}
//checks how many numbers of question there and if there no more questions
function nextQuestion(upOrDown) 
{
	if (answers.length == 30) {return;}
	if(subjects.length-1 != qstNum){
		if (upOrDown != "up"){
			qstNum--;
		} else {
      		qstNum++;
		}
		question();
	} else {
		document.getElementById('pro').classList.add('hidden');
		console.log('end question list');
	}
}
function question()
{
	head.innerHTML = (answers.length + 1) + ". " + subjects[qstNum]['title'];
	statement.innerHTML = subjects[qstNum]['statement'];
}
//nextQuestion("up");

// een manier op terug te gegaan naar een vraag
function backQuestion()
	{
	qstNum--;
	answers.length--;
	//console.log(answers.length);
	question();
	console.log('backQuestion'+qstNum);
	}
// een
function checkAnswers()
	{



	}
question();
