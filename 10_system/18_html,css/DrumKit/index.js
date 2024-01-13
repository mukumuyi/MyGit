
for (var i =0; i < document.querySelectorAll(".drum").length; i++){
    document.querySelectorAll(".drum")[i].addEventListener("click",function (){
        var bottonInnerHtml = this.innerHTML;

            switch(bottonInnerHtml){
                case "w":
                    var audio = new Audio("./sounds/tom-1.mp3")
                    audio.play()
                    break;
                case "a":
                    var audio = new Audio("./sounds/tom-2.mp3")
                    audio.play()
                    break;
                case "s":
                    var audio = new Audio("./sounds/tom-3.mp3")
                    audio.play()
                    break;
                case "d":
                    var audio = new Audio("./sounds/tom-4.mp3")
                    audio.play()
                    break;
                case "j":
                    var audio = new Audio("./sounds/snare.mp3")
                    audio.play()
                    break;
                case "k":
                    var audio = new Audio("./sounds/crash.mp3")
                    audio.play()
                    break;
                case "l":
                    var audio = new Audio("./sounds/kick-bass.mp3")
                    audio.play()
                    break;
            }
            buttomAnimation(bottonInnerHtml)
    })
}
;

document.addEventListener("keydown",function(event){
    // alert(event.key +  " key down");
    var downKey = event.key;

            switch(downKey){
                case "w":
                    var audio = new Audio("./sounds/tom-1.mp3")
                    audio.play()
                    break;
                case "a":
                    var audio = new Audio("./sounds/tom-2.mp3")
                    audio.play()
                    break;
                case "s":
                    var audio = new Audio("./sounds/tom-3.mp3")
                    audio.play()
                    break;
                case "d":
                    var audio = new Audio("./sounds/tom-4.mp3")
                    audio.play()
                    break;
                case "j":
                    var audio = new Audio("./sounds/snare.mp3")
                    audio.play()
                    break;
                case "k":
                    var audio = new Audio("./sounds/crash.mp3")
                    audio.play()
                    break;
                case "l":
                    var audio = new Audio("./sounds/kick-bass.mp3")
                    audio.play()
                    break;
            }
            buttomAnimation(downKey)

})
;

function buttomAnimation(key){
    var activeBottom = document.querySelector("." + key);
    activeBottom.classList.add("pressed");
    setTimeout(function (){
        activeBottom.classList.remove("pressed")
    },100);


}