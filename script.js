'use strict';



let questionNumber = 0;
let score = 0;
// creates questionNumber and score variables, and starts value of each at 0



function startQuiz () {
    $('.start-quiz').on('click', '.start-button', function(event) {
        $('.start-quiz').remove();
        $('.questionAnswerForm').css('display', 'block');
        $('.questionNumber').text(1);
    })
}
// listen for click on start button within .start-quiz class
// removes the element with the class '.start-quiz'
// turns on the display for the element with the class '.questionAnswerForm',
//     which was defaulted to display: none on inital page load
// changes the text of the element with class '.questionNumber' to 1

function generateQuestion () {
    if (questionNumber < STORE.length) {
        return `
        <form class="question-form">
         <fieldset>
         <legend><h2>${STORE[questionNumber].question}</h2></legend>
            <div class="radioChoices">
            <label class="answerOption">
            <input id="answerChoice" type="radio" name="answerChoice" class="options" value="${STORE[questionNumber].answers[0]}" required checked>
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
// for each question in STORE, renders the question form html
// once the function reaches the length of STORE it will instead run the renderResults function and the restartQuiz function, and set the text of '.questionNumber' to 10


function renderQuestion () {
    $('.questionAnswerForm').html(generateQuestion());
  }
  // render question in DOM
  // runs the generateQuestion function, which generates the HTML
  //      for the question within the element with the class '.questionAnswerForm'


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
//listens for a click on a 'submitQuestion' class within a 'form' element
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
// adds HTML for a correct answer form, including a "next" button


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
// html here, with correct answer shown to user
// include next button



  function updateScore () {
      changeScore ();
      $('.score').text(score);
      }
// runs the function changeScore (increments the score variable)
// changes the score text in the page heading


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
// renders the HTML for the results page
// includes user's final score
// includes "try again" button to direct user to retake the quiz



function renderNextQuestion () {
    $('main').on('click', '.nextButton', function(event) {
      changeQuestionNumber();
      renderQuestion();
      userSelectAnswer();
    });
  }
  // listens for a click (within the body element) on the .nextButton
  // runs the changeQuestionNumber function (increments questionNumber variable and
  //       changes question heading text)
  // runs the renderQuestion function (generates html in questionAnswerForm class)
  // runs the userSelectAnswer function (will check to see if the user submitted the correct answer)
  
  
  function restartQuiz () {
    $('main').on('click', '.restartButton', function (event) {
      location.reload();


      // $('.questionAnswerForm').remove();
      // $('.start-quiz').css('display', 'block');


      // questionNumber = 1;
      // score = 0;
      // $('.questionNumber').text(1);
      // $('.score').text(0);
      // createQuiz();
    });
  }
  // reloads page
  

  function createQuiz () {
    startQuiz();
    renderQuestion();
    userSelectAnswer();
    renderNextQuestion();
  }
  // a single function to run 4 other page functions
  
  $(createQuiz);
  // on page load, runs function createQuiz