var Bcrypt = require('bcrypt');
var Joi = require('joi');

//defining the plugin
exports.register = function(server, options, next){
  server.route([
    {
      // Create a new user
      method: 'POST',
      path: '/users',
      config: {
        handler: function(request, reply) {
          var db = request.server.plugins['hapi-mongodb'].db;

          // Get user input parameters (name, email, password)
          var user = request.payload.user;
          
          var uniqUserQuery = {
            $or: [
            {username: user.username},
            {email: user.email}
            ]

            };

          //check if user exists
          db.collection('users').count(uniqUserQuery, function(err, userExist) {
            if (userExist) {
              return reply('Error: Username already exists', err);
            }

            // Encrypt password
            Bcrypt.genSalt(10, function(err, salt){
              Bcrypt.hash(user.password, salt, function(err, encrypted){
                user.password = encrypted;
            
                // inserting a user document into DB
                db.collection('users').insert(user, function(err, writeResult){
                if(err) {return reply("Internal MongoDB error", err)}

                  reply (writeResult);
                });
              });
            });
          });
        },
        validate: {
          payload: {
            user: {
              email: Joi.string().email().max(50).required(),
              password: Joi.string().min(3).max(20).required(),
              username:  Joi.string().min(3).max(20).required(),
            }
          }
        }
      }
    }
  ]);
  next();
}

//Defining the descriptions of the plugin
exports.register.attributes = {
  name: 'users-routes',
  version: '0.0.1'
};
