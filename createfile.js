var fs = require("fs");
var random = require('generate-random-data');
//writing 100 random entries in humidity.txt
var writeHumidityStream = fs.createWriteStream("humidity.txt");
for (var i = 1; i<=100;i++) {
    writeHumidityStream.write("Line"+""+i+":"+"  "+random.int(40,100) +"%"+"\n");
}
writeHumidityStream.end();

//writing 100 random entries in acceleration.txt
var writeAccelerationStream = fs.createWriteStream("acceleration.txt");
for (var i = 1; i<=100;i++) {
    writeAccelerationStream.write("Line"+""+i+":"+"  "+random.int(1,100) +"\n");
}
writeAccelerationStream.end();

//writing 100 random entries in temparature.txt
var writeTempuratureStream = fs.createWriteStream("tempurature.txt");
for (var i = 1; i<=100;i++) {
    writeTempuratureStream.write("Line"+""+i+":"+"  "+random.int(30,45) + "" + "C"+"\n");
}
writeTempuratureStream.end();


