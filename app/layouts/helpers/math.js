'use strict';

// Export helpers
module.exports.register = function (Handlebars, options) {
    Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
        console.log(options)
        return {
            "+": lvalue + rvalue,
            "-": lvalue - rvalue,
            "*": lvalue * rvalue,
            "/": (lvalue / rvalue).toFixed(2),
            "%": (lvalue % rvalue).toFixed(2),
            "|": ((lvalue / rvalue)*100).toFixed(2)
        }[operator];
    });
};
