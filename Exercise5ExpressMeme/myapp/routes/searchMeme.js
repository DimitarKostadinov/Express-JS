var express = require('express');
var router = express.Router();

const Genre=require('./../models/GenreSchema')

const Meme=require('./../models/MemeSchema')


function getAllMemes(res) {
  Meme.find({}).then((foundMemes) => {
      res.render('viewAll', {memes: foundMemes});
  })
}
function getMemesByTitle(title, res) {
  Meme.find({memeName: title}).then( (foundMemes) =>{
      res.render('viewAll', {memes: foundMemes});
  })
}

function getMemesByGenre(genre, res) {
  Meme.find({genreSelect: genre}).then( (foundMemes) =>{
      res.render('viewAll', {memes: foundMemes});
  })
}

/* GET searchMEME listing. */
router.get('/', function(req, res, next) {
  Genre.find({}).then((foundGenres)=>{
        let tags=[]
    
        for(let genre of foundGenres){
          tags.push(genre.genreName)
        }
    
        res.render('search',{tags})
    
      }) 
}).post('/', function (req, res, next) {
  let sTitle = req.body.memeTitle;
  // console.log(sTitle);
  let sGenre = req.body.genreSelect;
  // console.log(sGenre)
  if(sTitle === '' && sGenre === 'ViewAll'){
      getAllMemes(res);
  }else if (sTitle !== '' && sGenre === 'ViewAll'){
      getMemesByTitle(sTitle, res);
  }else if(sTitle === '' && sGenre !== 'ViewAll') {
    getMemesByGenre(sGenre,res)
  }
  
});

module.exports = router;
