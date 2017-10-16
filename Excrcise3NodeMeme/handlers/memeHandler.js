const fs = require('fs');
const db = require('./../config/dataBase');
const qs = require('querystring');
const url = require('url');
const shortid = require('shortid');
const formidable = require('formidable');


const viewAllPath = ('./views/viewAll.html');
const viewAddPath = ('./views/addMeme.html');
const viewDetails = ('./views/details.html');

let memeGenerator=(id,title,memeSrc,description,privacy)=>{
 return {
    id: id,
    title: title,
    memeSrc: memeSrc,
    description: description,
    privacy: privacy,
    dateStamp: Date.now()
  };

};

let defaultResponse = (res, data) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  res.end(data)
}

let viewAll = (req, res) => {
  let memes = db.getDb();

  memes = memes.sort((a, b) => {
    return b.dateStamp - a.dateStamp;
  }).filter((currentMeme) => {
    return currentMeme.privacy === 'on';
  });
  fs.readFile(viewAllPath, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    let memeString = '';
    for (let meme of memes) {
      memeString += `<div class="meme">
      <a href="/getDetails?id=${meme.id}">
      <img class="memePoster" src="${meme.memeSrc}"/>          
      </div>`;

    }
    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', memeString);
    defaultResponse(res, data);
  });
};

let viewAddMeme = (req, res) => {
  fs.readFile(viewAddPath, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    defaultResponse(res, data);
  })
};

let addMeme = (req, res) => {
  let form = new formidable.IncomingForm();
  let dbLength = Math.ceil(db.getDb().length / 10);
  let fileName = shortid.generate();
  let memePath = `./public/memeStorage/${dbLength}/${fileName}.jpg`;

  form
    .on('error', err => {
      console.log(err)
    })
    .on('fileBegin', (name, file) => {
      
      file.path = memePath;
     
      fs.access(`./public/memeStorage/${dbLength}`, err => {
        if (err) {
          console.log(err)
          fs.mkdirSync(`./public/memeStorage/${dbLength}`);
        }
        
      })
    })


  form.parse(req, function (err, fields, files) {
    let id=shortid.generate();
    let createdMeme=memeGenerator(id,fields.memeTitle,memePath,fields.memeDescription,fields.status);
    console.log(createdMeme);
    db.add(createdMeme);
    db.save().then(()=>{
      viewAddMeme(req,res);
      
    });
  });
  


  return;
};
let getDetails = (req, res) => {
  let targetedMemeId = qs.parse(url.parse(req.url).query).id;

  let targetedMeme = db.getDb().find((searched) => {
    return searched.id === targetedMemeId;
  });
  fs.readFile(viewDetails, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    let replace = `<div class="content">
   <img src="${targetedMeme.memeSrc}" alt=""/>
   <h3>Title  ${targetedMeme.title}</h3>
   <p> ${targetedMeme.description}</p>
   <button><a href="${targetedMeme.memeSrc}" download >Download Meme</a></button>
   </div>`
    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', replace)
    defaultResponse(res, data);
  })
};



module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    viewAll(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    viewAddMeme(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMeme(req, res)
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    getDetails(req, res)
  } else {
    return true
  }
}
