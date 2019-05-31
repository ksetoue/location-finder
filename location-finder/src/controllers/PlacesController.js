
import fs from 'fs';
import getMock from '../services/GetMock';
import PlaceServices from '../services/PlacesService'; 
import DistanceServices from '../services/DistanceService'; 

let PlacesController = {}; 

PlacesController.getLocations = (req, res) => {
    let places = req.body; 

    if (!places) {
        return new Error('This is a invalid input. Please, see the documentation for more info.\n');
    }

    Promise.resolve(getMock())
        .then(results => {
            let processableLocations = [];
            let unprocessable = []; 

            for(let result of results) {
                if(!result.id) {
                    unprocessable.push(result);
                    continue;
                }
                processableLocations.push(result);
            }

            res.status(200).json(DistanceServices.getDistances(processableLocations));
        })
        .catch(err => res.status(500).json(err));

    // work in progress
    // let locations = places.map(el => {
    //     return PlaceServices.searchPlaces(el);
    // });
    
    // Promise.all(locations)
    //     .then( results => {
    //         //add logic
    //     })
    //     .catch(err => res.status(500).json(err));

}

module.exports = PlacesController;