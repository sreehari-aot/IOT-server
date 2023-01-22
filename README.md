# IOT-server

This project aims to store the data collected from an IOT device into a time series database, 
`QuestDB` for example and create graphical representations of the data to better understand the 
data. 

A small chunk of datasets are provided by the server which the publisher will use to push.

The publisher script act as an IOT device which publishes data points in certain intervals.

This project consistes of 4 majour components
1. Database:-
    The database used is `Quest DB` which is a time series database. This is where we publish our 
    data from IOT devices.
    The database is running on port 9000
    To make sure database is up and running go to http://localhost:9000
2. Server:-
    The server is a nodejs application which exposes endpoints for publishing and retrieving data 
    from the database.
    The server is running on port 8000
    To check if the server is up and running go to http://localhost:8000 after starting the application.
    Make sure the database is up and running before starting server. (ignore if using compose file)


    ## Server endpoints

    ```
    POST
    url path: {server-url}/publish eg: localhost:8000/publish
    body: {
        "timeStamp":"1662896469284",
        "person": "1",
        "pos_x": 15.32,
        "pos_y": 8.75,
        "vel_x": 0,
        "vel_y": 0,
        "o_id": "631dad359fbc895818809423"
    }

    payload type: application/json

    GET

    url path: {server-url}/get
    query params: 
      query {url encoded SQL query}
      type enum [1 / 2] 1- for position graph, 2 - for count graph

    eg: http://localhost:8000/get?query=SELECT%20*%20from%20%27Human%27&timings=true&type=1


    ```
3. Publisher:-
    The publisher is a script which mocks an IOT device by publishing observations everu 20 seconds.
    Make sure the server is up and running before running publisher script.
    Once the script is started leave it running since it will publish the data over time and exit 
    once all data is published.
4. Client:-
    The client is a react application which helps to visualize the data in a graphical format.
    The client is running in port 3000
    To visit the client go to http://localhost:3000
    
    The client offers different charts 
     - Line charts 
     - Heatmaps (TODO)
    
    The line chart supports 2 options
        - position (default)
        - count
    The default selection in linechart representst `pos_x` over different timestamps
    The count selection represents the number of persons at a purticular time
    
    
## Requirements
- Docker
- Nodejs: v14.17.0

## Get started

### Using Docker compose
1. run `docker-compose up -d` to spin up the databasee, server and client
2. check into `publisher` directory to publish data 
3. run `npm i && node scripts` to run the scripts

### for development

1. clone the repo
2. run `docker-compose up -d` to start the database
3. Before next steps make sure to stop `client` and `server` containers since they will use the allocated porst preventing dev server to run.
4. check into server directory
5. run `npm i && npm start`
6. once the server is up and running
7. open up a new terminal and check into `publisher` directory
8. run `npm i && node script.js` and leave it running
9. check into client directory
10. run `docker-compose up -d` / `npm i && npm start` to start the client


TODO:

- [ ] Heatmap chart for the data points
- [x] Move hardcoded values into configurations
- [x] Single compose file to setup entire application
- [ ] Optimized script to publish large data sets
- [x] Script modification to add time delay to mock an IOT device


## Dependencies 
- `react:18.2.0`
- `recharts:2.3.2`
- `react-heatmap-grid:0.9.0`
- `express:4.18.2`
- `@questdb/nodejs-client:1.0.2`
