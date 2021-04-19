const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
//converting array into json as well as getting high scores
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
//maximum number of high scores
const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;
//disables save button if username is empty 
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});
//save high score
saveHighScore = (e) => {
    e.preventDefault();
    //contants
    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    //Push high score 
    highScores.push(score);
    //sorting high score highest to lowest
    highScores.sort((a, b) => b.score - a.score);
    //After 5 dont display the high score
    highScores.splice(5);
    //updating the local storage with high scores using json 
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('index.html');
};
