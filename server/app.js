var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
	var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

var index = require('./routes/index');
var user = require('./routes/user');
var config = require('./config/database');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
		extended: false
	}));

app.use(require('express-session')({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false
	}));

app.use(passport.initialize());
app.use(passport.session()); ;

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/user', user);


// passport config
var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connection URL
var url = config.url;
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	// we're connected!
	console.log("Database connection established");
	//db.dropDatabase();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

//TODO this is the server side code that needs to be implemented
//authentication server side
app.post('/api/login', function(request, response) {
    var userName = request.body.userName;
    var password = request.body.password;

    //this neeeds to call the database this is left just for testing now
    if (userName === "iTroy" && password === "pass123") {
        var expires = new Date();
        expires.setDate((new Date()).getDate() + 5);
        var token = jwt.encode({
            userName: userName,
            expires: expires
        }, app.get('jwtTokenSecret'));

        tokens.push(token);

        response.send(200, { access_token: token, userName: userName });
    } else {
        response.send(401, "Invalid credentials");
    }
});

app.post('/api/logout', requiresAuthentication, function(request, response) {
    var token= request.headers.access_token;
    removeFromTokens(token);
    response.send(200);
});

function send_error_resp() {
    var res, http_status, code, message;
    if (arguments.length == 4) {
        res = arguments[0];
        http_status = arguments[1];
        code = arguments[2];
        message = arguments[3];
    } else if (arguments.length == 3) {
        res = arguments[0];
        http_status = arguments[1];
        code = arguments[2].error;
        message = arguments[2].message;
    } else if (arguments.length == 2) {
        res = arguments[0];
        http_status = _http_code_from_error(arguments[1].error);
        code = arguments[1].error;
        message = arguments[1].message;
    } else {
        console.error("send_error_resp: YOU'RE DOING IT WRONG");
        throw new Error("send_error_resp called wrong-est-ly");
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(http_status).send(JSON.stringify({ error: code, message: message }));
    res.end();
}

function send_success_resp(res, obj) {
	console.log(res);
    if (arguments.length != 2) {
        console.error("send_success_resp: YOU'RE DOING IT WRONG");
        throw new Error();
    }
    res.setHeader('Content-Type', 'application/json');
	console.log(obj);
	res.status(200).send(JSON.stringify(obj));
    res.end();
}


function _http_code_from_error (error_code) {
    switch (error_code) {
      // add other messages here when they're not server problems.
      default:
        return 503;
    }
}

//code for authentication
function requiresAuthentication(request, response, next) {
    
    if (request.headers.access_token) {
        var token = request.headers.access_token;
       // console.log(tokens);
		 if (_.where(tokens, token).length > 0) {
     		console.log('Authentication : ');
     		var decodedToken = jwt.decode(token, app.get('jwtTokenSecret'));
            if (new Date(decodedToken.expires) > new Date()) {
				console.log('Authentication 2: ');
            	 next();
                return;
            } else {
                removeFromTokens();
				response.status(401).send("Your session is expired");
            }
        }
    }
	 response.status(401).send('No access token found in the request');
}

function removeFromTokens(token) {
    for (var counter = 0; counter < tokens.length; counter++) {
        if (tokens[counter] === token) {
            tokens.splice(counter, 1);
            break;
        }
    }
}

module.exports = app;
