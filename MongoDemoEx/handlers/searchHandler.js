const fs = require('fs')
const Tag = require('./../models/TagSchema')

let displayHtml = (res, images) => {
  fs.readFile('./views/results.html', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    let resultStr = '';
    for (let image of images) {
      resultStr += `<fieldset id => <legend>${image.imageTitle}:</legend> 
               <img src="${image.imageUrl}">
               </img><p>${image.description}<p/>
               <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete
               </button> 
               </fieldset>`;
    }

    data = data.toString()
      .replace("<div class='replaceMe'></div>", resultStr);

    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.write(data);
    res.end();

  });
}

module.exports = (req, res) => {
  if (req.pathname === '/search') {
    let searchTagName = req.pathquery.tagName;
    let afterDate = req.pathquery.afterDate
    let beforeDate = req.pathquery.beforeDate
    let minDate = new Date(beforeDate);
    let maxDate = new Date(afterDate);
    if (searchTagName !== "Write tags separted by ,") {
      Tag.find({ tagName: `${searchTagName}` }).populate('images').then((data) => {

        let images = []

        for (let tag of data) {
          //console.log(tag);
          for (let elem of tag.images) {
            //console.log(elem)
            // images.push(elem.imageUrl)
            images.push(elem);
            //console.log(images);
          }
        }
        let uniqueArray = images.filter(function (elem, pos) {
          return images.indexOf(elem) == pos;
        })
        uniqueArray.sort((a, b) => {
          return a.dataC < b.dataC
        })
        fs.readFile('./views/results.html', (err, html) => {
          if (err) {
            console.log(err)
            return
          }
          res.writeHead(200, {
            'Content-Type': 'text/html'
          })
          let resultString = ''
          for (let singleImage of uniqueArray) {
            resultString += `<fieldset id => <legend>${singleImage.imageTitle}:</legend> 
           <img src="${singleImage.imageUrl}">
           </img><p>${singleImage.description}<p/>
           <button onclick='location.href="/delete?id=${singleImage._id}"'class='deleteBtn'>Delete
           </button> 
           </fieldset>`


          }
          res.end(html.toString().replace("<div class='replaceMe'></div>", resultString))
        })
      }
      )
    } else if (searchTagName === "Write tags separted by ,") {


      Tag.find({}).populate('images').then((data) => {

        let images = []

        for (let tag of data) {
          for (let elem of tag.images) {
            //console.log(elem)
            // images.push(elem.imageUrl)
            images.push(elem);
            //console.log(images);
          }
        }

        let uniqueArray = images.filter(function (elem, pos) {
          return images.indexOf(elem) == pos;
        })
        uniqueArray.sort((a, b) => {
          return a.dataC < b.dataC
        })
        //  console.log(uniqueArray);

        fs.readFile('./views/results.html', (err, html) => {
          if (err) {
            console.log(err)
            return
          }
          res.writeHead(200, {
            'Content-Type': 'text/html'
          })
          let resultString = ''
          for (let singleImage of uniqueArray) {
            resultString += `<fieldset id => <legend>${singleImage.imageTitle}:</legend> 
         <img src="${singleImage.imageUrl}">
         </img><p>${singleImage.description}<p/>
         <button onclick='location.href="/delete?id=${singleImage._id}"'class='deleteBtn'>Delete
         </button> 
         </fieldset>`


          }
          res.end(html.toString().replace("<div class='replaceMe'></div>", resultString))
        })
      })
    }else if (searchTagName !== "Write tags separted by ," && beforeDate && !afterDate) {
      Tag.findOne({ tagName: tagInput }).then((tag) => {
        
        let tagId = tag._id.toString();
        Image
          .find({ tags: tagId })
          .sort({ date: -1 })
          .limit(limit)
          .then((images) => {
            fixDate(images);
            images = images.filter(d => d.date < minDate);
            displayHtml(res, images);
          });
      }).catch((err) => {
        console.log(err);
        return;
      });
    }
    else if (tagInput !== "Write tags separted by ," && !beforeDate && !afterDate) {
      Tag.findOne({ tagName: tagInput }).then((tag) => {
        noFoundTags(res, tag);
        let tagId = tag._id.toString();
        Image
        .find({ tags: tagId })
        .sort({ date: -1 })
        .then((images) => {
          displayHtml(res, images);
        });
      }).catch((err) => {
        console.log(err);
        return;
      });
    }
  } else {
    return true
  }
}
