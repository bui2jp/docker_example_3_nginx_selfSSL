'use strict';

const express = require('express');
var fs = require('fs');

// Constants
const PORT = 8081;
const HOST = '0.0.0.0';

// App
const app = express();
// CORSを許可する
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/api/image/:index', (req, res) => {
  console.log('__dirname' + __dirname)
  let index = req.params.index
  console.log('index:' + req.params.index)

  let random_num = getRandomInt(4)
  
  let data = null
  if (index == 0) {
    data = fs.readFileSync(__dirname + '/sample.png','base64')  
  }else if  (index == 2){
    data = fs.readFileSync(__dirname + '/sample2.png','base64')  
  }else if  (index == 3){
    data = fs.readFileSync(__dirname + '/sample3.png','base64')      
  }else{
    data = fs.readFileSync(__dirname + '/sample4.png','base64')  
  }

  res.send(data);
  console.log('finish')
});

// app.get('/api/image2/:index', (req, res) => {
//     //randam
//     let number = Math.random()
//     res.send('Hello World return image :' + number);
//   });

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
