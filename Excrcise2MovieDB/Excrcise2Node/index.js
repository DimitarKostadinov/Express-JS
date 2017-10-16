const http = require('http');
const url=require('url');

const handlers=require('./handlers');
const port=1111;

http.createServer((req,res)=>{
req.pathname=url.parse(req.url).pathname;

for(let handler of handlers){
    let response=handler(req,res);
    if(response!==true){
        break;
    }
}

}).listen(port);

console.log('Im on port'+port);