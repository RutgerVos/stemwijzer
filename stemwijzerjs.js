var button1 = document.getElementById("pro");
var button2 = document.getElementById("none");
var button3 = document.getElementById("contra");
var button4 = document.getElementById("skip");
var back = document.getElementById("back");
var head = document.getElementById("title");
var statement = document.getElementById("statement");
var sub = subjects[0]["title"];
var partie = subjects[0]["parties"][0]["name"];

var qstNum = 0;
var answers = [];
var allpartys = [];
var results = [];
const partyssize = [];
var weightquestion = [];

for (var i = 0; i < parties.length; i++) {
  allpartys[i] = {
    name: parties[i].name,
    secular: parties[i].secular,
    size: parties[i].size,
    points: 0,
  };
}

console.log(allpartys);
var checkSize = document.getElementById("MyCheck");
var checkSec = document.getElementById("MyCheck1");
var checkSEC = document.getElementById("secCheck");
var checkSIZE = document.getElementById("sizeCheck");
checkSec.style.visibility = "hidden";
checkSize.style.visibility = "hidden";
checkSIZE.style.visibility = "hidden";
checkSEC.style.visibility = "hidden";
//questionAnswer stores the answer entered and starts the next question
function questionAnswers(answer) {
  weightquestion[qstNum] = document.getElementById("questionW").checked;
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
  head.innerHTML = qstNum + 1 + ". " + subjects[qstNum]["title"];
  statement.innerHTML = subjects[qstNum]["statement"];
  console.log(weightquestion);
  var contraButton = document.getElementById("contra");
  var noneButton = document.getElementById("none");
  var proButton = document.getElementById("pro");
  contraButton.classList.remove("chosen");
  noneButton.classList.remove("chosen");
  proButton.classList.remove("chosen");
  if (answers[qstNum] == "contra") {
    contraButton.classList.add("chosen");
  }
  if (answers[qstNum] == "pro") {
    proButton.classList.add("chosen");
  }
  if (answers[qstNum] == "none") {
    noneButton.classList.add("chosen");
  }
  document.getElementById("questionW").checked = weightquestion[qstNum];
  // verwijder class chosen voor alle buttons
  // als het antwoord behorende bij qstNum gelijk is aan 'contra' dan voeg class chosen toe aan button voor contra
  // als het antwoord behorende bij qstNum gelijk is aan 'pro' dan voeg class chosen toe aan button voor pro
  // als het antwoord behorende bij qstNum gelijk is aan 'none' dan voeg class chosen toe aan button voor none
  // voeg css toe voor de class chosen
}

// een manier op terug te gegaan naar een vraag
function backQuestion() {
  if (qstNum == 0) {
    return;
  } else {
    qstNum--;
    //answers.length--;
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
      //subjects[answerCounter].parties;
      console.log(answers);
      if (
        answers[answerCounter] == subjects[answerCounter].parties[p].position
      ) {
        // zoek in alpartys de partij die overeenkomet met subjects[answerCounter].parties[p].position --> foundParty
        let foundParty = allpartys.find((party) => {
          return party.name == subjects[answerCounter].parties[p].name;
        });
        /*
        let resultParty = null;
        for (index = 0; index < allpartys.length; index++){
          let party = allpartys[index];
          match = party.name == subjects[answerCounter].parties[p].name;
          if (match == true) {
            resultParty = party; break;
          }
        }
*/

        foundParty.points++;
        // allpartys[answerCounter].points++;
        var checkBox = document.getElementById("questionW");
        if (checkBox.checked == true) {
          foundParty.points++;
        }

        console.log("true");
        console.log(allpartys);
      } else {
        console.log("false");
      }
    }
  }
  buttonreplace();
  Sorting();
  bestToWorst();
}

function buttonreplace() {
  checkSec.style.visibility = "visible";
  checkSize.style.visibility = "visible";
  checkSIZE.style.visibility = "visible";
  checkSEC.style.visibility = "visible";
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
  allpartys.sort(function (a, b) {
    return b.points - a.points;
  });
}
//functie om partijen te generaren
function bestToWorst() {
  for (let best = 0; best < allpartys.length; best++) {
    var node = document.createElement("LI");
    if (allpartys[best].secular == true) {
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
  var checkBox = document.getElementById("sizeCheck");
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
  var checkBox = document.getElementById("MyCheck1");
  console.log(checkBox.checked);
  var secularing = document.getElementsByClassName("secfalse");
  if (checkBox.checked == true) {
    console.log("secular");
    console.log(secularing);
    for (let seculars = 0; seculars < secularing.length; seculars++) {
      console.log(secularing[seculars]);
      secularing[seculars].classList.add("hidden");
    }
  }
  if (checkBox.checked == false) {
    console.log(secularing);
    for (let seculars = 0; seculars < secularing.length; seculars++) {
      secularing[seculars].classList.remove("hidden");
    }
  }
}

question();
