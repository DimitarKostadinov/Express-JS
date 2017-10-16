const fs = require('fs');
const qs = require('querystring');
const db = require('./../config/dataBase');

let detailsMovie=(movie)=>{
    return `<div class="content">
    <img src="${movie['moviePoster']}" alt=""/>
    <h3>Title ${movie['movieTitle']}</h3>
    <h3>Year ${movie['movieYear']}</h3>
    <p> ${movie['movieDescription']}</p>
   </div>
   `;
};

module.exports = (req, res) => {
if(req.pathname.startsWith('/movies/details')){
    let index=req.pathname.substring(req.pathname.lastIndexOf('/') + 1);
    let movie=db.movies.getAll()[index];
    for(let key in movie){
        let res=qs.parse(movie[key]);
        for(let str in res){
            movie[key]=str;
            console.log('STR:');
            console.log(str);
            
        }
    }
    fs.readFile('./views/details.html','utf8',(err,data)=>{
        if(err){
            console.log(err);
            return;
        }
        res.writeHead(200,{
            'Content-Type':'text/html'
        });
        data = data.replace('<div id="replaceMe">{{replaceMe}}</div>', detailsMovie(movie));
        res.write(data);
        res.end();
    });
}else{
    return true;
}
};