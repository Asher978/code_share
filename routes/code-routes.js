const express = require('express');
const codeRoutes = express.Router();
const codeHelper = require('../services/code/code-helper');

codeRoutes.post('/', codeHelper.codeEval, (req, res) => {res.json({
    data: res.result
}) 
});

module.exports = codeRoutes;