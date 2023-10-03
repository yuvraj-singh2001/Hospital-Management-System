var jwt = require('jsonwebtoken');
var express = require('express');
var config = require('../config/keys');
var cookieParser = require('cookie-parser');

/*var app = express();
app.use(cookieParser);*/

function verifyToken(req, res, next) {
  console.log(req.headers);
  //console.log(req.cookies);

  var token = req.headers['jwttoken'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
    
  jwt.verify(token, config.secretOrKey, function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;