/*
 * Templated the code for different custom routers for better reuse.
 * To create a specific router for an entity, simply use it as:
 *      dishRouter = templateRouter('dishes');
 *      
 * Which will generate custom router for given entity (e.g. dishes).
 */

const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');
const cors = require('./cors');

const templateRouter = (entity) => {
    const gRouter = express.Router();
    gRouter.use(bodyParser.json());

    const Model = require(`../models/${entity}`);

    gRouter.route('/')
        .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
        .get(cors.cors, (req, res, next) => {
            Model.find({})
                .then((data) => {
                    if (entity === 'dishes')
                        return Model.populate(data, 'comments.author');
                    else
                        return data;
                })
                .then((data) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(data);
                }, (err) => next(err))
                .catch((err) => next(err));
        })
        .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
            Model.create(req.body)
                .then((data) => {
                    console.log('Created ', data);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(data);
                }, (err) => next(err))
                .catch((err) => next(err));
        })
        .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
            res.statusCode = 403;
            res.end(`PUT operation not supported on /${entity}`);
        })
        .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
            Model.remove({})
                .then((resp) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
                }, (err) => next(err))
                .catch((err) => next(err));
        });

    gRouter.route('/:Id')
        .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
        .get(cors.cors, (req, res, next) => {
            Model.findById(req.params.Id)
                .then((data) => {
                    if (entity === 'dishes')
                        return Model.populate(data, 'comments.author');
                    else
                        return data;
                })
                .then((data) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(data);
                }, (err) => next(err))
                .catch((err) => next(err));
        })
        .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
            res.statusCode = 403;
            res.end(`POST operation not supported on /${entity}/${req.params.Id}`);
        })
        .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
            Model.findByIdAndUpdate(req.params.Id, {
                $set: req.body
            }, { new: true })
                .then((data) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(data);
                }, (err) => next(err))
                .catch((err) => next(err));
        })
        .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
            Model.findByIdAndRemove(req.params.Id)
                .then((resp) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
                }, (err) => next(err))
                .catch((err) => next(err));
        });

    return gRouter;
}

module.exports = templateRouter;
