## ECDSA Node

This project is my attempt on Alchemy University Ethereum Dev. Bootamp week 1. This is a simple project using a client and server imitating how account based model of Ethereum works. Although it is still very centralized, it is only a rough illustration of how transfering works in Ethereum chain. Inside the server logic it introduces how digital signature works using ethereum-cryptography library which incorporating public key (adress) and private key.
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `nodemon index` to start the server 

The application should connect to the default server port (3000) 