'use strict'
const express = require('express');
const cors = require('cors');
const config = require('./config')
const db = require("./db");
const playerRouter = require('./routers/player-router');
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', playerRouter.routes);

if (process.env.NODE_ENV !== 'test') {
    app.listen(config.port, () => console.log("app is running on this port", config.port))
}

module.exports = {
    app
}