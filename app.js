const weather = require('./weather');

//const city = process.argv.slice(2);
//const myCity = process.argv[2];
const query = process.argv.slice(2).join(' ');

weather.get(query);
