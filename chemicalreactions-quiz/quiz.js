const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];
//fetching questions from the questions json file
fetch('questions.json')
    .then((res) => {
        return res.json();
    })
    //loading the questions
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        StartQuiz();
    })
    .catch((err) => {
        console.error(err);
    });

//CONSTANTS throughout quiz
//points for correct answer
const CORRECT_BONUS = 10;
//number of questions
const MAX_QUESTIONS = 5;

StartQuiz = () => {
    //used as a rest
    questionCounter = 0;
    //score user starts with 
    score = 0;
    //available Questions
    availableQuesions = [...questions];
    getNewQuestion();
};

//used to get new questions
getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('quizover.html');
    }
    //increments questions by 1 
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    //used to get available questions 
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    //retriving current question from availiable questions
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;
    //used to reference each answer choice
    choices.forEach((choice) => {
        // referencing the number data set used in the questions
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    //splicing from available questions
    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};
//used to splice the question that was used 
choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;
        //allow user to answer
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        //used to apply feedback for questions answered
        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        // if correct increase scrore by the marks assigned
        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        // used for the delay so user cant start straight away while getting new question
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion(); //getting new question 
        }, 700); // 700 milliseconds
    });
});
//increasing the score
incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};
