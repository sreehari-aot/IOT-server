# IOT-server

This project aims to store the data collected from an IOT device into a time series database, 
`QuestDB` for example and create graphical representations of the data to better understand the 
data.

## Requirements
- Docker
- Nodejs

## Get started
1. clone the repo
2. run `docker-compose up -d` to start the database
3. check into server directory
4. run `npm i && npm start`
5. once the server is up and running
6. check into `publisher` directory
7. run `node script.js`
8. check into client directory
9. run `docker-compose up -d` / `npm i && npm start` to start the client
