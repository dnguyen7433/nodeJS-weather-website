const request = require ("request");
const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/49428429338ba4142c664ca02fa1379e/" + 
                encodeURIComponent(latitude) + "," 
                + encodeURIComponent (longitude)+"?units=si";
    request({url, json: true},(err,{body}) => {
            if(err){
                callback("Unable to connect to the weather service!", undefined);
            } else if (body.error){
                callback("Location is invalid", undefined);
            } else {
                callback( undefined, 
                            body.daily.data[0].summary+ " The highest temperature of " + 
                            body.daily.data[0].temperatureHigh + " degrees and the lowest temperature of "+ 
                            body.daily.data[0].temperatureLow + " degrees. " + "It is currently " + 
                            body.currently.temperature + " degrees out. There is a " + 
                            body.currently.precipProbability + 
                            "% chance of rain");
            }
        })
}
module.exports = forecast;