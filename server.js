//BASE SETUP
// ============

//INCLUDE FILES
var User = require('./app/models/user');
//CALL THE PACKAGES -------
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser'); // get body-parser
var morgan = require('morgan'); // used to see requests
var mongoose = require('mongoose'); // for working w/ our database
var port = process.env.PORT || 8080; // set the port for our app
var jwt = require('jsonwebtoken');

//Create a secret String
var superSecret = 'ilovescotchscotchyscotchscotch';

// modulus
//mongoose.connect('mongodb://node:noder@novus.modulusmongo.net:27017/Iganiq8o');
//connect to our database (hosted on localhost)
 mongoose.connect('mongodb://localhost:27017/crm');

//APP CONFIGURATION ------------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Origin', 'GET,POST');
	res.setHeader('Access-Control-Allow-Origin', 'X-Requested-With, content-type, \ Authorization');
	next();
});

// log all requests to the console
app.use(morgan('dev'));

// ROUTES FOR OUR API
// ==================

// basic route for the home page
app.get('/', function(req, res){
	res.send('Welcome to the home page!');
});

//get an instance of the express router
var apiRouter = express.Router();

//on routes that end in /users
// =========
apiRouter.route('/users')

	// create a user (accessed at POST http://localhost:8080/api/users)
	.post(function(req,res){
		//create a new instance of the User Model
		var user = new User();

		//set the users information (comes from the request0
		user.name = req.body.name;
		user.username = req.body.username;
		user.password = req.body.password;

		//save the user and check for errors
    user.save(function(err){
		if(err){
			//duplicate entry
			if (err.code == 11000)
				return res.json({ success: false, message: 'a user with that username aldready exists.'});
			else
				return res.send(err);
		}
			res.json({message: "User Created!"});
    });
	})

  //get all the users (accessed at GET http://localhost:8080/api/users)
  .get(function(req, res){
    User.find(function(err, users){
      if (err) res.send(err);

      //return the users
      res.json(users);
    });
  });

  // on routes that end in /users/:user-id
  //----------------------------------------
  apiRouter.route('/users/:user_id')
    // get the user with this id
    // (accessed at GET http://localhost:8080/api/users/:user_id)
    .get(function(req, res){
      User.findById(req.params.user_id, function(err,user){
        if (err) res.send(err);

        //return that user
        res.json(user);
      });
    })
//middleware to use for all requests
// more routes for our API will happen here
apiRouter.use(function(req, res, next){
	//do logging
	console.log('somebody just came to our app');
	//we'll add more to the middle ware later
	//this is where we will authenticate users

	next(); //make sure we go to the next routes and don't stop here
});

//test route to make sure everything is working
// accessed at GET http://localhost:8080/api
apiRouter.get('/', function(req, res){
	res.json({message: 'horray! welcome to our api'});

});

// REGISTER OUR ROUTES -----------
// all of our routes will be prefixed with /api
app.use('/api', apiRouter);

//START THE SERVER
// ===============
app.listen(port);
console.log('Magic happens on port ' + port);
