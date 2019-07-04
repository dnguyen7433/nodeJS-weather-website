const request = require("request");
const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address)+ ".json?access_token=pk.eyJ1IjoiZG5ndXllbjc0MzMiLCJhIjoiY2p4ZHpuMzIzMDVtOTN6b2V0cXE5bzIxZSJ9.MUw3NST8DQ0HH5p67ALilg&limit=1"
    request({url, json: true},(err,{body}) => {
           if (err){
                callback("Unable to connect to the location service!", undefined);
             } else if (body.features.length === 0){
                callback("Invalid Location. Try another search!", undefined)
             } else {
                callback(undefined,  {
                    latitude: body.features[0].center[1],
                    longtitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
             }
         })
}
module.exports = geoCode;