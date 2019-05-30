import client from '@google/maps';
import 'dotenv/config';

import Location from '../model/location';

const googleMapsClient = client.createClient({ 
    key: `${ process.env.GOOGLE_PLACES_API_KEY }`,
    Promise: Promise
});

let PlacesServices = {};

function getPlacesMapsAPI (queryItem) {
    return new Promise((resolve, reject) => {
        googleMapsClient.places({ query: `${queryItem}` }) 
            .asPromise()
            .then((response) => {   
                let locationObj = response.json.results[0]; 
        
                let location = new Location( 
                    locationObj.id,
                    locationObj.name, 
                    locationObj.geometry.location.lat,
                    locationObj.geometry.location.lng,
                    locationObj.formatted_address
                )
                resolve(location);
            })
            .catch((err) => {
                reject(console.log(err));
            });
    });
}

PlacesServices.searchPlaces = (places) => {
    if (!places) {
        return new Error('This is a invalid input. Please, see the documentation for more info.\n');
    }

    let locations = []; 
    
    places.forEach( element => {
        let promise = getPlacesMapsAPI(element);
        locations.push(promise);
    });

    Promise.all(locations)
        .then(results => {
            console.log(results);
        });
}

module.exports = PlacesServices;