var express = require('express');
var router = express.Router();

// 
let Meme=require('./../models/MemeSchema');
// 
/* GET viewAll listing. */
router.get('/', function(req, res, next) {
    Meme.find({}).then((memes)=>{
        res.render('viewAll',{memes:memes})
    })
    
});

module.exports = router;
