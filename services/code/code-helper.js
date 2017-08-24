const vm = require('vm');


let codeEval = (req, res, next) => {
    let result;
    let code = req.body.code;
    const sandbox = {};
    vm.createContext(sandbox);
    try {
        result = vm.runInContext(code, sandbox);
        res.locals.ref = result;    
    } catch (e) {
        result = 'Your Code returned an error'
        res.locals.ref = result;
    }
    next();
}

module.exports = { codeEval };