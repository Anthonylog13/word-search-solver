require('dotenv').config();
const cors = require('cors');
const express = require("express");
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./Config/Swagger.js');
const { APP_PORT } = process.env
const app = express();
const routerSearch = require("./Search/Router/apiRouter.js");


app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://word-search-solver-2j9cd5kqo-anthonys-projects-22a4faf7.vercel.app',
        'https://TU-DOMINIO-FRONTEND.vercel.app'
    ],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routerSearch);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.listen(APP_PORT, () => {
    console.log(`[INFO] SERVER RUNNING A ${APP_PORT}`);

});



