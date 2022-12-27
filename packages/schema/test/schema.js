const path = require('path');
const {generate} = require('../dist');

generate(path.join(__dirname, './schemas'), path.join(__dirname, '../temp/schemas'), {generateIndex: true});
