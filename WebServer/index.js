const http=require('http');
const url=require('url');
const fs=require('fs');
const port=1337;

http.createServer((req,res)=>{
   let path=url.parse(req['url']).pathname;
   
   if(path.startsWith('/')){
       fs.readFile('./index.html',(err,data)=>{
           if(err){
               console.log(err);
               return;
           }
           res.writeHead(200,{
               'content-type':'text/html'
           });
           res.write(data);
           res.end();
       });
   }
    
}).listen(port);