const express = require('express');
const app = express()
const fs = require('fs');
var config = {};

fs.readFile(__dirname + '/config/default_config.json', (err, data)=>{
	if(data){
		config = JSON.parse(data.toString());
		fs.readFile(__dirname + '/config/local_config.json', (err, data)=>{
			if(data){
				var localconfig = JSON.parse(data.toString());
				for(var key in localconfig){
					config[key] = localconfig[key];
				}
			}
			app.listen(config.listenPort || 80, function(){
				console.log('Server started on port: '+config.listenPort);
			});
		});
	}
});

app.get('/', function (req, res) {
  res.send('You are browsing the branch "' + config.branch + '"');
});
