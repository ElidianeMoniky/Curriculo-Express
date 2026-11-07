
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Currículos',
            version: '1.0.0',
            description: 'API REST para gerenciamento de currículos profissionais.'
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ]
    },
    apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

console.log(
    'Swagger carregou o POST /projetos:',
    JSON.stringify(swaggerSpec.paths?.['/projetos']?.post, null, 2)
);

module.exports = swaggerSpec;
