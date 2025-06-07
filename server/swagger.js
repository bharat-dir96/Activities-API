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
    apis: ['./routes/*.js', './docs/*.js'], // <- make sure this includes docs
    components: {
        schemas: {
            User: {
                type: 'object',
                required: ['first_name', 'last_name', 'email_address', 'phone_number', 'auth_token'],
                properties: {
                    first_name: { type: 'string' },
                    last_name: { type: 'string' },
                    email_address: { type: 'string' },
                    phone_number: { type: 'string' },
                    auth_token: { type: 'string' }
                }
            },
            Activity: {
                type: 'object',
                required: [
                    'title', 'location', 'description', 'duration', 'code',
                    'price', 'image', 'category', 'review_score', 'time', 'language',
                ],
                properties: {
                    title: { type: 'string' },
                    location: { type: 'string' },
                    description: { type: 'string' },
                    duration: { type: 'string' },
                    code: { type: 'string' },
                    price: { type: 'number' },
                    image: {
                    type: 'array',
                    items: { type: 'string' }
                    },
                    category: {
                    type: 'array',
                    items: { type: 'string' }
                    },
                    review_score: { type: 'number' },
                    time: {
                    type: 'array',
                    items: { type: 'string' }
                    },
                    language: {
                    type: 'array',
                    items: { type: 'string' }
                    },
                    free_cancellation: { type: 'boolean' }
                }
            },
            Error: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'Not found'
                    }
                }
            }
        }
    }
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};