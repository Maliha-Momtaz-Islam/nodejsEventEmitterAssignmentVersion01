//module import
var fs = require("fs");
var events = require("events");
var eventEmitter = new events.EventEmitter();
//flag declaration
var flag_temp =0; 
var flag_humidity =0; 
var flag_acceleration =0;
//creating database3.txt to write datas from tempurature.txt,humidity.txt,acceleration.txt
var writeDatabaseStream = fs.createWriteStream('database3.txt');  
//reading data from tempurature.txt and spliting the datas as an array
var tempurature_data = fs.readFileSync('tempurature.txt',"utf-8");
var tempurature_array = tempurature_data.toString().split("\n");
//reading data from humidity.txt and spliting the datas as an array
var humidity_data = fs.readFileSync('humidity.txt',"utf-8");
var humidity_array  = humidity_data.toString().split("\n");
//reading data from acceleration.txt and spliting the datas as an array
var acceleration_data = fs.readFileSync('acceleration.txt',"utf-8");
var acceleration_array = acceleration_data.toString().split("\n");

//synchronous tempurature function to read and write tempurature data from tempurature.txt to database3.txt
var tempurature = function() {
        var tempurature_Interval = setInterval(function temperature_exe(){
            if(flag_temp<100)
            {
            var dt = new Date();
            var utcDate = dt.toUTCString();
    
            var datacurrent = fs.readFileSync('database3.txt', "utf-8");
            var writerStream = fs.createWriteStream('database3.txt');
            
            writerStream.write(datacurrent+utcDate+"==>Temperature->"+tempurature_array[flag_temp]+"\n",'UTF8');  
            console.log('Temperature executed.'+tempurature_array[flag_temp]);
            flag_temp++;
            }
            else
            {
            clearInterval(tempurature_Interval);
            eventEmitter.removeListener('connection', tempurature);
            console.log("---------------Temperature Execution OFF---------------");
            }
    },2000);
}
//synchronous humidity function to read and write humidity data from humidity.txt to database3.txt
var humidity = function() {
    var humidity_Interval = setInterval(function humidity_exe(){
        if(flag_humidity<100){
            var dt = new Date();
            var utcDate = dt.toUTCString();
    
            var datacurrent = fs.readFileSync('database3.txt', "utf-8");
            var writerStream = fs.createWriteStream('database3.txt');
    
            writerStream.write(datacurrent+utcDate+"==>Humidity->"+humidity_array[flag_humidity]+"\n",'UTF8');
            console.log('Humidity executed.'+flag_humidity);
            flag_humidity++;
        }
        else
        {
            clearInterval(humidity_Interval);
            eventEmitter.removeListener('connection', humidity);
            console.log("---------------Humidity Execution OFF---------------");
        }
    },5000);
}
//synchronous acceleration function to read and write acceleration data from acceleration.txt to database3.txt
//we don't have a callback function here that's why it is a synchronous function not asynchronous.
var acceleration = function() {
    //here acceleration_Interval takes the setinterval function as an object.setInterval function takes 2 arguments
    //one fuunction and the time interval ,here the function is humidity() and interval is 5000 ms.
    var acceleration_Interval = setInterval(function acceleration_exe(){
        //we want to close acceleration data execution after reading all 100 datas from tempurature.txt
        //otherwise we will get undefined tempurature data if this function runs more than 100 times
        if(flag_acceleration<100)
        {   //declaring timestamp for logging tempurature data write time in database3.txt 
            var dt = new Date();
            var utcDate = dt.toUTCString();
            
            var datacurrent = fs.readFileSync('database3.txt', "utf-8");
            var writerStream = fs.createWriteStream('database3.txt');
    
            writerStream.write(datacurrent+utcDate+"==>Accelerometer->"+acceleration_array[flag_acceleration]+"\n",'UTF8');    
            console.log('Accelerometer executed.'+flag_acceleration);
            flag_acceleration++;
        }
        else
        {
            clearInterval(acceleration_Interval);
            eventEmitter.removeListener('connection', acceleration);
            console.log("---------------Accelerometer Execution OFF---------------.");
        }
    },10000);
}

eventEmitter.addListener('connection', tempurature);
eventEmitter.on('connection', humidity);
eventEmitter.on('connection', acceleration);
eventEmitter.emit('connection');