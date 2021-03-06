// dependencies
const express = require('express');
const mongoose = require('mongoose'); // object document mapper to work with mongodb
const path = require('path'); 
const cors = require('cors'); // make requests from frontend to another domain 
const bodyParser = require('body-parser'); // grabs incoming requests
const passport = require('passport'); //use for authentication
const config = require('./config/database');

// Connect to database
mongoose.connect(config.database);

// On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+config.database);
});

// On error
mongoose.connection.on('error', function(err){
    console.log('database error: '+err);
});

// initializing app variable use in express
const app = express();

// users routes
const users = require('./routes/users');

//lab routes
const labs = require('./routes/labs');

// initializing the port
const port = 3000;

// cors middleware
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname,'public')));

// body parser middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);
app.use('/labs',labs);


// Index route
app.get('/', function(req,res){
    res.send('Hello');
});

//Index Route
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

// start server
app.listen(port, function(err){
    if(err){
        console.log(err);
    } else {
        console.log("Server started at port "+port);
    }
   
})
