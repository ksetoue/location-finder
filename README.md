# Location API 

This is a Node.js app, build with express.js that perform the following operations: 

1. Call an endpoint and pass an array of locations
2. For every location in the array, calculate which location from the same array is closest
3. Get the list of pairs

## About 

The architecture proposed for this project (see the image below). The server (index.js) will receive a POST request to the endpoint `/places/search`, with the array of locations to be paired inside the body. Then, the request is redirected to a router, responsible for routing the request to the controller. The controller has the business logic of this API, being responsible for dispatching requests to the PlacesService (calls to the maps API), and then calculating the distances between each pair of location (through DistanceService). 

After that, each location has a field `near` that contains the nearest location from the array. Then, the controller creates an array with pairs of this locations. 

The project have the following structure: 


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

## Run 


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

Inside of the `location-finder` folder, run on a shell: 

```sh
$ npm install 
$ npm start # starts the application 
```

Your server will be running on `http://localhost:{PORT declared on .env}`. 

To test your API connection, you can use [Postman](), through a POST request the endpoint `localhost:9000/places/search`, passing the array of locations inside the body of your request. 


### Testing 

To execute the tests, run: 
```sh
$ npm test 
```
