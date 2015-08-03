//Hapi is class
var Hapi = require('hapi');
var Path = require('path');

// Instantiate
var server = new Hapi.Server();

// configure server connections
server.connection({
  host: '0.0.0.0', 
  port: process.env.PORT || 3000,
  routes: {
    cors: {
      headers: ["Access-Control-Allow-Credentials"],
      credentials: true
    }
  }
});

server.views({
  engines: {
    html: require('handlebars')
  },
  path: Path.join(__dirname, 'templates')
});

// Any other dependencies 
var plugins = [
  { register: require('./routes/users.js') },
  //require mongoDB
  { register: require('hapi-mongodb'),
    options: {
      url: process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/grapple-planner',
      settings: {
        db: {
          native_parser: false
        }
      }
    }
  }
];

//starts server
server.register(plugins, function(err){
  //check error
  if (err) {
    throw err;
  }

  //start server
  server.start(function(){
    console.log('info', 'Server running at: ' + server.info.uri);
  });
});
