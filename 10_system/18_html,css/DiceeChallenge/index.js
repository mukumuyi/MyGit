var randomNumber = Math.floor(Math.random() * 6) + 1
var randomNumber2 = Math.floor(Math.random() * 6) + 1

// console.log("./images/dice" + randomNumber + ".png")
if (randomNumber > randomNumber2) {
    msg = "Play1 Win"
} else if(randomNumber < randomNumber2) {
    msg = "Play2 Win"
} else {
    msg = "draw"
}

document.querySelector(".img1").src="./images/dice" + randomNumber + ".png"
document.querySelector(".img2").src="./images/dice" + randomNumber2 + ".png"
document.querySelector("h1").innerHTML = msg