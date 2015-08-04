var Auth = require('./auth');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route([
    //Create technique
    {
      method: 'POST',
      path: '/technique',
      config: {
        handler: function(request, reply){
          Auth.authenticated(request, function(result){
            if (result.authenticated) {
              var db = request.server.plugins['hapi-mongodb'].db;
              var session = request.session.get('grapple_planner_session');
              var ObjectId = request.server.plugins['hapi-mongodb'].ObjectID;
              var technique = {
                "user_id": ObjectId(session.user_id),
                "pos_l1": request.payload.technique.posl1,
                "pos_l2": request.payload.technique.posl2,
                "class": request.payload.technique.class,
                "tech":  request.payload.technique.tech
              };
              db.collection('technique').insert(tweet, function(err, writeResult){
                if(err) {return reply("Internal MongoDB error", err)
                };
                reply (writeResult);
              });
            } else {
              reply(result.message);
            }
          })
        },
        validate: {
          payload: {
            technique: {
              pos_l1: Joi.string().min(1).max(30).required(),
              pos_l2: Joi.string().min(1).max(30).required(),
              class: Joi.string().min(1).max(30).required(),
              tech: Joi.string().min(1).max(30).required(),
            }
          }
        }
      } // config
    }
  ]);
  next();
};


//Defining the descriptions of the plugin
exports.register.attributes = {
name: 'techniques-route',
version: '0.0.1'
};
