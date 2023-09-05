const questions=[
    {
        question:"Which is the largest animal in the world ?",
        answers: [
            {text: "shark" , correct:false},
            {text: "Blue Whale" , correct:true},
            {text: "Tiger" , correct:false},
            {text: "Giraffee" , correct:false},

        ]
    },
    {
        question:"What is the National Bird of India?",
        answers: [
            {text: "Pigeon" , correct:false},
            {text: "Eagle", correct:false},
            {text: "Peacock" , correct:true},
            {text: "Sparrow" , correct:false},
        ]
    },
    {
        question:"What is the capital of India?",
        answers: [
            {text: "Mumbai" , correct:false},
            {text: "New Delhi", correct:true},
            {text: "AndhraPradesh" , correct:false},
            {text: "Karnataka" , correct:false},
        ]
    },
    {
        question:"What is the National Animal of India",
        answers: [
            {text: "Tiger" , correct:true},
            {text: "Lion", correct:false},
            {text: "Horse" , correct:false},
            {text: "Wolf" , correct:false},
        ]
    }

];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML =questionNo + "." +currentQuestion.question;
    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        
        }
        button.addEventListener("click",selectAnswer);

    });
}
function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn =e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;

    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="PLAY AGAIN";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
    {
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();