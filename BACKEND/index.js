require('dotenv').config();
const cors = require('cors');
const express = require("express");
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./Config/Swagger.js');
const app = express();
const routerSearch = require("./Search/Router/apiRouter.js");


app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://word-search-solver-ashen.vercel.app',
    ],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.json({
        message: 'Word Search Solver API funcionando correctamente!',
        status: 'ok',
        routes: ['/api', '/api-docs'],
        timestamp: new Date().toISOString()
    });
});


app.use('/api', routerSearch);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`[INFO] SERVER RUNNING ON PORT ${PORT}`);
    });
}


module.exports = app;