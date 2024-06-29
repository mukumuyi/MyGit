function hoge (){
    console.log('あいうえお');
    setTimeout(function(){
        console.log('かきくけこ');
    },0);
    console.log('さしすせそ');
}

hoge();