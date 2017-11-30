var fs = require("fs");
var events = require('events');
var dt = new Date();
var i=0;
var j=0;
var k=0;
var writeStream = fs.createWriteStream('database2.txt');  
var dataTemp = fs.readFileSync('tempurature.txt');
var temArray = dataTemp.toString().split("\n");
var dataHum = fs.readFileSync('humidity.txt');
var humArray = dataHum.toString().split("\n");
var dataAcc = fs.readFileSync('acceleration.txt');
var accArray = dataAcc.toString().split("\n");
// tempurature
function tempurature() {
    var datacurrent = fs.readFileSync('database2.txt');
    var writerStream = fs.createWriteStream('database2.txt');
    writerStream.write(datacurrent+" "+dt+"Temperature-"+" "+temArray[i]+"\r\n",'UTF8');
    writerStream.end();
    i++;
   console.log('Temperature Inserted After 2 sec.');
}
//humidity
function humidity() {
    var datacurrent = fs.readFileSync('database2.txt');
    var writerStream = fs.createWriteStream('database2.txt');
    writerStream.write(datacurrent+" "+dt+"Humidity-"+"    "+humArray[i]+"\r\n",'UTF8');
    writerStream.end();
    j++;
   console.log('Humidity Inserted After 5 sec.');
}
////acceleration
function acceleretion() {
    var datacurrent = fs.readFileSync('database2.txt');
    var writerStream = fs.createWriteStream('database2.txt');
    writerStream.write(datacurrent+" "+dt+"Acceleration-"+"    "+accArray[i]+"\r\n",'UTF8');
    writerStream.end();
    k++;
   console.log('Acceleretion Inserted After 10 sec.');
}
setInterval(tempurature,2000);
setInterval(humidity,5000);
setInterval(acceleretion,10000);


   




   
