
import PlaceServices from '../services/PlacesService'; 
import DistanceServices from '../services/DistanceService'; 

let PlacesController = {}; 

PlacesController.getLocations = (req, res) => {
    let locations = req.body; 
    console.log(locations);

    PlaceServices.searchPlaces(locations);

    return res.status(200).json({ message: 'Hello from test controller' });
}

module.exports = PlacesController;