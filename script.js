'use strict';


// creates questionNumber and score variables, and starts value of each at 0
let questionNumber = 0;
let score = 0;




function startQuiz () {
    $('.start-quiz').on('click', '.start-button', function(event) {
        $('.start-quiz').remove();
        $('.questionAnswerForm').css('display', 'block');
        $('.questionNumber').text(1);
    })
}
// (generateQuestion doesn't get called here because it's called automatically when the page loads)
// listen for click on start button within .start-quiz class
// .quizStart on('click', 'startbutton', function(event){
    // remove .quizStart, .questionAnswerForm gets change to displayed in the css (from display:none), change .questionNumber to 1 in header

function generateQuestion () {
    if (questionNumber < STORE.length) {
        return `
        <h2>${STORE[questionNumber].question}</h2>
        <form class="question-form">
         <fieldset>
          <div class="radioChoices">
          <label class="answerOption">
          <input id="answerChoice" type="radio" name="answerChoice" class="options" value="${STORE[questionNumber].answers[0]}" required>
          ${STORE[questionNumber].answers[0]}
          </label><br>
          <label class="answerOption">
          <input id="answerChoice" type="radio" name="answerChoice" class="options" value="${STORE[questionNumber].answers[1]}" required>
          ${STORE[questionNumber].answers[1]}
          </label><br>
          <label class="answerOption">
          <input id="answerChoice" type="radio" name="answerChoice" class="options" value="${STORE[questionNumber].answers[2]}" required>
          ${STORE[questionNumber].answers[2]}
          </label><br>
          <label class="answerOption">
          <input id ="answerChoice" type="radio" name="answerChoice" class="options" value="${STORE[questionNumber].answers[3]}" required>
          ${STORE[questionNumber].answers[3]}
          </label>
          </div>
          <button type="button" class="submitQuestion">SUBMIT</button>
        </fieldset>
      </form>
    </div>
        `
    }
    else {
        renderResults();
        restartQuiz()
        $('.questionNumber').text(10);
    }
}
// for each question in STORE, renders the html. goes through each question
// once the function reaches the length of STORE it will instead run the renderResults function and the restartQuiz function


function renderQuestion () {
    $('.questionAnswerForm').html(generateQuestion());
  }
  // render question in DOM
  // generates the HTML For the question within the class .questionAnswerForm


function changeQuestionNumber () {
    questionNumber ++;
    $('.questionNumber').text(questionNumber + 1)
}
// increments the variable questionNumber so that it can loop through our entire STORE array
// increment the question number in the heading

function changeScore () {
    score ++;
}
// increment score if correct
// no function needed if incorrect; score should remain unchanged -- so we'll only call this function if the user chooses the correct answer




function userSelectAnswer () {
    $('form').on('click', '.submitQuestion', function(event) {
      event.preventDefault();
      let selected = $('input:checked');
      let answer = selected.val();
      let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
      if (answer === correctAnswer) {
        ifAnswerIsCorrect();
      }
      else {
        ifAnswerIsWrong();
      }
    });
  }
//listens to a click on a 'submitQuestion' class within a 'form' element
//checks to see if the user's selected value matches the correct answer in STORE
//then either runs the ifAnswerIsCorrect function,
// or the ifAnswerIsWrong function


  function ifAnswerIsCorrect () {
    userAnswerFeedbackCorrect();
    updateScore();
  }

  function ifAnswerIsWrong() {
    userAnswerFeedbackWrong();
  }

  function userAnswerFeedbackCorrect () {
      let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
      $('.questionAnswerForm').html(`
      <div class="correctFeedback">
       <div class="correctImage">
        <img src="assets/dancingman.gif" alt="Dancing Man in the Black Lodge">
       </div>
       <p>CORRECT</p>
       <button type="button" class="nextButton">NEXT</button>
       </div>`);
  }
// .correctAnswer is referencing the element in our STORE array


  function userAnswerFeedbackWrong () {
      let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
      $('.questionAnswerForm').html(`
      <div class="wrongFeedback">
      <div class="wrongImage">
        <img src="assets/boblaughing.gif" alt="Laughing Bob from Twin Peaks"></div>
        <p>SORRY, THAT'S WRONG</p>
        <p>THE CORRECT ANSWER IS: <span>"${correctAnswer}"</span></p>
        <button type="button" class="nextButton">NEXT</button>
        </div>`);
  }
// html here, with correct answer given
// include next button
// .nextButton is class for next button



  function updateScore () {
      changeScore ();
      $('.score').text(score);
      }
// changes the score in the heading


function renderResults () {
$('.questionAnswerForm').html(`
 <div class="resultsForm">
  <p>THE END ..?</p>
  <div class="finalImage">
  <img src="assets/bobandcooperlaughing.gif" alt="Bob and Cooper laughing">
    </div>
  <p>YOUR FINAL SCORE:
  <br>
  ${score} OUT OF 10</p>
  <button type="button" class="restartButton">TRY AGAIN</button>
 </div>
`
);
}
// renders the results page
// html for results page goes here



function renderNextQuestion () {
    $('main').on('click', '.nextButton', function(event) {
      changeQuestionNumber();
      renderQuestion();
      userSelectAnswer();
    });
  }
  // listens for a click (within the body element) on the .nextButton
  // runs the changeQuestionNumber function (changes heading text)
  // runs the renderQuestion function (generates html in questionAnswerForm class)
  // runs the userSelectAnswer function (will check to see if the user submitted the correct answer)
  
  //restart quiz function - reloads page to start quiz over
  function restartQuiz () {
    $('main').on('click', '.restartButton', function (event) {
      location.reload();
    });
  }
  // reloads page
  
  //run quiz functions
  function createQuiz () {
    startQuiz();
    renderQuestion();
    userSelectAnswer();
    renderNextQuestion();
  }
  
  $(createQuiz);
  // on page load, runs above function