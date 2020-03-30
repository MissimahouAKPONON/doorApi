var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
var logger = require('morgan');
const cors = require("cors");
var bcrypt = require("bcryptjs");

var authRouter = require('./routes/auth.routes');
var usersRouter = require('./routes/user.routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(path.join(__dirname, 'public')));
var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// app.use('/api', usersRouter);
// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to bezkoder application."});
});
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// Role Initialisation
const db = require("./models");
const Role = db.role;
const User = db.user;


db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });
    Role.create({
        id: 2,
        name: "admin"
    });
    User.findOrCreate({
        where: {
            email: "admin@gmail.com"
        },
        defaults: {
            username: "Administrateur",
            email: "admin@gmail.com",
            password: bcrypt.hashSync("admin123", 8),

        }
    }).then((result) => {
        var admin = result[0], // the instance of the author
            created = result[1]; // boolean stating if it was created or not

        if (!created) { // false if author already exists and was not created.
            console.log('USer Admin already exists');
        }
        admin.setRoles([2]);

        console.log('Created USer Admin...');
    });

}

db.sequelize.sync();
//*****************//

// set port, listen for requests
const PORT = 3000;
app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}.`);
});
// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
