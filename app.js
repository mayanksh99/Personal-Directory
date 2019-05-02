const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const app = express();
const info = require('./routes/directory');
const users = require('./routes/users');

require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://dsckiet:dsc123@ds153495.mlab.com:53495/dsckiet-demo-db', (err) => {
    if (err) console.log(err);
    console.log("mlab connected");
});
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use('/', info);
app.use('/users', users);

app.listen(3000, () => { console.log('Server Started on 3000') });
