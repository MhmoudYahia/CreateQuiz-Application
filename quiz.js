//select elements
let qArea = document.querySelector(".QA-Area");
let statisticsdiv = document.querySelector(".statistics");
let about = document.querySelector(".dataAbout");
let resultes = document.querySelector(".resultes");
let right_answersSpan = document.querySelector(".resultes span:nth-child(2)");
let perfect_res = document.querySelector(".resultes span:nth-child(1)");
let spans = document.querySelector(".statistics .bullets");
let res_span = document.querySelector(".resultes span:last-child");
let count_span = document.querySelector(".dataAbout .cnt span");
let downtimer = document.querySelector(".timer");
let btn;
//global variables
let currentIndex = 0;
let right_answer = 0;
let wrong_answer = 0;
let stopCounter;
let duration = 10;
//Get data from object
function getRequest() {
  fetch("Questions.json")
    .then((res) => {
      let data = res.json();
      return data;
    })
    .then((questionsData) => {
      makeBullets(questionsData.length);

      //add data
      addQuestionData(questionsData);

      //start counter
      countDown(duration, questionsData.length);
    })
    .catch((e) => {
      console.log(new Error("not found"));
    });
}
getRequest();

function makeBullets(num) {
  count_span.innerHTML = num;
  res_span.innerHTML = num;
  for (let i = 0; i < num; i++) {
    let bullet = document.createElement("span");
    if (i === 0) {
      bullet.classList.add("on");
    }
    spans.appendChild(bullet);
  }
}

function addQuestionData(questionsData) {
  let qcount = questionsData.length;
  dataObject = questionsData[currentIndex];

  //creat q
  let question = document.createElement("div");
  question.appendChild(document.createTextNode(dataObject["title"]));
  question.classList.add("question");
  qArea.appendChild(question);

  //add elements
  let anss = [];
  for (let i = 0; i < 4; i++) {
    let ansdiv = document.createElement("div");
    anss.push(ansdiv);
    ansdiv.classList.add("answer");
    ansInput = document.createElement("input");
    ansInput.setAttribute("type", "radio");
    ansInput.setAttribute("id", `ans${i + 1}`);
    ansInput.setAttribute("name", "answer");
    ansInput.setAttribute("value", `${dataObject[`answer_${i + 1}`]}`);
    if (i === 0) {
      ansInput.setAttribute("checked", true);
    }
    anslabel = document.createElement("label");
    anslabel.setAttribute("for", `ans${i + 1}`);
    anslabel.appendChild(
      document.createTextNode(dataObject[`answer_${i + 1}`])
    );
    ansdiv.appendChild(ansInput);
    ansdiv.appendChild(anslabel);
    qArea.appendChild(ansdiv);
  }

  //creat submit
  btn = document.createElement("button");
  btn.appendChild(document.createTextNode("Submit"));
  btn.setAttribute("type", "submit");
  qArea.append(btn);

  //event
  btn.addEventListener("click", function () {
    let val = document.querySelector("[type=radio]:checked").value;

    let rightAns = dataObject["right_answer"];
    clearInterval(stopCounter);
    countDown(duration, qcount);

    //check teh
    if (val === rightAns) {
      right_answer++;
    } else {
      wrong_answer++;
    }
    if (qcount - 1 > currentIndex) {
      currentIndex++;
      let bulletspan = document.querySelector(
        `.statistics .bullets span:nth-child(${currentIndex + 1})`
      );
      //remove the last data
      bulletspan.classList.add("on");
      question.remove();
      for (let i = 0; i < 4; i++) {
        anss[i].remove();
      }
      btn.remove();

      // add next question
      addQuestionData(questionsData);
    } else {
      // handle last case and show the resultes
      qArea.style.display = "none";
      statisticsdiv.style.display = "none";
      about.style.display = "none";
      resultes.style.display = "flex";
      right_answersSpan.innerHTML = right_answer;
      if (rightAns >= qcount / 2 && rightAns < qcount) {
        perfect_res.classList.add("good");
      } else if (right_answer === qcount) {
        perfect_res.classList.add("perfect");
      } else perfect_res.classList.add("bad");
    }
  });
}
function countDown(dur, qcount) {
  if (qcount - 1 > currentIndex) {
    let minutes, seconds;
    stopCounter = setInterval(function () {
      minutes = parseInt(dur / 60);
      seconds = parseInt(dur % 60);
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      downtimer.innerHTML = `${minutes}:${seconds}`;
      if (--dur < 0) {
        clearInterval(stopCounter);
        btn.click();
        console.log("f");
      }
    }, 1000);
  }
}
//   // creat ans1
//   let ans1div = document.createElement("div");
//   ans1div.classList.add("answer");
//   ans1Input = document.createElement("input");
//   ans1Input.setAttribute("type", "radio");
//   ans1Input.setAttribute("id", "ans1");
//   ans1Input.setAttribute("name", "answer");
//   ans1Input.setAttribute("value", `${dataObject["answer_1"]}`);
//   ans1label = document.createElement("label");
//   ans1label.setAttribute("for", "ans1");
//   ans1label.appendChild(document.createTextNode(dataObject["answer_1"]));
//   ans1div.appendChild(ans1Input);
//   ans1div.appendChild(ans1label);
//   qArea.appendChild(ans1div);

//   //  create ans2
//   let ans2div = document.createElement("div");
//   ans2div.classList.add("answer");
//   ans2Input = document.createElement("input");
//   ans2Input.setAttribute("type", "radio");
//   ans2Input.setAttribute("id", "ans2");
//   ans2Input.setAttribute("name", "answer");
//   ans2Input.setAttribute("value", `${dataObject["answer_2"]}`);
//   ans2label = document.createElement("label");
//   ans2label.setAttribute("for", "ans2");
//   ans2label.appendChild(document.createTextNode(dataObject["answer_2"]));
//   ans2div.appendChild(ans2Input);
//   ans2div.appendChild(ans2label);
//   qArea.appendChild(ans2div);

//   //  create ans3
//   let ans3div = document.createElement("div");
//   ans3div.classList.add("answer");
//   ans3Input = document.createElement("input");
//   ans3Input.setAttribute("type", "radio");
//   ans3Input.setAttribute("id", "ans3");
//   ans3Input.setAttribute("name", "answer");
//   ans3Input.setAttribute("value", `${dataObject["answer_3"]}`);
//   ans3label = document.createElement("label");
//   ans3label.setAttribute("for", "ans3");
//   ans3label.appendChild(document.createTextNode(dataObject["answer_3"]));
//   ans3div.appendChild(ans3Input);
//   ans3div.appendChild(ans3label);
//   qArea.appendChild(ans3div);

//   //  create ans4
//   let ans4div = document.createElement("div");
//   ans4div.classList.add("answer");
//   ans4Input = document.createElement("input");
//   ans4Input.setAttribute("type", "radio");
//   ans4Input.setAttribute("id", "ans4");
//   ans4Input.setAttribute("name", "answer");
//   ans4Input.setAttribute("value", `${dataObject["answer_4"]}`);
//   ans4label = document.createElement("label");
//   ans4label.setAttribute("for", "ans4");
//   ans4label.appendChild(document.createTextNode(dataObject["answer_4"]));
//   ans4div.appendChild(ans4Input);
//   ans4div.appendChild(ans4label);
//   qArea.appendChild(ans4div);
