var button1 = document.getElementById('b1');
var button2 = document.getElementById('b2');
var button3 = document.getElementById('b3');
const head = document.getElementById('title');
const statement = document.getElementById('statement');
var sub = subjects[0]['title'];
var partie = subjects[0]['parties'][0]['name'];
var position = subjects[0]['parties'][0]['position'];
var qstNum = 0;
var answers = [];
var results = [];

for (var i = 0; i < parties.length; i++) {
	results[i] = {'name': parties[i].name, 'points': 0}
}

console.log(results);

function questionAnswers(answer)
{
	answers[qstNum] = answer;
	console.log(answers);
	nextQuestion("up");

}
function nextQuestion(upOrDown) {
	if(subjects.length-1 != qstNum){
		if (upOrDown != "up"){
			qstNum--;
		} else {
      		qstNum++;
		}
		question();
	} else {
		console.log('end question list');
	}
}
function question()
{
	head.innerHTML = subjects[qstNum]['title'];
	statement.innerHTML = subjects[qstNum]['statement'];
}
//nextQuestion("up");
function checkAnswers(){

}
question();
