const storage=require('./storage/db');

 storage.put('second','secondValue');
 storage.put('first','firstValue');
 storage.put('third','thirdValue');
 storage.put('delete','deleteThisValue');
// test.put('Laptop','6000');
console.log(storage.get('first'));
console.log(storage.getAll());
storage.delete('second');
storage.update('first','updatedFirst');
storage.save();
storage.clear();
console.log('Reading....');
storage.load();
console.log(storage.getAll());
