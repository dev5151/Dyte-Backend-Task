
# Dyte-backend-task
<h2> Two Methods <h2>
    <ul><a href="https://github.com/dev5151/Dyte-Backend-Task/tree/master/method-1">Method 1 --> Using Moleculer template</a></ul> <ul><a href="https://github.com/dev5151/Dyte-Backend-Task/tree/master/method-2">Method 2 --> Using Manual Mongo DB and Broker from Moleculer</a></ul>

## Usage Mehtod-1
    cd method-1
    Start the project with `npm run dev` command. 
After starting, open the http://localhost:3000/ URL in your browser. 

## Services
- **api**: API Gateway services
- **webhooks**: WEBHOOKS DB`.
    
## Routes
 ![alt text](https://github.com/dev5151/Dyte-Backend-Task/blob/master/method-1/list.png)
   ---------------------------------------------------------------------------------------- 
    
## Usage Mehtod-2
    cd method-2
    Create a file .env in the directory and add DB_URL and PORT number to it.
    Start the project with `node server.js` command. 
After starting, open the http://localhost:3000/ URL in your browser. 


## NPM scripts

- `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
- `npm run start`: Start production mode (set `SERVICES` env variable to load certain services
- `npm run dc:up`: Start the stack with Docker Compose
- `npm run dc:down`: Stop the stack with Docker Compose
