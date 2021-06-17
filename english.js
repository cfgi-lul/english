const fs = require('fs');

const data = fs.readFileSync('./english.txt', {encoding:'utf8', flag:'r'});

fs.writeFileSync('./english.txt', data.split('\n').filter(e=>e.length > 5).sort().join('\n'));