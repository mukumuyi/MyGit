const buttomColors = ["red","blue","green","yellow"]
var gamePattern = []
var userPattern = []
var started = false;
var level = 0

$(window).on("keydown",(event) => {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence()
        started = true
    }
})

$(".btn").on("click",function(){
    var userChosenColor = $(this).attr("id")

    playSound(userChosenColor)    
    animatePress(userChosenColor)

    userPattern.push(userChosenColor)
    console.log("A:" + userPattern)
    
    checkAnswer(userPattern.length-1)

})


function nextSequence(){
    userPattern = []
    level ++
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColor = buttomColors[randomNumber]

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor)   

    gamePattern.push(randomChosenColor)
    console.log("G:" + gamePattern)
    
} 

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        console.log("success")
        if (gamePattern.length === userPattern.length){
            setTimeout(function() {
                nextSequence()
            },1000);
            
        }
    } else {
        console.log("wrong")
        playSound("wrong")
        $("body").addClass("game-over")

        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver()

    }
     
    

}

function playSound(name){
    var sound = new Audio("./sounds/" + name + ".mp3")
    sound.play()
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed")

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

function startOver() {
    gamePattern = []
    started = false;
    level = 0
}

// nextSequence()