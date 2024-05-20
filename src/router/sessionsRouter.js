const express = require('express');
const sessionData = require('../data/sessions.json');

const sessionsRouter = express.Router();


sessionsRouter.route('/')
    .get((req, res) => {
        res.render('sessions', {
            sessionData
        });
    });
sessionsRouter.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        res.render('session', {
            session: sessionData[id]
        });
    });

module.exports = sessionsRouter;