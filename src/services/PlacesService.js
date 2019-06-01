const client = require('@google/maps');
const Location = require('../model/location');
require('dotenv/config');

const googleMapsClient = client.createClient({ 
    key: `${ process.env.GOOGLE_PLACES_API_KEY }`,
    Promise: Promise
});

let PlacesServices = {};

/**
 * processResponse - creates a Location object with information about the location
 */
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

/**
 * getLocation - creates a request to the maps API and returns information about the searched location
 */
const getLocation = (queryItem) => {
    let name = queryItem 
    clientRedis.get(name, (err, result) => {
        if(!result) {
            return googleMapsClient
                .places({ query: `${queryItem}` })  
                .asPromise()
                .then(processResponse(queryItem))
        }
        return result;
    });
}

PlacesServices.searchPlaces = queryItem => googleMapsClient
    .places({ query: `${queryItem}` })  
    .asPromise()
    .then(processResponse(queryItem))

module.exports = PlacesServices;