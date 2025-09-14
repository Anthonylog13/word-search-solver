require('dotenv').config();
const cors = require('cors');
const express = require("express");
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./Config/Swagger.js');
const { APP_PORT } = process.env
const app = express();
const routerSearch = require("./Search/Router/apiRouter.js");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routerSearch);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.listen(APP_PORT, () => {
    console.log(`[INFO] SERVER RUNNING A ${APP_PORT}`);

});



