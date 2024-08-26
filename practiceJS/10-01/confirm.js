document.querySelector('#fm').addEventListener('submit',function(e) {
    if(!window.confirm('ページを送信してもよいですか？')){
        e.preventDefault();
    }
},false)