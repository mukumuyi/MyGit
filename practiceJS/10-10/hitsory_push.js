let count = 0;
let result = document.querySelector('#result');

document.querySelector('#btn').addEventListener('click',function () {
    result.textContent= ++count;
    history.pushState(count,'',`/js/chap07/count/${count}`);
});

window.addEventListener('popstate',function(e) {
    count = e.state;
    result.textContent=count;
});