var express = require('express');
var passport = require('passport');
var router = express.Router();
const bodyParser = require('body-parser');

var authenticate = require('../authenticate');
const cors = require('./cors');

var User = require('../models/user');

router.use(bodyParser.json());

/* GET users listing. Only allowed for admin users */
router.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); });
router.get('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, function(req, res, next) {
    User.find({})
        .then((data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }, (err) => next(err))
        .catch((err) => next(err));
});

// Facebook based login
router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
    if (req.user) {
        var token = authenticate.getToken({ _id: req.user._id });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, token: token, status: 'You are successfully logged in!' });
    }
});

// Register user
router.post('/signup', cors.corsWithOptions, (req, res, next) => {
    User.register(new User({ username: req.body.username }),
        req.body.password, (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({ err: err });
            }
            else {
                if (req.body.firstname)
                    user.firstname = req.body.firstname;
                if (req.body.lastname)
                    user.lastname = req.body.lastname;
                user.save((err, user) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ err: err });
                        return;
                    }
                    passport.authenticate('local', { session: false })(req, res, () => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ success: true, status: 'Registration Successful!' });
                    });
                });
        }
    });
});

// Login a regsitered user
router.post('/login', cors.corsWithOptions, passport.authenticate('local', { session: false }), (req, res, next) => {

    var token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, token: token, status: 'You are successfully logged in!' });
});

// Logout
router.get('/logout', cors.corsWithOptions, (req, res, next) => {
    //console.log(req);
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    }
    else {
        // No real concept of logging out for JWT tokens, they just expire after their expiry time!
        const token = req.headers.authorization.split(' ')[1]; 
        if (token) {
            const jwt = require("jsonwebtoken");
            const config = require('../config.js')
            const decodedToken = jwt.decode(token, config.secretKey);
            //console.log("Logout token: ", decodedToken);

            User.findById(decodedToken._id)
                .then((user) => {
                    //console.log(user);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ success: true, status: `${user.username} logged out!` });
                    //res.redirect('/');
                    
                });
        }
        else {
            var err = new Error('You are not logged in!');
            err.status = 403;
            next(err);
        }
    }
});

module.exports = router;
