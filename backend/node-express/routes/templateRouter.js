const express = require('express');
const bodyParser = require('body-parser');

const templateRouter = (entity) => {
    const gRouter = express.Router();
    gRouter.use(bodyParser.json());

    gRouter.route('/')
        .all((req, res, next) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            next();
        })
        .get((req, res, next) => {
            res.end(`Will send all the ${entity} to you!`);
        })
        .post((req, res, next) => {
            res.end(`Will add the ${entity}: ` + req.body.name + ' with details: ' + req.body.description);
        })
        .put((req, res, next) => {
            res.statusCode = 403;
            res.end(`PUT operation not supported on /${entity}`);
        })
        .delete((req, res, next) => {
            res.end(`Deleting all ${entity}`);
        });

    gRouter.route('/:Id')
        .get((req, res, next) => {
            res.end(`Will send details of the ${entity}: ` + req.params.Id + ' to you!');
        })
        .post((req, res, next) => {
            res.statusCode = 403;
            res.end(`POST operation not supported on /${entity}/{req.params.Id}`);
        })
        .put((req, res, next) => {
            res.write(`Updating the ${entity} : ${req.params.Id} \n`);
            res.end(`Will update the ${entity}: ` + req.body.name +
                ' with details: ' + req.body.description);
        })
        .delete((req, res, next) => {
            res.end('Deleting dish: ' + req.params.Id);
        });

    return gRouter;
}

module.exports = templateRouter;
