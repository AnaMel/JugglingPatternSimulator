// Global function to clear all text input elements
function resetInput() {
    $('input[type=text]').val('');
}

// Create global object responsible for containing visual effects
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


// input value/height data set
const odd = [
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
}
]
even = [
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
}
]


// Actual JS

$(function(){
// Call 
    visualEffects.highlightJBallOnInput();
    visualEffects.blurJBallOnInput();
    $('form').on('submit', function (event) {
        event.preventDefault();
        $('.ball').removeClass('jball-highlight');
        // Extract input values
        let ballOneYtrajectory = $('input[name=ball1]').val();
        let ballTwoYtrajectory = $('input[name=ball2').val();
        let ballThreeYtrajectory = $('input[name=ball3').val();
        // Write extracted values to console
        resetInput();

        // TESTS
        // console.log(ballOneYtrajectory, ballTwoYtrajectory, ballThreeYtrajectory);
        // console.log($(window).width());
        // console.log($('.container').width());
        let containerWidth = $('.container').width();
        let OffsetTest = $('.ball1').offset().left;
        let OffsetBallTwo = $('.ball2').offset().left;
        let OffsetBallThree = $('.ball3').offset().left;


        let middleScreen = $(window).width() * 0.5;





        // Set default X coordinate to 0 for all 3 balls
        let ballOneXtrajectory = 0;
        let ballTwoXtrajectory = 0;
        let ballThreeXtrajectory = 0;

        let ballOne = document.querySelector(".ball1");
        let ballTwo = document.querySelector(".ball2");
        let ballThree = document.querySelector(".ball3");

        // First Ball
        // Validate whether Y coordinate is an odd number
        if (ballOneYtrajectory % 2 == 1) {

            if (OffsetTest < middleScreen) {
                ballOneXtrajectory = $('.container').width() - 250 + "px";
                // ballOneXInitiaPosition = -1 * ($('.container').width() - 250) + "px";
                ballOneXInitiaPosition = 0;
            }
            else if (OffsetTest >= middleScreen) {
                // ballOneXtrajectory = 0;
                ballOneXInitiaPosition = 0;
            }
            // Iterate through array of odd notation values and update Y trajectory with px values for the corresponding notation number
            for (let i = 0; i < odd.length; i++) {
                if (ballOneYtrajectory == odd[i].number) {
                    ballOneYtrajectory = odd[i].height;
                }
            }
            // console.log(`Ball One Y trajectory is ${ballOneYtrajectory}`);
        }
        else if (ballOneYtrajectory % 2 == 0) {
            ballOneXtrajectory = 0;
            for (let i = 0; i < odd.length; i++) {
                if (ballOneYtrajectory == even[i].number) {
                    ballOneYtrajectory = even[i].height;
                }
            }
            console.log(`Ball One Y trajectory is ${ballOneYtrajectory}`);
        }
        else {
            console.log("Such notation does not exist");
        }

            // console.log('First Ball offset is ${OffsetTest}');
        // Create array with coordinates
        const coordinatesObject = [
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
            setTimeout(function timer() {
                let translate3dValue = "translate(" + coordinatesObject[i].x + "," + coordinatesObject[i].y + "px)";
                console.log(`Ball One coordinatesare ${translate3dValue}`);
                ballOne.style.transform = translate3dValue;
            }, i * 2000);
        }
        // SECOND BALL
        if (ballTwoYtrajectory % 2 == 1) {
            if (OffsetBallTwo < middleScreen) {
                // ballTwoXtrajectory = 0;
                ballTwoXInitiaPosition = 0;
            }
            else if (OffsetBallTwo >= middleScreen) {
                ballTwoXtrajectory = -1 * ($('.container').width() - 250) + "px";
                ballTwoXInitiaPosition = 0;
            }
            // Iterate through array of odd notation values and update Ytrajectory with px values for the corresponding notation number
            for (let i = 0; i < odd.length; i++) {
                if (ballTwoYtrajectory == odd[i].number) {
                    ballTwoYtrajectory = odd[i].height;
                }
            }
            // console.log(`Ball Two trajectory ${ballTwoYtrajectory}`);
        }
        else if (ballTwoYtrajectory % 2 == 0) {
            ballTwoXtrajectory = 0;
            for (let i = 0; i < odd.length; i++) {
                if (ballTwoYtrajectory == even[i].number) {
                    ballTwoYtrajectory = even[i].height;
                }
            }
            console.log(`Ball Two trajectory ${ballTwoYtrajectory}`);
        }
        else {
            console.log("Such notation does not exist");
        }

        // Create array with coordinates
        const coordinatesObjectBallTwo = [
            {
                x: ballTwoXtrajectory,
                y: ballTwoYtrajectory
            },
            {
                x: ballTwoXtrajectory,
                y: 0
            },
            {
                x: OffsetBallTwo,
                y: 0
            },
            {
                x: ballTwoXInitiaPosition,
                y: ballTwoYtrajectory
            },
            {
                x: ballTwoXInitiaPosition,
                y: 0
            }
        ]
        // Loop through array for ball1
        setTimeout(function timer() {
            for (let i = 0; i < coordinatesObjectBallTwo.length; i++) {
                setTimeout(function timer() {
                    let translate3dValue = "translate(" + coordinatesObjectBallTwo[i].x + "," + coordinatesObjectBallTwo[i].y + "px)";
                    // console.log(translate3dValue);
                    ballTwo.style.transform = translate3dValue;
                }, i*2000);
            }
        }, 500)

        // END OF THE SECOND BALL

        // SECOND BALL
        if (ballThreeYtrajectory % 2 == 1) {
            if (OffsetBallThree < middleScreen) {
                ballThreeXtrajectory = $('.container').width() - 325 + "px";
                ballThreeXInitiaPosition = 0;
            }
            else if (OffsetBallThree >= middleScreen) {
                // ballThreeXtrajectory = 0;
                ballThreeXInitiaPosition = 0;
            }
            // Iterate through array of odd notation values and update Ytrajectory with px values for the corresponding notation number
            for (let i = 0; i < odd.length; i++) {
                if (ballThreeYtrajectory == odd[i].number) {
                    ballThreeYtrajectory = odd[i].height;
                }
            }
            // console.log(`Ball 3 Y trajectory is ${ballThreeYtrajectory}`);
        }
        else if (ballThreeYtrajectory % 2 == 0) {
            ballThreeXtrajectory = 0;
            for (let i = 0; i < odd.length; i++) {
                if (ballThreeYtrajectory == even[i].number) {
                    ballThreeYtrajectory = even[i].height;
                }
            }
            console.log(`Ball 3 Y trajectory is ${ballThreeYtrajectory}`);
        }
        else {
            console.log("Such notation does not exist");
        }

        // Create array with coordinates
        const coordinatesObjectBallThree = [
            {
                x: ballThreeXtrajectory,
                y: ballThreeYtrajectory
            },
            {
                x: ballThreeXtrajectory,
                y: 0
            },
            {
                x: OffsetBallThree,
                y: 0
            },
            {
                x: ballThreeXInitiaPosition,
                y: ballThreeYtrajectory
            },
            {
                x: ballThreeXInitiaPosition,
                y: 0
            }
        ]
        // Loop through array for ball1
        setTimeout(function timer() {
            for (let i = 0; i < coordinatesObjectBallThree.length; i++) {
                setTimeout(function timer() {
                    let translate3dValue = "translate(" + coordinatesObjectBallThree[i].x + "," + coordinatesObjectBallThree[i].y + "px)";
                    console.log(`Ball 3 coordinates are ${translate3dValue}`);
                    ballThree.style.transform = translate3dValue;
                }, i * 2000);
            }
        }, 1000)

    });
});