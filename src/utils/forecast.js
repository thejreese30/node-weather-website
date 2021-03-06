
const request = require('request') 
 
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c9335b5c26b80c88025081e01568a5e2/'+ latitude + ',' + longitude
    request ({url, json : true}, (error, {body}) => { 
        if (error) { 
            callback('Error loading forecast. Please try again at a different time',undefined) 
        } 
        else if (body.error) { 
            callback('Forecast for this location could not be found. Try adjusting your search coordinates', undefined)
        } 
        
        else {  
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. The temperature high is ' + body.daily.data[0].temperatureHigh + '. The temperature low is' + body.daily.data[0].temperatureLow + '. Furthermore, There is a ' + body.currently.precipProbability + ' chance of rain'  
            ) 
        }
        
    })
}

module.exports = forecast 
// current : body.currently , 
//location : body.timezone , 