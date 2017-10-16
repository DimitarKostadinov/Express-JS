var express = require('express');
var router = express.Router();

const Genre=require('./../models/GenreSchema')
/* GET addGenre listing. */
router.get('/', function(req, res, next) {
  res.render('addGenre')
})
.post('/',(req,res,next)=>{
    let objParams=req.body
    

    Genre.create(objParams).then((obj)=>{
        console.log(obj)

        res.render('addGenre',{status:true})
    })
})

module.exports = router;
