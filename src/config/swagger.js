const swaggerJsdoc = require('swagger-jsdoc');

const options = { definition: { openapi: '3.0.0', info: { title: 'API de Currículos', version: '1.0.0', description: 'API REST para gerenciamento de currículos profissionais.' }, servers: [ { url: 'http://localhost:3000', description: 'Servidor local' } ] }, apis: ['./src/routes/*.js'] };

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;