const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
        title: 'HCP Travels API',
        version: '1.0.0',
        },
    },
    apis: ['./routes/*.js', './docs/*.js', './docs/swaggerSchemas.js'], // <- make sure this includes docs
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};