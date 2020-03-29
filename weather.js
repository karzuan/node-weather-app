const http = require('http');
//const querystring = require('querystring');
const api = require('./api.json'); // including the API key as an object

function printMessage(city, country, temperature){
  console.log(`Current weather in ${city}, ${country} is ${temperature} °C`); 
}


// error handeling function
function printError(error){
console.error(`Error message: ${error.message}`);
}

function getWeather(query){
  
//  const parameters = {
//      q: query,
//      APPID: api.key
//      //units: 'imperial'
//      
//    };

// try catch for handeler if the url is correct
  try{
  const request = http.get(`http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api.key}&units=metric`, response => {
     if ( response.statusCode === 200 ) {
          let body = '';
          let result = {};
          response.on('data', d => {
            // journal data in the variable
            body += d;
          });
          response.on('end', () => {
            //console.log(body);
            // try catch handler for correct request
            try{
              result = JSON.parse(body);
              //console.log(result);
              printMessage( result.name, result.sys.country, result.main.temp );
            } catch(error) {
                      console.error(`Something is wrong with the request.
      Error from the Weather API: "${error}"`);
                       }
          });
      } else {
// example of how you create a custom made error and than handle the response. In this particular case we are checking if the Status 200, if not in any case the User will get this message and the Status code will be specified, in human and technical ways.
        const statuscodeError = new Error(`There was an error getting the data. Response statuscode: ${response.statusCode} - ${http.STATUS_CODES[response.statusCode]}`);
        printError(statuscodeError);          
      }
    
  });
  
  request.on('error', printError );


  } catch (error){
      printError(error);
      }

}


module.exports.get = getWeather;
//getWeather( myCity );


//getWeather