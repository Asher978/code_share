const vm = require('vm');


let codeEval = (req, res) => {
    let result;
    let code = req.body.code;
    const sandbox = {};
    vm.createContext(sandbox);
    result = vm.runInContext(code, sandbox);
    console.log(result);
    return result;
}

module.exports = { codeEval };