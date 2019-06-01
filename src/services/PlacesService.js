const client = require('@google/maps');
const Location = require('../model/location');
require('dotenv/config');

const googleMapsClient = client.createClient({ 
    key: `${ process.env.GOOGLE_PLACES_API_KEY }`,
    Promise: Promise
});

let PlacesServices = {};
const processResponse = name => response => {
    let locationObj = response.json.results[0]; 

    if(!locationObj) {
        return new Location({ name });
    }

    let location = new Location({ 
        name, 
        id: locationObj.id,
        lat: locationObj.geometry.location.lat,
        long: locationObj.geometry.location.lng,
        address: locationObj.formatted_address
    });
    
    return location;
}

PlacesServices.searchPlaces = queryItem => googleMapsClient
    .places({ query: `${queryItem}` })  
    .asPromise()
    .then(processResponse(queryItem))
// .then(result => {
//     // console.log("result", result);
//     return result;
// })

module.exports = PlacesServices;