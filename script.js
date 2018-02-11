// Global function to clear all text input elements
function resetInput() {
    $('input[type=text]').val('');
}

function animate() {
    $('.dynamicElement').remove();
    ballOneYtrajectory = $('input[name=ball1]').val();
    ballTwoYtrajectory = $('input[name=ball2]').val();
    ballThreeYtrajectory = $('input[name=ball3]').val();
    numIterations = $('input[name=numIteration]').val() - 1;

    let contentToPrepend = (`<p class="dynamicElement">${ballOneYtrajectory}${ballTwoYtrajectory}${ballThreeYtrajectory}</p>`);
    $('contentToPrepend').addClass('dynamicElement');
    $('.container').prepend(`${contentToPrepend}`);
}
// Create global object responsible for containing visual effects functionality
const visualEffects = {};

// Create local method
// Allows to highlight a div with class="ball" associated thorough data() with a focused text input
visualEffects.highlightJBallOnInput = function() {
    $('input').on('focus', function(){
        let ball = $(this).data('ball');
        $(`.ball[data-ball=${ball}]`).addClass('jball-highlight');
    });
}

// Create local method
// Allows to blur a div with class="ball" associated thorough data() with a focused text 
visualEffects.blurJBallOnInput = function () {
    $('input').on('blur', function () {
        let ball = $(this).data('ball');
        // console.log(ball);
        $(`.ball[data-ball=${ball}]`).removeClass('jball-highlight');
    });
}

// Validate inputed values
// 1. All fields are mandatory && 2. All values are numbers
const inputValidation = {};
inputValidation.validateInputValues = function() {
    if ($('input[name=ball1]').val().length == 0) {
        alert("blabla");
    }
}

// Create global object responsible for containing trajectories calculation functionality 
const trajectories = {};

// input value/height data set
trajectories.odd = [
{
    number: 1,
    height: 0
},
{
    number: 3,
    height: -250
},
{
    number: 5,
    height: -300
},
{
    number: 7,
    height: -350
}]

trajectories.even = [
{
    number: 0,
    height: 0
},
{
    number: 2,
    height: -250
},
{
    number: 4,
    height: -300
},
{
    number: 6,
    height: -350
}]


// Identify current position of each ball and middle of the screen
// To be used to identify direction of a juggling ball (lift/ right)
trajectories.OffsetTest = $('.ball1').offset().left;
trajectories.OffsetBallTwo = $('.ball2').offset().left;
trajectories.OffsetBallThree = $('.ball3').offset().left;
trajectories.middleScreen = $(window).width() * 0.5;
// Default X trajectory of each ball to 0
trajectories.ballOneXtrajectory = 0;
trajectories.ballTwoXtrajectory = 0;
trajectories.ballThreeXtrajectory = 0;
// Create a variable for each juggling ball
trajectories.ballOne = document.querySelector(".ball1");
trajectories.ballTwo = document.querySelector(".ball2");
trajectories.ballThree = document.querySelector(".ball3");
// Retirieve the left/right value of each ball
trajectories.smallGap = $('.ball1').css("left").replace(/[^-\d\.]/g, '') ;
console.log(trajectories.smallGap);
trajectories.largeGap = $('.ball3').css("left").replace(/[^-\d\.]/g, '');
// console.log(trajectories.largeGap);

// Based on provided site-swap value
// Identify whether a juglling ball is expected to change its vertical
// And identify height of each throw
trajectories.calculateCoordinates = function() {
// Retrieve inputted site-swap values
    ballOneYtrajectory = $('input[name=ball1]').val();
    ballTwoYtrajectory = $('input[name=ball2]').val();
    ballThreeYtrajectory = $('input[name=ball3]').val();
    numIterations = $('input[name=numIteration]').val() - 1;

    // let contentToPrepend = (`<p class="dynamicElement">${ballOneYtrajectory}${ballTwoYtrajectory}${ballThreeYtrajectory}</p>`);
    // $('contentToPrepend').addClass('dynamicElement');
    // $('.container').prepend(`${contentToPrepend}`);
    // $('contentToPrepend').addClass('dynamicElement');
    // console.log(`Here you go ... ${contentToPrepend}`);
    // $('.container').prepend(`${ballOneYtrajectory}${ballTwoYtrajectory}${ballThreeYtrajectory}`);
// Create function
// responsible for executing juggling cycle
// by looping through array of coordinates
// accepts array of coordinates and corresponding DOM element (j. ball)
    let juggle = function (array, ballNumber) {
        let ballName = $(ballNumber).data('ball');
        console.log(array);
        for (let j = 0; j <= numIterations; j++) {
            setTimeout(function timer() {
                for (let i = 0; i < array.length; i++) {
                    setTimeout(function timer() {
                        console.time(`${ballName} ball timer`);
                        let translate3dValue = "translate(" + array[i].x + "," + array[i].y + "px)";
                        console.log(`${ballName} coordinatesare ${translate3dValue}`);
                        ballNumber.style.transform = translate3dValue;
                        // Support for Mozzilla
                        ballNumber.style.MozTransform = translate3dValue;
                        console.timeEnd(`${ballName} ball timer`);
                    }, i * 2000);
                }
            }, j * 8000);
        }
    }
// Create function
// responsible for calculating X;Y coordinates for each juggling ball
    let calculateXY = function(inputY, gap, ballOffset, trajectoryX, initialXPosition) {
        if (inputY % 2 == 1) {
            if (ballOffset < trajectories.middleScreen) {
                trajectoryX = ($('.container').width() - (Number(gap) + Number(trajectories.smallGap) + 50)) + "px";
                console.log($('.container').width());
                initialXPosition = 0;
            }
            else if (ballOffset >= trajectories.middleScreen) {
                initialXPosition = 0;
                trajectoryX = -1 * ($('.container').width() - (Number(trajectories.smallGap) * 2 + 50)) + "px";
            }
            // Iterate through array of odd notation values
            // and update Y trajectory with px values for the corresponding notation number
            for (let i = 0; i < trajectories.odd.length; i++) {
                if (inputY == trajectories.odd[i].number) {
                    inputY = trajectories.odd[i].height;
                }
            }
        }
        else if (inputY % 2 == 0) {
            trajectoryX = 0;
            initialXPosition = 0;
            for (let i = 0; i < trajectories.even.length; i++) {
                if (inputY == trajectories.even[i].number) {
                    inputY = trajectories.even[i].height;
                }
            }
        }
        else {
            console.log("Such notation does not exist");
        }
        return [
            {
                x: trajectoryX,
                y: inputY
            },
            {
                x: trajectoryX,
                y: 0
            },
            {
                x: initialXPosition,
                y: inputY
            },
            {
                x: initialXPosition,
                y: 0
            }
        ]
    }

// FIRST BALL
// Calculate height and vertical 
    let coordinatesPositions = calculateXY(ballOneYtrajectory, trajectories.smallGap, trajectories.OffsetTest, trajectories.ballOneXtrajectory, trajectories.ballOneXInitiaPosition);
// Loop through the coordinates array for ball one
    juggle(coordinatesPositions, trajectories.ballOne);

// SECOND BALL
// Calculate height and vertical 
    let coordinatesObjectBallTwo = calculateXY(ballTwoYtrajectory, trajectories.smallGap, trajectories.OffsetBallTwo, trajectories.ballTwoXtrajectory, trajectories.ballTwoXInitiaPosition);
// Loop through the coordinates array for ball two
    setTimeout(function timer() {
        juggle(coordinatesObjectBallTwo, trajectories.ballTwo);
    }, 500) 

// THIRD BALL
// Calculate height and vertical 
    let coordinatesObjectBallThree = calculateXY(ballThreeYtrajectory, trajectories.largeGap, trajectories.OffsetBallThree, trajectories.ballThreeXtrajectory, trajectories.ballThreeXInitiaPosition);
// Loop through array for ball three
    setTimeout(function timer() {
        juggle(coordinatesObjectBallThree, trajectories.ballThree);
    }, 1000) 
}

// When document is ready...
$(function(){
    // init();
    // Call a function to highlight selected ball
    visualEffects.highlightJBallOnInput();
    // Call function to blur 
    visualEffects.blurJBallOnInput();
    // When form is submitted...
    $('form').on('submit', function (event) {
        inputValidation.validateInputValues();
        animate();
        //Prevent page from reload after form is submitted 
        event.preventDefault();
        // Clear input fields
        trajectories.calculateCoordinates();
        resetInput();
    });
});