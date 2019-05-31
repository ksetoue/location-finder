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

function getDistance (pair) {
    if (typeof pair != 'object') {
        return new Error('Not a valid input for getDistance.');
    }

    pair._distance = calculateDistanceKm(pair._from._lat, pair._from._long, pair._to._lat, pair._to._long,);

    return pair;
}

// Haversine formula - used to calculate distance between two points in a sphere
function calculateDistanceKm (lat1,lon1,lat2,lon2) {
    const earthRadius = 6371.16; // Radius of the earth in km
    let dLat = deg2rad(lat2-lat1);  // deg2rad below
    let dLon = deg2rad(lon2-lon1); 
    let a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let distance = earthRadius * c; // Distance in km

    return distance;
}
  
function deg2rad(deg) {
    return deg * (Math.PI/180);
}

DistanceServices.getDistances = (locations) => {
    if (!locations) {
        return [];
    }

    let pairs = getPairs(locations);
    let processedPairs = [];

    pairs.forEach(element => {
        let p = getDistance(element);
        processedPairs.push(p); 
    });

    return processedPairs;
}


module.exports = DistanceServices;