let DistanceServices = {};

// TODO: improve naming 
/**
 * calculateDistance - return distance between two points
 */
function calculateDistance (x1,y1,x2, y2) {
    let x = x2 - x1;
    let y = y2 - y1;
    return Math.sqrt(x**2 + y**2);
}

/**
 * getDistances - given a array of locations, returns the closest location for each one, inside the near property
 */
DistanceServices.getDistances = (locations) => {
    if (!locations) {
        console.log('not locations');
        return [];
    }

    for(let index = 0; index < locations.length; index++) {
        let smallerDistance = Infinity; 
        for(let j = 0; j < locations.length; j++) {
            if (index == j || locations[index].name == locations[j].name) {
                continue;
            }

            let distance = calculateDistance(
                locations[index].lat,
                locations[index].long,
                locations[j].lat,
                locations[j].long
            )

            if (distance >= smallerDistance) {
                continue;
            }

            smallerDistance = distance;
            locations[index].near = locations[j];
        }
    }

    return locations;
}


module.exports = DistanceServices;