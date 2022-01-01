const quizdata = [
  {
    question: "Q1: What is full form of HTML ?",
    a: "hello to my language",
    b: "hyper text markup language",
    c: "hyper text makeup language",
    d: "hyper test markup language",
    ans: "ans2",
  },
  {
    question: "Q2: Who is making the web standards?",
    a: "Microsoft",
    b: "The World Wide Web Consortium",
    c: "Google",
    d: "Mozilla",
    ans: "ans2",
  },
  {
    question: "Q3: Which character is used to indicate an end tag?",
    a: "/",
    b: "<",
    c: "*",
    d: "^",
    ans: "ans1",
  },
  {
    question: "Q4: What does CSS stand for?",
    a: "Colourful Style Sheets",
    b: "Creative Style Sheets",
    c: "Cascading Style Sheets",
    d: "Computer Style Sheets",
    ans: "ans3",
  },
  {
    question: "Q5: Which is the correct CSS syntax?",
    a: "{body:color=black;}",
    b: "body {color: black;}",
    c: "{body;color:black;}",
    d: "body:color=black;",
    ans: "ans2",
  },
  {
    question: "Q1: Everything in React is a?",
    a: "Module",
    b: "Component",
    c: "Package",
    d: "Class",
    ans: "ans2",
  },
  {
    question: "Q2: In which directory React components are saved?",
    a: "Inside js/components/",
    b: "Inside vendor/components/",
    c: "Inside vendor/components/",
    d: "Inside vendor/",
    ans: "ans1",
  },
  {
    question: "Q3: What is Babel?",
    a: "A transpiler",
    b: "An interpreter",
    c: "A compiler",
    d: "Both compiler and transpiler",
    ans: "ans3",
  },
  {
    question: "Q4: How many elements does a react component return?",
    a: "1 Element",
    b: "2 Elements",
    c: "Multiple Elements",
    d: "None of the above",
    ans: "ans1",
  },
  {
    question: "Q5: What does the webpack command do?",
    a: "A module bundler",
    b: "Runs react local development server",
    c: "Transpiles all the Javascript down to one file",
    d: "None of the above",
    ans: "ans3",
  },
  {
    question: "Q1: Which of the following statement is correct?",
    a: "js is Server Side Language.",
    b: "js is the Client Side Language.",
    c: "js is both Server Side and Client Side Language.",
    d: "None of the above.",
    ans: "ans1",
  },
  {
    question:
      "Q2:  Which of the following method of fs module is used to get file information?",
    a: "fs.open(path, flags[, mode], callback)",
    b: "fs.stat(path, callback)",
    c: "fs.readFile(path, flags[, mode], callback)",
    d: "None of the above.",
    ans: "ans2",
  },
  {
    question:
      "Q3: Which of the following command is used to start a REPL session?",
    a: "$ node",
    b: "$ node start",
    c: "$ node repl",
    d: "$ node console",
    ans: "ans1",
  },
  {
    question:
      "Q4: Which of the following command is used to install the Node.js express module?",
    a: "$ npm install express",
    b: "$ node install express",
    c: "$ install express",
    d: "None of the above",
    ans: "ans1",
  },
  {
    question: "Q5: What is Callback?",
    a: "The callback is a technique in which a method calls back the caller method.",
    b: "The callback is an asynchronous equivalent for a function.",
    c: "Both of the above.",
    d: "None of the above.",
    ans: "ans2",
  },
];

const question = document.querySelector("#question");
const option1 = document.querySelector("#opt1");
const option2 = document.querySelector("#opt2");
const option3 = document.querySelector("#opt3");
const option4 = document.querySelector("#opt4");
const submit = document.querySelector("#submit");
const answers = document.querySelectorAll(".answer");
const result = document.querySelector(".showscore");
const intques = parseInt(document.querySelector(".hidden11").innerHTML);
//const Name = document.querySelector('.hidden');

let quesNo = intques;
let score = 0;
const loadques = () => {
  question.innerHTML = quizdata[quesNo].question;
  option1.innerHTML = quizdata[quesNo].a;
  option2.innerHTML = quizdata[quesNo].b;
  option3.innerHTML = quizdata[quesNo].c;
  option4.innerHTML = quizdata[quesNo].d;
};
loadques();

const checkans = () => {
  let choosedans;
  answers.forEach((curAnsEle) => {
    if (curAnsEle.checked) {
      choosedans = curAnsEle.id;
    }
  });
  return choosedans;
};

submit.addEventListener("click", () => {
  const checkedans = checkans();
  //console.log(Name.innerHTML);
  if (checkedans == quizdata[quesNo].ans) {
    score = score + 2;
  }

  quesNo++;
  console.log(intques);
  console.log(intques + 5);
  if (quesNo < intques + 5) {
    answers.forEach((curSelans) => (curSelans.checked = false));
    loadques();
  } else {
    const data = { Score: score };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("/quiz", options);
    result.innerHTML = `
        <p>You scored ${score}/${5 * 2}</p>
        
        `;
    result.classList.remove("showscore");
    submit.classList.add("hidenext");
  }
});
