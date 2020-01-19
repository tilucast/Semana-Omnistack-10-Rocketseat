const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');
const { setupWebSocket } = require('./websocket.js');

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect('mongodb+srv://asbiredebob123:asbiredebob@cluster0-2o4xh.mongodb.net/rocket10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.use(cors());  //origin : 'https://localhost:3000'
app.use(express.json());
app.use(routes);

// Parametros:

//Query: req.query (filtro,ordenar,paginação, etc)
//Route: req.params (Identificar recurso em alteração / remoção)
//Body: req.body (Dados para criação ou alteração de um registro)

server.listen(3333);