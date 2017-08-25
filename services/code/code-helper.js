const vm = require('vm');
const assert = require('assert');
const expect = require('chai').expect;


let codeEval = (req, res, next) => {
    let result;
    let code = req.body.code;

    const sandbox = { assert: assert, expect: expect };
    vm.createContext(sandbox);
    try {
        result = vm.runInContext(code, sandbox);
        res.locals.ref = result;  
    } catch (e) {
        console.log(e.message);
        result = e.message;
        res.locals.ref = result;
    }
    next();
}

module.exports = { codeEval };




