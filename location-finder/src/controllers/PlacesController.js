
import PlaceServices from '../services/PlacesService'; 
import DistanceServices from '../services/DistanceService'; 

let PlacesController = {}; 

PlacesController.getLocations = (req, res) => {
    let places = req.body; 

    if (!places) {
        return new Error('This is a invalid input. Please, see the documentation for more info.\n');
    }

    let locations = places.map(el => {
        return PlaceServices.searchPlaces(el);
    });
    
    Promise.all(locations)
        .then(results => {
            return DistanceServices.getDistances(results);
                                    
            // from location => get the one with smaller distance
            // find in the results, add the correspondent
        })
        .catch(err => {
            return new Error({ message: `An error ocurred while processing location coordinates: ${err}` });
        });

    return res.status(200).json({ message: 'Hello from test controller' });
}

module.exports = PlacesController;