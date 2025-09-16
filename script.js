const question=[
   { question: "who are you?",
  Answer: [
    { text: "Humans", correct: true },
    { text: "Animal", correct: false },
    { text: "plant", correct: false },
    { text: "robot", correct: false }
  ]
},

   { question: "who is the kiler?",
  Answer: [
    { text: "Humans", correct: false},
    { text: "Animal", correct: true },
    { text: "plant", correct: false },
    { text: "robot", correct: false }
  ]
}
,
    { question: "who is harmful?",
  Answer: [
    { text: "Humans", correct: false },
    { text: "Animal", correct: false },
    { text: "plant", correct: false },
    { text: "robot", correct: true }
  ]
}
,
     { question: "who is your friend?",
  Answer: [
    { text: "Humans", correct: false },
    { text: "Animal", correct: false },
    { text: "plant", correct: true },
    { text: "robot", correct: false }
  ]
}

]
const questionElement = document.getElementById("question");
const answerButton = document.querySelector(".answer-buttons");
const nextButton = document.getElementById("next-btn");
// const bodycolor = document.getElementsByTagName("body");
let currentQuestionIndex = 0;
let score = 0;
function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNO = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNO + ". " + currentQuestion.question;
    speechSynthesis.speak(new SpeechSynthesisUtterance(question.value));
    currentQuestion.Answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButton.appendChild(button);
    });
}


 function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
 }
 function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++; 
    } else {
        selectBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

 function showScores(){
    resetState();
 questionElement.innerHTML = `Your score is ${score} out of ${question.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
   
    
}

 function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }
    else{
        showScores();
    }
 }
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < question.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

 
 startQuiz();

