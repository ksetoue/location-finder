import client from '@google/maps';
import 'dotenv/config';

import Location from '../model/location';

const googleMapsClient = client.createClient({ 
    key: `${ process.env.GOOGLE_PLACES_API_KEY }`,
    Promise: Promise
});

let PlacesServices = {};

PlacesServices.searchPlaces = (queryItem) => {
    return new Promise((resolve, reject) => {
        console.log('search: ', queryItem);
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
                reject(new Error({ message: `An error ocurred while processing location coordinates: ${err}` }));
            });
    });
}

module.exports = PlacesServices;