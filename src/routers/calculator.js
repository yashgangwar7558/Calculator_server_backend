const express = require('express');
const router = new express.Router();
const History = require('../models/history');

// to GET the result and store it in database
router.get('/calculate/:expression(*)', async (req, res) => {
    const expression = req.params.expression;

    // remove all slashes
    const removeSlashes = expression.replace(/\//g, '')

    // replace mathematical words to symbols
    const mathematicalExpression = removeSlashes.replace(/plus/g, '+').replace(/minus/g, '-').replace(/into/g, '*').replace(/divide/g, '/').replace(/modulos/g, '%');

    try {
        const answer = eval(mathematicalExpression);
        const roundedAnswer = parseFloat(answer.toFixed(2));

        const operation = {
            question: mathematicalExpression,
            answer: roundedAnswer
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
            <!DOCTYPE html>
            <html>
            <head>
                <title>History</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin-top: 30px;
                        margin-bottom: 30px;
                        padding: 0;
                        background-color: #e3e3e3cc;
                    }
                    .container {
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #fff;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        text-align: center;
                        color: #007bff;
                        margin-bottom: 20px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        padding: 10px;
                        text-align: left;
                        border-bottom: 1px solid #ddd;
                    }
                    th {
                        background-color: #f5f5f5;
                        font-weight: bold;
                    }
                    tr:nth-child(even) {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Recent 20 Calculations History</h1>
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
                                <td>${item.createdAt.toLocaleString()}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
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
        <!DOCTYPE html>
        <html>
        <head>
            <title>All History</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin-top: 30px;
                    margin-bottom: 30px;
                    padding: 0;
                    background-color: #e3e3e3cc;
                }
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    text-align: center;
                    color: #007bff;
                    margin-bottom: 20px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 10px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                th {
                    background-color: #f5f5f5;
                    font-weight: bold;
                }
                tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>All Calculations History</h1>
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
                            <td>${item.createdAt.toLocaleString()}</td>
                        </tr>
                    `).join('')}
                </table>
            </div>
        </body>
        </html>
        `;

        res.send(htmlResponse);
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router;