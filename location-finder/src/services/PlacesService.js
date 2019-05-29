import 'dotenv/config';
import client from '@google/maps';

const googleMapsClient = client.createClient({ 
    key: `${process.env.GOOGLE_PLACES_API_KEY}`,
    Promise: Promise, 
});

let PlacesServices = {};

PlacesServices.searchPlaces = (...places) => {

    googleMapsClient.places({ query: 'statue of liberty' })
        .asPromise() 
        .then((response) => {
            console.log('response: ', response);    
            console.log(response.json.results);
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = PlacesServices;