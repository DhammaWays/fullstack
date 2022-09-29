/*
 * Templated the code for different custom routers for better reuse.
 * To create a specific router for an entity, simply use it as:
 *      dishRouter = templateRouter('dishes');
 *      
 * Which will generate custom router for given entity (e.g. dishes).
 */

const express = require('express');
const bodyParser = require('body-parser');

const templateRouter = (entity) => {
    const gRouter = express.Router();
    gRouter.use(bodyParser.json());

    const Model = require(`../models/${entity}`);

    gRouter.route('/')
        .get((req, res, next) => {
            Model.find({})
                .then((data) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(data);
                }, (err) => next(err))
                .catch((err) => next(err));
        })
        .post((req, res, next) => {
            Model.create(req.body)
                .then((data) => {
                    console.log('Created ', data);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(data);
                }, (err) => next(err))
                .catch((err) => next(err));
        })
        .put((req, res, next) => {
            res.statusCode = 403;
            res.end(`PUT operation not supported on /${entity}`);
        })
        .delete((req, res, next) => {
            Model.remove({})
                .then((resp) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
                }, (err) => next(err))
                .catch((err) => next(err));
        });

    gRouter.route('/:Id')
        .get((req, res, next) => {
            Model.findById(req.params.Id)
                .then((data) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(data);
                }, (err) => next(err))
                .catch((err) => next(err));
        })
        .post((req, res, next) => {
            res.statusCode = 403;
            res.end(`POST operation not supported on /${entity}/${req.params.Id}`);
        })
        .put((req, res, next) => {
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
        .delete((req, res, next) => {
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
