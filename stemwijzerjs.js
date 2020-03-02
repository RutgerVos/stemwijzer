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
Object.defineProperty(allpartys, "add", {
  set: function(value) {
    this.points += value;
  }
});
Object.defineProperty(allpartys, "increment", {
  get: function() {
    this.points++;
  }
});

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
    }
    question();
  } else {
    checkAnswers();
  }
}
function question() {
  head.innerHTML = answers.length + 1 + ". " + subjects[qstNum]["title"];
  statement.innerHTML = subjects[qstNum]["statement"];
}
//nextQuestion("up");

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
// een
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
function bestToWorst() {
  for (let best = 0; best < allpartys.length; best++) {
    var node = document.createElement("LI");
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
    //allpartys[best].name;
  }
}
function PartySize() {
  var checkBox = document.getElementById("myCheck");
  if (checkBox.checked == true) {
    for (let partySize = 0; partySize < allpartys.length; partySize++) {
      var size = allpartys[partySize].size;
      if (size < 15) {
        delete allpartys[partySize];
      }
    }
  }
}
function PartySeculiere() {
  var checkBox = document.getElementById("PartySeculiere");
  if (checkBox.checked == true) {
    for (
      let PartySeculiere = 0;
      PartySeculiere < allpartys.length;
      PartySeculiere++
    ) {
      var secular = allpartys[PartySeculiere].secular;
      var list = document.getElementById("myList");
      var listbegin = list.getElementsByTagName("LI");
      if (secular < false) {
        //delete allpartys[PartySeculiere];
        listbegin[secular].classList.add("hidden");
        //listbegin[secular].style.visibility = "hidden";
      }
    }
  }
  if (checkBox.checked == false) {
    for (
      let PartySeculiere = 0;
      PartySeculiere < allpartys.length;
      PartySeculiere++
    ) {
      if (secular < true) {
        //delete allpartys[PartySeculiere];
        //listbegin[secular].classList.remove("hidden");
      }
    }
  }
}

question();
