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
    let entOne = entity.slice(0, -1); /* chop off last character */
    if (entity.endsWith('es')) entOne = entOne.slice(0, -1);

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
            res.end(`Will send details of the ${entOne}: ` + req.params.Id + ' to you!');
        })
        .post((req, res, next) => {
            res.statusCode = 403;
            res.end(`POST operation not supported on /${entity}/${req.params.Id}`);
        })
        .put((req, res, next) => {
            res.write(`Updating the ${entOne}: ${req.params.Id} \n`);
            res.end(`Will update the ${entOne}: ` + req.body.name +
                ' with details: ' + req.body.description);
        })
        .delete((req, res, next) => {
            res.end(`Deleting ${entOne}: ` + req.params.Id);
        });

    return gRouter;
}

module.exports = templateRouter;
