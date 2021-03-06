const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = mongoose.model('users');

module.exports = (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        console.log(email);
    }));
}