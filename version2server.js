var events = require('events');
var fs = require('fs');
var writeDatabaseStream = fs.createWriteStream('database.txt');  
var eventEmitter = new events.EventEmitter();
var tempCounter = 0;
var humidityCounter = 0;
var accelerometerCounter = 0;
var dt = new Date();
var utcDate = dt.toUTCString();


var util = require('util'),
EventEmitter = require('events').EventEmitter;



//Temparature Event Emitter


eventEmitter.on('ReadTempData',function() {
  
    function readLines(input, func) {
        var remaining = '';
      
        input.on('data', function(data) {
          remaining += data;
          var index = remaining.indexOf('\n');
          while (index > -1) {
            var line = remaining.substring(0, index);
            remaining = remaining.substring(index + 1);
            func(line);
            index = remaining.indexOf('\n');
          }
        });
      
        input.on('end', function() {
          if (remaining.length > 0) {
            func(remaining);
          }
        });
      }
      
      function func(data) {
        //console.log(data);
        writeDatabaseStream.write(utcDate+", Temp "+data+","+"\r\n")
        console.log(utcDate+", Temp "+data+", "+"\r\n");
      }
      
      var input = fs.createReadStream('tempurature.txt');
      readLines(input, func);
    
    tempCounter++;
});
eventEmitter.emit('ReadTempData');
    
//Humidity Event Emitter
eventEmitter.on('ReadHumData',function() {
    
      function readLines(input, func) {
          var remaining = '';
        
          input.on('data', function(data) {
            remaining += data;
            var index = remaining.indexOf('\n');
            while (index > -1) {
              var line = remaining.substring(0, index);
              remaining = remaining.substring(index + 1);
              func(line);
              index = remaining.indexOf('\n');
            }
          });
        
          input.on('end', function() {
            if (remaining.length > 0) {
              func(remaining);
            }
          });
        }
        
        function func(data) {
          //console.log(data);
          writeDatabaseStream.write(utcDate+", Hum "+data+","+"\r\n")
          console.log(utcDate+", Hum "+data+", "+"\r\n");
        }
        
        var input = fs.createReadStream('humidity.txt');
        readLines(input, func);
      
        humidityCounter++;
       // setInterval(readLines,5000);
        
  });
  eventEmitter.emit('ReadHumData');

//Acceleration Event Emitter
  eventEmitter.on('ReadAccData',function() {
    
      function readLines(input, func) {
          var remaining = '';
        
          input.on('data', function(data) {
            remaining += data;
            var index = remaining.indexOf('\n');
            while (index > -1) {
              var line = remaining.substring(0, index);
              remaining = remaining.substring(index + 1);
              func(line);
              index = remaining.indexOf('\n');
            }
          });
        
          input.on('end', function() {
            if (remaining.length > 0) {
              func(remaining);
            }
          });
        }
        
        function func(data) {
          //console.log(data);
          writeDatabaseStream.write(utcDate+", Acc "+data+","+"\r\n")
          console.log(utcDate+", Acc "+data+", "+"\r\n");
        }
        
        var input = fs.createReadStream('acceleration.txt');
        readLines(input, func);
      
        accelerometerCounter++;
        //setInterval(readLines,10000);
        
  });
  
  eventEmitter.emit('ReadAccData');
