# IOT-server

This project aims to store the data collected from an IOT device into a time series database, 
`QuestDB` for example and create graphical representations of the data to better understand the 
data. 

A small chunk of datasets are provided by the server which the publisher will use to push.

The publisher script act as an IOT device which publishes data points in certain intervals.

## Requirements
- Docker
- Nodejs

## Get started

### Using Docker compose
1. run `docker-compose up -d` to spin up the databasee, server and client
2. check into `publisher` directory to publish data 
3. run `npm i && node scripts` to run the scripts

### for development

1. clone the repo
2. run `docker-compose up -d` to start the database
3. check into server directory
4. run `npm i && npm start`
5. once the server is up and running
6. check into `publisher` directory
7. run `npm i && node script.js`
8. check into client directory
9. run `docker-compose up -d` / `npm i && npm start` to start the client


TODO:

- [ ] Heatmap chart for the data points
- [x] Move hardcoded values into configurations
- [x] Single compose file to setup entire application
- [ ] Optimized script to publish large data sets
- [ ] Script modification to add time delay to mock an IOT device


## Dependencies 
- `react:18.2.0`
- `recharts:2.3.2`
- `react-heatmap-grid:0.9.0`
- `express:4.18.2`
- `@questdb/nodejs-client:1.0.2`
