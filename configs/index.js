require('custom-env').env(true);

const envConstatns = require('./environments/' + process.env.NODE_ENV);
module.exports = function(){
     return envConstatns;
}