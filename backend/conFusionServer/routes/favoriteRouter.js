const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');
const cors = require('./cors');

const favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

const Favorites = require(`../models/favorite`);

// General routers for favorites: GET, POST, DELETE
favoriteRouter.route('/')
    .options(cors.cors, (req, res) => { res.sendStatus(200); })
    .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ user: req.user._id }) // Favorite list is per autheticated user
            .populate('user')
            .populate('dishes._id')
            .then((data) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(data);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ user: req.user._id })
            .then((favorite) => {
                if (!favorite) { // this user does not have a favorite list yet
                    //console.log("Creating...");
                    newlist = { user: '', dishes: [] };
                    newlist.user = req.user._id;
                    for (var i = 0; i < req.body.length; i++) {
                        newlist.dishes.push(req.body[i]);
                    }
                    //console.log(newlist);
                    Favorites.create(newlist)
                        .then((resp) => {
                            console.log('Favorites Created ', resp);
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(resp);
                        },
                            (err) => next(err));
                }
                else { // Favorite list already exists for this user; just append any non-duplicates
                    //console.log("Appending");
                    //console.log(favorite);
                    for (var i = 0; i < req.body.length; i++) {
                        // Can not simply use normal indexOf and other string comparison as we are
                        // dealing with ObjectIDs which we need to compare as value and not by 
                        // reference!
                        if (!favorite.dishes.some((dish) => dish._id.equals(req.body[i]._id))) {
                            favorite.dishes.push(req.body[i]);
                        }
                    }
                    //console.log(favorite);
                    favorite.save()
                        .then((resp) => {
                            console.log('Favorites Updated ', resp);
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(resp);
                        },
                            (err) => next(err));
                }
            }, (err) => next(err))
             .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end(`PUT operation not supported!`);
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.deleteOne({ user: req.user._id })
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

// Routes for specific dish passed in as parameter in URL: POST, DELETE
favoriteRouter.route('/:dishId')
    .options(cors.cors, (req, res) => { res.sendStatus(200); })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ user: req.user._id })
            .then((favorite) => {
                if (!favorite) { // this user does not have a favorite list yet
                    //console.log("Creating");
                    newlist = { user: '', dishes: [] };
                    newlist.user = req.user._id;
                    newlist.dishes.push({ _id: req.params.dishId });
                    //console.log(newlist);
                    Favorites.create(newlist)
                        .then((resp) => {
                            console.log('Favorites Created ', resp);
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(resp);
                        },
                            (err) => next(err));
                }
                else { // Favorite list already exists for this user; just append any non-duplicates
                    //console.log("Appending");
                    //console.log(favorite);
                    if (!favorite.dishes.some((dish) => dish._id.equals(req.params.dishId))) {
                        favorite.dishes.push(req.params.dishId);
                    }
                    //console.log(favorite);
                    favorite.save()
                        .then((resp) => {
                            console.log('Favorites Updated ', resp);
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(resp);
                        },
                            (err) => next(err));
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end(`PUT operation not supported!`);
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ user: req.user._id })
            .then((favorite) => {
                var iFound = -1;
                if (favorite) {
                    // We only remove if given dish is in our favorite list
                    for (var i = 0; i < favorite.dishes.length; i++) {
                        if (favorite.dishes[i]._id.equals(req.params.dishId)) {
                            iFound = i;
                            break;
                        }
                    }
                    if (iFound !== -1) {
                        favorite.dishes.splice(iFound, 1);
                        favorite.save()
                            .then((resp) => {
                                console.log('Dish removed from Favorites', resp);
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(resp);
                            },
                                (err) => next(err));
                    }
                }
               
                if( !favorite || iFound == -1 ) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });


module.exports = favoriteRouter;
