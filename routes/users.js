const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport')
const router = express.Router();

const Users = require('../models/users');

router.get('/login', (req, res) => {
    res.render("./users/login.ejs");
});

router.get('/register', (req, res) => {
    res.render("./users/register.ejs");
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/users/login',
        failureRedirect: '/main',
        failureFlash: true
    })(req, res, next);
});

router.post('/register', (req, res) => {
    if (req.body.Password != req.body.Password2) {
        req.flash("error_msg", "Confirm password not matched...");
        res.redirect("/users/Register");
    } else {
        Users.findOne({ email: req.body.Email }, (err, done) => {
            if (err) {
                req.flash('error_msg', 'Oops! Something went Wrong');
                res.redirect("/users/Register");
            }
            if (done) {
                req.flash('error_msg', 'User Already Registered');
                res.redirect('/users/login');
            }
            else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.Password, salt, (err, hash) => {
                        if (err)
                            console.log(err)
                        req.body.Password = hash;
                        Users.create({
                            name: req.body.Name,
                            email: req.body.Email,
                            password: req.body.Password
                        }, (err, done) => {
                            if (err) {
                                req.flash('error_msg', 'Invalid entry');
                                res.redirect("/users/Register");
                            }
                            if (done) {
                                req.flash('success_msg', 'Successfully Register');
                                res.redirect("/users/login");
                            }
                        });
                    });
                });
            }
        });
    }
});

router.get('/allusers', (req, res) => {
    Users.find().then(result => {
        res.json(result);
    })
})
module.exports = router;