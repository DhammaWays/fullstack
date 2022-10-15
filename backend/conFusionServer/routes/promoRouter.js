/*
 * Using templateRouter for better code reuse across different entities (dishes, promotions, leaders)
 */

/*
 * Listing the content of "templateRouter.js" here for grader's reference.
 * 
const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');

const templateRouter = (entity) => {
    const gRouter = express.Router();
    gRouter.use(bodyParser.json());

    const Model = require(`../models/${entity}`);

    gRouter.route('/')
        .get((req, res, next) => {
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
        .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
            Model.create(req.body)
                .then((data) => {
                    console.log('Created ', data);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(data);
                }, (err) => next(err))
                .catch((err) => next(err));
        })
        .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
            res.statusCode = 403;
            res.end(`PUT operation not supported on /${entity}`);
        })
        .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
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
        .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
            res.statusCode = 403;
            res.end(`POST operation not supported on /${entity}/${req.params.Id}`);
        })
        .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
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
        .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
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
*/

const templateRouter = require('./templateRouter');
const promoRouter = templateRouter('promotions');

module.exports = promoRouter;