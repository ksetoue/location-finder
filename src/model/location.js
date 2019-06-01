
export default class Location {
    constructor({ id, name, lat, long, address }) {
        this.id = id;
        this.name = name;
        this.lat = lat; 
        this.long = long; 
        this.addess = address;
        this.near = null;
    }
}
