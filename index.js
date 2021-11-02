
$(document).ready(function() {
    var levelCounter = 1;
    var levelDispaly = "Level " + levelCounter;
    var gameLevel= new Array("red", "blue", "green", "yellow");
    var gamePattern = [];
    var userClickedPattern = [];
    // Initialize the game
    $(document).keypress(function(event){
        if(event.key === "a"){
        // start the game
            nextSequence();            
        }
    });
    
 function nextSequence(){
    var randomNum =  Math.floor(Math.random() * 4 );
    gamePattern.push(gameLevel[randomNum]); 
    
    for(var i = 0; i < gamePattern.length; i++)
    {  
         playItOut(i);
    }    
  
    levelCounter++; 
    $("h1").text("Level "+(levelCounter-1));
    console.log(gamePattern);
}
 
$(".btn").click(function(){
    var userChosenColor= $(this).attr("id");
    
    userClickedPattern.push(userChosenColor);
    
    console.log(userClickedPattern.length);
    playSound(userChosenColor);
    
    checkAnswer(userClickedPattern.length);

    
});
 
 
function playSound(userChosenColor)
{
    switch(userChosenColor){
        case "red":
            var audio2 = new Audio('sounds/red.mp3');       
            audio2.play();
            animatePress(userChosenColor);
            break;
        case "blue":
            var audio = new Audio('sounds/blue.mp3');
            audio.play();
            animatePress(userChosenColor);
            break;
        case "green":
            var audio3 = new Audio('sounds/green.mp3');
            audio3.play();
            animatePress(userChosenColor);
            break;
        case "yellow":
            var audio4 = new Audio('sounds/yellow.mp3');
            audio4.play();
            animatePress(userChosenColor);
            break;
                 
        default:
                console.log("error");
            break;
        }
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 200);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel-1] === userClickedPattern[currentLevel-1]){
        console.log("success");
        if(currentLevel === gamePattern.length){
            setTimeout(function(){
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    }
    else{
        var audio5 = new Audio('sounds/wrong.mp3');
         audio5.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press A to Restart");
        startOver();
    }
} 

function playItOut(i){
    (function(index) {
        setTimeout(function() { animatePress(gamePattern[i]);
            playSound(gamePattern[i]);
         }, i * 1000);
    })(i);
}

});
