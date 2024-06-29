let storage = localStorage;

storage.setItem('fruit1','リンゴ');
storage.fruit2 = 'みかん';
storage['fruit3'] ='ぶどう';

console.log(storage.getItem('fruit1'));
console.log(storage.fruit2);
console.log(storage['fruit3']);

for (let i=0;i<storage.length;i++){
    let key = storage.key(i);
    console.log(`${key}:${storage[key]}`)
}

let apple = {
    name:'りんご',price:150,made:'青森',
}

storage.setItem('apple',JSON.stringify(apple));
let data = JSON.parse(storage.getItem('apple'));
console.log(data.name);

let storage3 = new MyStorage('JSSample');
storage3.setItem('hoge','ほげ')
console.log(storage3.getItem('hoge'))
storage3.save();