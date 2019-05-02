const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Info = require('../models/info');

router.get("/main", (req, res) => {
    res.render("main.ejs");
});

router.get("/add", (req, res) => {
    res.render("./information/add.ejs")
});

router.get("/index", (req, res) => {
    Info.find({})
        .sort({ name: 'asc' })
        .then(result => {
            res.render("./information/index.ejs", {
                result: result
            });
        });
});

router.get("/edit/:id", (req, res) => {
    Info.findOne({ _id: req.params.id })
        .then(info => {
            res.render("./information/edit.ejs", {
                info: info
            })
        })
});

router.get("/index/:id", (req, res) => {
    Info.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Successfully Removed')
            res.redirect("/index")
        })
})

router.post("/index", (req, res) => {
    if (req.body.DOB == '' && req.body.mobileNumber == '') {
        req.flash('error_msg', 'Enter atleast one field');
        res.redirect('/add')
    } else {
        Info.findOne({ mob_number: req.body.mobileNumber }, (err, done) => {
            if (err) {
                req.flash('error_msg', 'Oops! Something went wrong')
                res.redirect('/add')
            }
            if (done) {
                req.flash('success_msg', 'Already Added');
                res.redirect('/add')
            }
            else {
                Info.create({ name: req.body.Name, mob_number: req.body.mobileNumber, dob: req.body.DOB, anniORbday: req.body.options }, (err, done) => {
                    if (err) {
                        req.flash('error_msg', 'Oops! Something went wrong')
                        res.redirect('/add')
                    }
                    else {
                        req.flash('success_msg', 'Successfully Added')
                        res.redirect('/index');
                    }
                });
            }
        });
    }
});

router.post("/edit/:id", (req, res) => {
    Info.findOne({ _id: req.params.id })
        .then(info => {
            info.name = req.body.Name;
            info.mob_number = req.body.mobileNumber;
            info.dob = req.body.DOB;

            info.save().then(info => {
                req.flash('success_msg', 'Updated')
                res.redirect("/index");
            })
        })
})


router.get('/all', (req, res) => {
    Info.find().then(result => {
        res.json(result);
    })
})


module.exports = router;