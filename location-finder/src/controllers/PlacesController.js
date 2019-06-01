
import getMock from '../services/GetMock';
import PlaceServices from '../services/PlacesService'; 
import DistanceServices from '../services/DistanceService'; 

let PlacesController = {}; 

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

            let processedLocations = DistanceServices.getDistances(processableLocations);

            res.status(200).json(getPairs(processedLocations));
        })
        .catch(err => res.status(500).json(err));

    // work in progress - without mock
    // let locations = places.map(el => {
    //     return PlaceServices.searchPlaces(el);
    // });
    
    // Promise.all(locations)
    //     .then( results => {
    //         let processableLocations = [];
    //         let unprocessable = []; 

    //         for(let result of results) {
    //             if(!result.id) {
    //                 unprocessable.push(result);
    //                 continue;
    //             }
    //             processableLocations.push(result);
    //         }

    //         let processedLocations = DistanceServices.getDistances(processableLocations);

    //         res.status(200).json(getPairs(processedLocations));
    //     })
    //     .catch(err => res.status(500).json(err));

}

module.exports = PlacesController;