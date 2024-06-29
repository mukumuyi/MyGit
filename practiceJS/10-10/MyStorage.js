class MyStorage {
    #app;
    #storage = localStorage;
    #data;

    constructor(app){
        this.#app=app;
        this.#data = JSON.parse(this.#storage[this.#app] || '{}')
    }

    getItem(key){
        return this.#data[key];
    }

    setItem(key,value){
        this.#data[key] = value;
    }

    save() {
        this.#storage[this.#app] = JSON.stringify(this.#data);
    }

}