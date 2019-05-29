import 'dotenv/config';
import axios from 'axios';

// let request = {
//     url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?',
//     apiKey: process.env.GOOGLE_PLACES_API_KEY, 
// }

let PlacesServices = {};

PlacesServices.searchPlaces = (...places) => {
    // return 'hello there from searchPlaces'; 

    let search = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${request.apiKey}`;

    axios.get(search)
        .then(response => {
            console.log('service', response.data);
        })
        .catch(err => {
            console.log(err);
        });    
}

module.exports = PlacesServices;