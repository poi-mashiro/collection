npm起服务器  
npm install connect  
npm install server-static  
npm install yargs  


server.js
```
var connect = require('connect');
var serveStatic = require('serve-static');
var yargs = require('yargs').argv;

if(yargs.p) {
	connect().use(serveStatic(__dirname)).listen(yargs.p, function(){
	    console.log('Server running on ', yargs.p ,'...');
	});
}else {
	connect().use(serveStatic(__dirname)).listen(3000, function(){
	    console.log('Server running on ', 3000 ,'...');
	});
}
```


node server.js
