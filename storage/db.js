const fs = require('fs');
let storage = {};

let put = (key, value) => {
    if (typeof key !== 'string') {

        console.log("The key must be string!!!");
        return;
    }
    if (storage.hasOwnProperty(key)) {
        console.log('Key already exists!')
        return;
    }
    storage[key] = value;
};
let get = (key) => {
    if (typeof key !== 'string') {
        console.log("The key must be string!!!");
        return;
    }
    if (!storage.hasOwnProperty(key)) {
        console.log('The key does not exist!!!')
        return;
    }
    return storage[key];
};

let getAll = () => {
    if (Object.values(storage).length === 0) {
        console.log('There are no items in the storage');
        return;
    }

    return storage;

};

let update = (key, newValue) => {
    if (typeof key !== 'string') {
        console.log("The key must be string!!!");
        return;
    }
    if (!storage.hasOwnProperty(key)) {
        console.log('The key does not exist!!!')
        return;
    }
    storage[key] = newValue;
};

let deleteItem = (key) => {
    if (typeof key !== 'string') {
        console.log("The key must be string!!!");
        return;
    }
    if (!storage.hasOwnProperty(key)) {
        console.log('The key does not exist!!!')
        return;
    }
    delete storage[key];
};

let clear = () => {
    storage = {};
};
let save = () => {
    fs.writeFileSync('./storage.json', JSON.stringify(storage), 'utf8');
};

let load = () => {
    try {
        storage = JSON.parse(fs.readFileSync('./storage.json', 'utf8'));
    } catch (err) {
        console.log(err);
    } finally {

    }
};

module.exports = {
    put: put,
    get: get,
    getAll: getAll,
    update: update,
    delete: deleteItem,
    clear: clear,
    save: save,
    load: load
};