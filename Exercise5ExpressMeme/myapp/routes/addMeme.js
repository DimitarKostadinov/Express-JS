var express = require('express');
var router = express.Router();


const Genre=require('./../models/GenreSchema')

const Meme=require('./../models/MemeSchema')

/* GET addMeme listing. */
router.get('/', function(req, res, next) {

  Genre.find({}).then((foundGenres)=>{

    let tags=[]

    for(let genre of foundGenres){
      tags.push(genre.genreName)
    }

    res.render('addMeme',{tags})

  }) 
}).post('/',(req,res,next)=>{
  let file=req.files.meme
  let memeObj=req.body

  let memePath=`./memeStorage/${file.name}`
  memeObj.memePath=memePath

  file.mv(memePath,(err)=>{
    if(err){
      console.log(err)
      return
    }
  })

  Meme.create(memeObj).then(newMeme=>{
    let targetGenre=memeObj.genreSelect

      Genre.findOne({genreName:targetGenre}).then(foundGenre => {
      //console.log(foundGenre);
      foundGenre.memeList.push(newMeme._id)
      //console.log(newMeme._id);
      
      foundGenre.save().then(()=>{
        res.render('addMeme',{status:true})
      })
    })
  })

  

})

module.exports = router;
