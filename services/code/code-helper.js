const vm = require('vm');
const assert = require('assert');


let codeEval = (req, res, next) => {
    let result;
    let code = req.body.code;

    const sandbox = { assert: assert };
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




