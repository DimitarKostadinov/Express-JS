const storage=require('./storage/db');
const fs=require('fs');
const info=('info.json');

//  storage.put('second','secondValue');
//  storage.put('first','firstValue');
//  storage.put('third','thirdValue');
//  storage.put('delete','deleteThisValue');
// // test.put('Laptop','6000');
// console.log(storage.get('first'));
// console.log(storage.getAll());
// storage.delete('second');
// storage.update('first','updatedFirst');
// storage.save();
// storage.clear();
// console.log('Reading....');
// storage.load();
// console.log(storage.getAll());
let date={
    'Test2':'success2!',
    'Test3':'success3!'
};
// fs.appendFile(info,JSON.stringify(data),function(err){
//     if(err)
//       console.error(err);
//     console.log('Appended!');
//   });



// fs.readFile(info, function (err, data) {
//     let json = JSON.parse(data);
//     json.push(date);
//     fs.writeFile(info, JSON.stringify(json));
// });



//   function testfunc(){
      
//   for (var key in info) {
      
//     //   if (key=="moviePoster") {
          
//           console.log(info[key]);   
//     //   }
      
//   }
//   }

  function keys(){
    let object=Object.keys(info);
    console.log(object);
    // for(let key of object){
    //     if(key=='Test2'){
    //         console.log(info[key]);
    //     }
    // }
  }
//   testfunc();
  //keys();
 
