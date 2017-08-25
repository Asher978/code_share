const vm = require('vm');
const assert = require('assert');
const expect = require('chai').expect;
const chai = require('chai');
const checkError = require('check-error');


// evaluation of code with challenges and testing
let codeEval = (req, res, next) => {
    let result;
    let code = req.body.code;

    const sandbox = { assert: assert, expect: expect, checkError: checkError, chai: chai };
    vm.createContext(sandbox);
    try {
        result = vm.runInContext(code, sandbox);
        res.locals.ref = result;  
    } catch (e) {
        result = checkError.getMessage(e);
        res.locals.ref = result;
    }
    next();
}

// evaluation of code withour testing and challenges
let codeEvalWithoutChallenge = (req, res, next) => {
    let result;
    let code = req.body.code;
    const sandbox = {};

    vm.createContext(sandbox);
    try {
        result = vm.runInContext(code, sandbox);
        res.locals.ref = result;  
    } catch (e) {
        result = checkError.getMessage(e);
        res.locals.ref = result;
    }
    next();
}

module.exports = { codeEval, codeEvalWithoutChallenge };




