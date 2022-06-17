
const buttonColors = ['red', 'blue', 'green', 'yellow'];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;

// events
$(document).on('keypress', function(e) {

    if (gamePattern == false) {
        $('#level-title').text('Level ' + level)
        nextSequence()
    }
    console.log(gamePattern);
})

$('.btn').on('click', function () {

    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

})

//  functions

function checkAnswer(currentLevel) {
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('success!');
        if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

        }
    } else {
        $('#level-title').text('Wrong Colour!')
        playSound('wrong')
        setTimeout(function() {
                $('#level-title').text('Game Over!');
                $(document.body).addClass('game-over');
            }, 1000)
        setTimeout(function() {
                $('#level-title').text('Game Over, Press Any Key to Restart!');
                $(document.body).removeClass('game-over');
                startOver()
            }, 3000)
    }
    
    
}

function startOver() {
    level = 0;
    gamePattern= [];
    userClickedPattern = [];
}

function nextSequence() {

    userClickedPattern = []
    level++;
    $('#level-title').text('Level ' + level)
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

function playSound(name) {

    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    
}

function animatePress(currentColor) {

    $('#' + currentColor).addClass("pressed");
    setTimeout(function(){
            $('#' + currentColor).removeClass("pressed")
        }, 100)

}
