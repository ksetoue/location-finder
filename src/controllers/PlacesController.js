
const getMock = require('../services/GetMock');
const PlaceServices = require('../services/PlacesService'); 
const DistanceServices = require('../services/DistanceService'); 

let PlacesController = {}; 

/**
 * mountPair - receives a Location object and returns a pair, with its closest location
 */
function mountPair (location) {
    if (!location.near) {
        return null; 
    }

    let obj = {};
    obj.id = location.id; 
    obj.name = location.name; 
    obj.lat = location.lat; 
    obj.long = location.long; 

    return obj;
}


/**
 * getPairs - receives a Location object and returns a pair object
 */
function getPairs (processedLocations) {
    let pairs = []; 

    processedLocations.forEach(element => {
        let l1 = mountPair(element);
        let l2 = mountPair(element.near); 

        let pair = {
            location1: l1,
            location2: l2
        }
        
        pairs.push(pair);
    });

    return pairs;
}

/**
 * getLocations - receives request, reading the body and returnin a json with paired locations
 */
PlacesController.getLocations = (req, res) => {
    let places = req.body; 

    if (!places || places.length < 50) {
        return res.status(400).json('Payload must contain more than 50 items.');
    }

    if (places.length > 100) {
        return res.status(413).json('Payload must contain less than 100 items.');
    }

    
    let locations = places.map(el => {
        return PlaceServices.searchPlaces(el);
    });

    
    Promise.all(locations)
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

            let processedLocations = DistanceServices.getDistances(processableLocations);

            res.status(200).json(getPairs(processedLocations));
        })
        .catch(err => res.status(500).json(err));
}

module.exports = PlacesController;