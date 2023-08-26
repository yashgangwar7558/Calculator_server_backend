const express = require('express');
const router = new express.Router();
const History = require('../models/history');

// to GET the result and store it in database
router.get('/calculate/:expression(*)', async (req, res) => {
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
        const result = await addingCalculation.save();

        res.status(201).json(operation);
    } catch (error) {
        res.status(400).json({ error: 'Invalid expression' });
    }
})


// to GET the recent 20 Calculations History stored in database 
router.get('/history', async (req, res) => {
    try {
        const getHistory = await History.find().sort({ createdAt: -1 }).limit(20)

        const reversedHistory = getHistory.slice().reverse(); 

        const htmlResponse = `
            <html>
                <head>
                    <title>History</title>
                </head>
                <body>
                    <h1>History</h1>
                    <table>
                        <tr>
                            <th>Question</th>
                            <th>Answer</th>
                            <th>Done At</th>
                        </tr>
                        ${reversedHistory.map(item => `
                            <tr>
                                <td>${item.question}</td>
                                <td>${item.answer}</td>
                                <td>${item.createdAt}</td>
                            </tr>
                        `).join('')}
                    </table>
                </body>
            </html>
        `;

        res.send(htmlResponse);
    } catch (err) {
        res.status(400).send(err);
    }
})


// to GET ALL Calculations History stored in database 
router.get('/history/all', async (req, res) => {
    try {
        const getHistory = await History.find().sort({ createdAt: -1 })

        const reversedHistory = getHistory.slice().reverse(); 

        const htmlResponse = `
            <html>
                <head>
                    <title>History</title>
                </head>
                <body>
                    <h1>History</h1>
                    <table>
                        <tr>
                            <th>Question</th>
                            <th>Answer</th>
                            <th>Done At</th>
                        </tr>
                        ${reversedHistory.map(item => `
                            <tr>
                                <td>${item.question}</td>
                                <td>${item.answer}</td>
                                <td>${item.createdAt}</td>
                            </tr>
                        `).join('')}
                    </table>
                </body>
            </html>
        `;

        res.send(htmlResponse);
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router;