// Global function to clear all text input elements
function resetInput() {
    $('input[type=text]').val('');
}

function init() {

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
    height: -500
},
{
    number: 7,
    height: -750
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
    height: -500
},
{
    number: 6,
    height: -750
}]

// Extract input values
// trajectories.extractHeight = function() {
//     trajectories.ballOneYtrajectory = $('input[name=ball1]').val();
//     trajectories.ballTwoYtrajectory = $('input[name=ball2').val();
//     trajectories.ballThreeYtrajectory = $('input[name=ball3').val();
//     return ballOneYtrajectory, ballTwoYtrajectory, ballThreeYtrajectory;
// };
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

// Based on provided site-swap value
// Identify whether a juglling ball is expected to change its vertical
// And identify height of each throw
trajectories.calculateCoordinates = function() {
    ballOneYtrajectory = $('input[name=ball1]').val();
    console.log(`here is the number ${ballOneYtrajectory}`);
    ballTwoYtrajectory = $('input[name=ball2').val();
    ballThreeYtrajectory = $('input[name=ball3').val();
    if (ballOneYtrajectory % 2 == 1) {
        if (trajectories.OffsetTest < trajectories.middleScreen) {
            ballOneXtrajectory = $('.container').width() - 250 + "px";
            ballOneXInitiaPosition = 0;
        }
        else if (trajectories.OffsetTest >= middleScreen) {
            ballOneXInitiaPosition = 0;
        }
        // Iterate through array of odd notation values and update Y trajectory with px values for the corresponding notation number
        for (let i = 0; i < trajectories.odd.length; i++) {
            if (ballOneYtrajectory == trajectories.odd[i].number) {
                ballOneYtrajectory = trajectories.odd[i].height;
            }
        }
    }
    else if (ballOneYtrajectory % 2 == 0) {
        ballOneXtrajectory = 0;
        ballOneXInitiaPosition = 0;
        for (let i = 0; i < trajectories.even.length; i++) {
            if (ballOneYtrajectory == trajectories.even[i].number) {
                ballOneYtrajectory = trajectories.even[i].height;
            }
        }
        console.log(`Ball One Y trajectory is ${ballOneYtrajectory}`);
    }
    else {
        console.log("Such notation does not exist");
    }

let coordinatesObject = [
    {
        x: ballOneXtrajectory,
        y: ballOneYtrajectory
    },
    {
        x: ballOneXtrajectory,
        y: 0
    },
    {
        x: ballOneXInitiaPosition,
        y: ballOneYtrajectory
    },
    {
        x: ballOneXInitiaPosition,
        y: 0
    }
]

// Loop through array for ball1
    for (let i = 0; i < coordinatesObject.length; i++) {
        // console.time('BallOne');
        setTimeout(function timer() {
            console.time('BallOne');
            let translate3dValue = "translate(" + coordinatesObject[i].x + "," + coordinatesObject[i].y + "px)";
            console.log(`Ball One coordinatesare ${translate3dValue}`);
            trajectories.ballOne.style.transform = translate3dValue;
            console.timeEnd('BallOne');
        }, i * 2000);
        // console.timeEnd('BallOne');
    }
}

// When document is ready...
$(function(){
    // Call a function to highlight selected ball
    visualEffects.highlightJBallOnInput();
    // Call function to blur 
    visualEffects.blurJBallOnInput();
    // When form is submitted...
    $('form').on('submit', function (event) {
        //Prevent page from reload after form is submitted 
        event.preventDefault();
        // Clear input fields
        trajectories.calculateCoordinates();
        resetInput();
        // SECOND BALL
        // if (ballTwoYtrajectory % 2 == 1) {
        //     if (OffsetBallTwo < middleScreen) {
        //         // ballTwoXtrajectory = 0;
        //         ballTwoXInitiaPosition = 0;
        //     }
        //     else if (OffsetBallTwo >= middleScreen) {
        //         ballTwoXtrajectory = -1 * ($('.container').width() - 250) + "px";
        //         ballTwoXInitiaPosition = 0;
        //     }
        //     // Iterate through array of odd notation values and update Ytrajectory with px values for the corresponding notation number
        //     for (let i = 0; i < odd.length; i++) {
        //         if (ballTwoYtrajectory == odd[i].number) {
        //             ballTwoYtrajectory = odd[i].height;
        //         }
        //     }
        //     // console.log(`Ball Two trajectory ${ballTwoYtrajectory}`);
        // }
        // else if (ballTwoYtrajectory % 2 == 0) {
        //     ballTwoXtrajectory = 0;
        //     ballTwoXInitiaPosition = 0;
        //     for (let i = 0; i < odd.length; i++) {
        //         if (ballTwoYtrajectory == even[i].number) {
        //             ballTwoYtrajectory = even[i].height;
        //         }
        //     }
        //     console.log(`Ball Two trajectory ${ballTwoYtrajectory}`);
        // }
        // else {
        //     console.log("Such notation does not exist");
        // }

        // // Create array with coordinates
        // const coordinatesObjectBallTwo = [
        //     {
        //         x: ballTwoXtrajectory,
        //         y: ballTwoYtrajectory
        //     },
        //     {
        //         x: ballTwoXtrajectory,
        //         y: 0
        //     },
        //     {
        //         x: OffsetBallTwo,
        //         y: 0
        //     },
        //     {
        //         x: ballTwoXInitiaPosition,
        //         y: ballTwoYtrajectory
        //     },
        //     {
        //         x: ballTwoXInitiaPosition,
        //         y: 0
        //     }
        // ]
        // // Loop through array for ball1
        // setTimeout(function timer() {
        //     for (let i = 0; i < coordinatesObjectBallTwo.length; i++) {
        //         setTimeout(function timer() {
        //             let translate3dValue = "translate(" + coordinatesObjectBallTwo[i].x + "," + coordinatesObjectBallTwo[i].y + "px)";
        //             // console.log(translate3dValue);
        //             ballTwo.style.transform = translate3dValue;
        //         }, i*2000);
        //     }
        // }, 500)

        // // END OF THE SECOND BALL

        // // SECOND BALL
        // if (ballThreeYtrajectory % 2 == 1) {
        //     if (OffsetBallThree < middleScreen) {
        //         ballThreeXtrajectory = $('.container').width() - 325 + "px";
        //         ballThreeXInitiaPosition = 0;
        //     }
        //     else if (OffsetBallThree >= middleScreen) {
        //         // ballThreeXtrajectory = 0;
        //         ballThreeXInitiaPosition = 0;
        //     }
        //     // Iterate through array of odd notation values and update Ytrajectory with px values for the corresponding notation number
        //     for (let i = 0; i < odd.length; i++) {
        //         if (ballThreeYtrajectory == odd[i].number) {
        //             ballThreeYtrajectory = odd[i].height;
        //         }
        //     }
        //     // console.log(`Ball 3 Y trajectory is ${ballThreeYtrajectory}`);
        // }
        // else if (ballThreeYtrajectory % 2 == 0) {
        //     ballThreeXtrajectory = 0;
        //     ballThreeXInitiaPosition = 0;
        //     for (let i = 0; i < odd.length; i++) {
        //         if (ballThreeYtrajectory == even[i].number) {
        //             ballThreeYtrajectory = even[i].height;
        //         }
        //     }
        //     console.log(`Ball 3 Y trajectory is ${ballThreeYtrajectory}`);
        // }
        // else {
        //     console.log("Such notation does not exist");
        // }

        // // Create array with coordinates
        // const coordinatesObjectBallThree = [
        //     {
        //         x: ballThreeXtrajectory,
        //         y: ballThreeYtrajectory
        //     },
        //     {
        //         x: ballThreeXtrajectory,
        //         y: 0
        //     },
        //     {
        //         x: OffsetBallThree,
        //         y: 0
        //     },
        //     {
        //         x: ballThreeXInitiaPosition,
        //         y: ballThreeYtrajectory
        //     },
        //     {
        //         x: ballThreeXInitiaPosition,
        //         y: 0
        //     }
        // ]
        // // Loop through array for ball1
        // setTimeout(function timer() {
        //     for (let i = 0; i < coordinatesObjectBallThree.length; i++) {
        //         setTimeout(function timer() {
        //             let translate3dValue = "translate(" + coordinatesObjectBallThree[i].x + "," + coordinatesObjectBallThree[i].y + "px)";
        //             console.log(`Ball 3 coordinates are ${translate3dValue}`);
        //             ballThree.style.transform = translate3dValue;
        //         }, i * 2000);
        //     }
        // }, 1000)

    });
});