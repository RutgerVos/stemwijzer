var button1 = document.getElementById("pro");
var button2 = document.getElementById("none");
var button3 = document.getElementById("contra");
var button4 = document.getElementById("skip");
var back = document.getElementById("back");
var head = document.getElementById("title");
var statement = document.getElementById("statement");
var sub = subjects[0]["title"];
var partie = subjects[0]["parties"][0]["name"];
//var position = subjects[0]["parties"][0]["position"];
var qstNum = 0;
var answers = [];
var allpartys = [];
var results = [];
const partyssize = [];

for (var i = 0; i < parties.length; i++) {
  allpartys[i] = {
    name: parties[i].name,
    secular: parties[i].secular,
    size: parties[i].size,
    points: 0
  };
}

console.log(allpartys);
//questionAnswer stores the answer entered and starts the next question
function questionAnswers(answer) {
  answers[qstNum] = answer;
  console.log(answers);
  nextQuestion("up");
}
//checks how many numbers of question there and if there no more questions
function nextQuestion(upOrDown) {
  if (subjects.length - 1 != qstNum) {
    if (upOrDown != "up") {
      qstNum--;
    } else {
      qstNum++;
      document.getElementById("questionW").checked = false;
    }
    question();
  } else {
    document.getElementById("questionW").style.visibility = "hidden";
    document.getElementById("questionWeight").style.visibility = "hidden";
    checkAnswers();
  }
}
function question() {
  head.innerHTML = answers.length + 1 + ". " + subjects[qstNum]["title"];
  statement.innerHTML = subjects[qstNum]["statement"];
}

// een manier op terug te gegaan naar een vraag
function backQuestion() {
  if (qstNum == 0) {
    return;
  } else {
    qstNum--;
    answers.length--;
    //console.log(answers.length);
    question();
    console.log("backQuestion" + answers.length);
  }
}
// een functie om te checken welke partij punten krijgen gebaseert op de you antwoorden die jij hebt ingevuld
function checkAnswers() {
  console.log("check begin");
  for (var answerCounter = 0; answerCounter < answers.length; answerCounter++) {
    var partiesLength = subjects[answerCounter].parties.length;
    for (var p = 0; p < partiesLength; p++) {
      subjects[answerCounter].parties;
      console.log(answers);
      if (
        answers[answerCounter] == subjects[answerCounter].parties[p].position
      ) {
        allpartys[answerCounter].points++;
        var checkBox = document.getElementById("questionW");
        if (checkBox.checked == true) {
          allpartys[answerCounter].points++;
        }

        console.log("true");
        console.log(allpartys);
      } else {
        console.log("false");
      }
    }
  }
  buttonreplace();
  bestToWorst();
  Sorting();
}

function buttonreplace() {
  head.innerHTML = "politieken partien die het beste passen bij you";
  statement.innerHTML =
    "Begint met het beste partie die bij je past en eindigt met slechtste partie die bij you past";

  document.getElementById("back").classList.add("hidden");
  document.getElementById("pro").classList.add("hidden");
  document.getElementById("none").classList.add("hidden");
  document.getElementById("contra").classList.add("hidden");
  //document.getElementById("MyCheck").classList.add("hidden");
  button4.innerHTML = "test opnieuw";
  button4.setAttribute("onclick", "restartTest()");
}
function restartTest() {
  window.location.href = "start.html";
}
function Sorting() {
  allpartys.sort(function(a, b) {
    return b.points - a.points;
  });
}
//functie om partijen te generaren
function bestToWorst() {
  for (let best = 0; best < allpartys.length; best++) {
    var node = document.createElement("LI");
    if ((allpartys[best].secular = true)) {
      node.classList.add("sectrue");
    } else {
      node.classList.add("secfalse");
    }
    if (allpartys[best].size < 15) {
      node.classList.add("small");
    } else {
      node.classList.add("big");
    }
    var textnode = document.createTextNode(
      allpartys[best].name +
        " " +
        "size:" +
        allpartys[best].size +
        " " +
        "secular:" +
        allpartys[best].secular
    );
    node.appendChild(textnode);
    document.getElementById("myList").appendChild(node);
  }
}
//functie voor alleen grote partijen te laten zij
function PartySize() {
  var checkBox = document.getElementById("myCheck");
  var smalls = document.getElementsByClassName("small");
  if (checkBox.checked == true) {
    console.log("smalls");
    console.log(smalls);
    for (let sizing = 0; sizing < smalls.length; sizing++) {
      console.log(smalls[sizing]);
      smalls[sizing].classList.add("hidden");
    }
  }
  if (checkBox.checked == false) {
    console.log(smalls);
    for (let sizing = 0; sizing < smalls.length; sizing++) {
      smalls[sizing].classList.remove("hidden");
    }
  }
}
//functie voor alleen seculieren partijen te laten zij
function PartySeculiere() {
  var checkBox = document.getElementById("myCheck");
  var secular = document.getElementsByClassName("secfalse");
  if (checkBox.checked == true) {
    console.log("secular");
    console.log(secular);
    for (let seculars = 0; seculars < secular.length; seculars++) {
      console.log(secular[seculars]);
      secular[seculars].classList.add("hidden");
    }
  }
  if (checkBox.checked == false) {
    console.log(secular);
    for (let seculars = 0; seculars < secular.length; seculars++) {
      secular[seculars].classList.remove("hidden");
    }
  }
}

question();
