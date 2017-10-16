const mongoose = require('mongoose')
let connectionStr = 'mongodb://localhost:27017/unidb'
mongoose.connect(connectionStr,(err)=>{
    if(err){
        console.log(err)
        return
    }
    let Student = mongoose.model('Student',{
        firstName:{type:String,required:true},
        lastName:{type:String,required:true},
        facultyNumber:{type:String,required:true,unique:true},
        age:{type:Number}
    })

    // let firstStudent= new Student({firstName:'Dimitar',lastName:'Dimitrov',
    // facultyNumber:'560',age:22})
    // firstStudent.save()
    // .then((sInfo) => console.log(sInfo))
    // .catch((err) => console.warn(err))

    // Student
    // .find({firstName: 'Dimitar'})
    // .exec()
    // .then(students => console.log(students))

    // Student
    // .findById('59da0206ab0cfa16c8203c06')
    // .exec()
    // .then(student => { student.firstName = 'Pesho'
    // student.save()
    // .then((studentFirstName)=>console.log(studentFirstName.firstName))
    // .catch((err)=>console.log(err))
    // })

    // Student.findByIdAndRemove('59da02c97653ce0594e994bb')
    // .exec()
    
    Student.find({}).where('age').gt(7).lt(50)
    .exec()
    .then(students =>{
        for(let student of students){
            console.log(student.firstName);
        }
    });
})