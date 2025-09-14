const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Word Search API',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3001/api',
                description: 'Servidor de desarrollo'
            }
        ],
    },
    apis: ['./Search/Router/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;


