const express = require('express');
const router = new express.Router();
const History = require('../models/history');

// to GET the result and store it in database
router.get('/calculate/:expression(*)', (req, res) => {
    const expression = req.params.expression;

    // replace mathematical words to symbols
    const mathematicalExpression = expression.replace(/plus/g, '+').replace(/minus/g, '-').replace(/into/g, '*').replace(/\//g, '');

    try {
        const answer = eval(mathematicalExpression);

        const operation = {
            question: mathematicalExpression,
            answer: answer
        };

        // adding calculations history to database
        const addingCalculation = new History(operation);
        const result = addingCalculation.save();

        res.status(201).json(operation);
    } catch (error) {
        res.status(400).json({ error: 'Invalid expression' });
    }
})

// to GET the recent 20 Calculation History stored in database 
router.get('/history', (req, res) => {
    try {
        res.send("History");
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router;