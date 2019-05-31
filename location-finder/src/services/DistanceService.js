import Distance from '../model/distance';

let DistanceServices = {};

function getPairs (locations) {
    let pairs = []; 

    if (!locations) {
        return undefined;
    }
    
    for(let index = 0; index < locations.length; index++) {
        for(let j = index+1; j < locations.length; j++) {
            let from = locations[index]; 
            let to = locations[j]; 
            pairs.push(new Distance(from, to, undefined));
        }
    }

    return pairs;
}

// TODO: improve naming 
function calculateDistance (x1,y1,x2, y2) {
    let x = x2 - x1;
    let y = y2 - y1;
    return Math.sqrt(x**2 + y**2);
}

DistanceServices.getDistances = (locations) => {
    if (!locations) {
        return [];
    }

    for(let index = 0; index < locations.length; index++) {
        let smallerDistance = Infinity; 
        for(let j = 0; j < locations.length; j++) {
            if (index == j) {
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