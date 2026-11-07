
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentação JSON
app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(swaggerSpec);
});

// Interface Swagger
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        explorer: true,
        swaggerOptions: {
            docExpansion: 'list',
            defaultModelsExpandDepth: 3,
            defaultModelExpandDepth: 3,
            supportedSubmitMethods: [
                'get',
                'post',
                'put',
                'delete',
                'patch'
            ]
        }
    })
);

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API de Currículos funcionando!',
        status: 'online'
    });
});

// Rotas
app.use('/pessoas', require('./routes/pessoaRoutes'));
app.use('/formacoes', require('./routes/formacaoRoutes'));
app.use('/experiencias', require('./routes/experienciaRoutes'));
app.use('/projetos', require('./routes/projetoRoutes'));
app.use('/habilidades', require('./routes/habilidadeRoutes'));

module.exports = app;
