const fs = require('fs');

export default function getMock () {
    return JSON.parse(fs.readFileSync('./mock.txt').toString());
}