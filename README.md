# Location API 

This is a Node.js app, build with express.js that perform the following operations: 

1. Call an endpoint and pass an array of locations
2. For every location in the array, calculate which location from the same array is closest
3. Get the list of pairs

## About 

The architecture proposed for this project (see the image below) is composed by the following elements: 

1. Server app that receives calls to the endpoint 
2. A router that redirects requests
3. A controller that calls the appropriate services 
4. A service responsible for collecting location info from Google Maps Places API
5. A service responsible for calculating distances between locations

![architecture](https://github.com/ksetoue/location-finder/blob/master/architecture-diag.png)

The server (index.js) receives a POST request to the endpoint `/places/search`, with the array of locations to be paired inside the body of the request. Then, the request is redirected to a router, responsible for routing the request to the controller. The controller has the business logic of this API, being responsible for dispatching requests to the PlacesService (calls to the maps API), and calling the DistanceService that compute distances between each pair of location. 

After that, each location has a field `near` that contains the nearest location from the array, and the controller is able to respond the initial request with a json that contains paired locations of closest places within the initial input. 

Despite of having only one request, this modular structure allows to easily add more routes or different requests.  

The project have the following folder structure: 

```
location-finder
|--- src
    |-- controllers
        |-- PlacesController.js --> business logic
    |-- model 
        |-- location.js --> class that models a Location object
    |-- routers
        |-- PlacesRouter.js --> route request to the controller
    |-- services
        |-- DistanceService.js --> calculates distance between two locations
        |-- PlacesService.js --> Calls maps API and returns an array of locations 
    |-- index.js --> node app entry file
|--- tests
    |-- __mocks__ 
        |-- mocks.js --> mock info for tests
        |-- request.js --> simulates requests 
    |-- controllers
        |-- PlacesController.test.js 
    |-- services
        |-- DistanceService.test.js
        |-- PlacesService.test.js

```

## Running the project locally 

### Before you start

Before running the project, you need to create a `.env` file, in which you have to include a key to Google Maps API and port. 
```
PORT=9000
GOOGLE_PLACES_API_KEY=Your key
GOOGLE_PLACES_OUTPUT_FORMAT=json
```

To run the project, make sure you have the following requirements installed: 

- npm 
- node 

After cloning the repository, inside of the `location-finder` folder, run the commands: 

```sh
$ npm install  
$ npm run dev # starts the application 
```

Your server will be running on `http://localhost:{PORT declared on .env}`. 

To test your API connection, you can use [Postman](), through a POST request the endpoint `localhost:9000/places/search`, passing the array of locations inside the body of your request. 


### Testing 

To execute the tests, run: 
```sh
$ npm test 
```

## Accessing the endpoint deployed on Heroku

To access the endpoint, make a request to https://location-blanket.herokuapp.com/places/search passing an array on the body of your request. 

## TODO 

This architecture can be improved by: 

1. Adding a cache database, such as redis, on `PlacesService` that allows to store previous searched locations 
2. Deploying on a cloud provider such as Azure, AWS or GCP and configuring a loadbalancer before the server, to manage various requests 
3. Create a batch persistence to create batch requests, specifing dependency between them 


