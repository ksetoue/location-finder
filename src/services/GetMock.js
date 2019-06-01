const fs = require('fs');

function getMock () {
    return JSON.parse(fs.readFileSync('./mock.txt').toString());
}

module.exports = getMock; 