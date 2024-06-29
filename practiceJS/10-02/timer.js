let result = document.querySelector('#result');
let timer = window.setTimeout(
    function () {
        result.textContent = (new Date()).toLocaleTimeString();
    },5000);

document.querySelector('#btn').addEventListener('click',function(){
    window.clearInterval(timer);
},false);