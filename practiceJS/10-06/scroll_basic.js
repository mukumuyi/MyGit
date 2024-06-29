document.querySelector('#main').addEventListener('click',function(e) {
    // window.scrollBy(0,window.innerHeight);
    let p = e.target.closest('[id^="chap"')
    if(p){
        let next = `#chap_${Number(p.id.split('_')[1]) + 1}`
        document.querySelector(next)?.scrollIntoView(true);
    }
},false)