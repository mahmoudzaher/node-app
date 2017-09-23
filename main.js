console.log('starting');
const express =require('express');
const hbs = require('hbs');
const socketIO=require('socket.io');
const http =require('http');
const fs= require('fs');
const port =process.env.PORT || 3000 ;
var new1 =express();
var server =http.createServer(new1);
var io = socketIO(server);

var uploadfile =(name,date)=>{
var files=[];
var file ={name ,date};
var readold =fs.readFileSync('files.json');
files=JSON.parse(readold);
files.push(file);
fs.writeFileSync('files.json',JSON.stringify(files));
res.render('dynamic.hbs');
};
var deletefile =(name)=>{
  var oldfiles=[];
  var  files=[];
  var readold =fs.readFileSync('files.json');
  oldfiles=JSON.parse(readold);
  files=oldfiles.filter((file)=>file.name !== name);
fs.writeFileSync('files.json',JSON.stringify(files));
fs.unlinkSync("./uploads/"+name);
};

io.on('connection', (socket) => {
var files1=[];
var readold1 =fs.readFileSync('files.json');
var filename= "";
var filedata="";
var filedate="";
files1=JSON.parse(readold1);
files1.forEach( function (item)
{
    var x = item.name;
    socket.emit('weblisten',item.name,item.date);
});
socket.on('listenerone',(anything)=>{
  console.log(anything);});
socket.on('upfile',(filenamee)=>{
  fs.writeFile('./uploads/'+ filename, filedata, function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("The file was saved!");
  });
uploadfile(filenamee,filedate);

});
socket.on('deleteit',(filenamee)=>{
deletefile(filenamee);

});

socket.on('uploadit',(file,name,date)=>{
  filename=name;
  filedata=file;
  filedate= date;
  // fs.writeFile('./uploads/'+ yy, hh, function(err) {
  //     if(err) {
  //         return console.log(err);
  //     }
  //
  //     console.log("The file was saved!");
  // });

});

});

new1.set('view engine' ,'hbs');
new1.use(express.static(__dirname ));
new1.get('/',(req,res) =>{
res.render('dynamic.hbs');
  //res.send('testwebserver');
});


server.listen(port,()=>{
  console.log('server at '+port);
});
new1.use((req,res,next)=>{
  res.send('page not found');
  next();
});
