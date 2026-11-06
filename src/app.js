
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const express = require('express');
const cors = require('cors');

const app = express();

const pessoaRoutes = require('./routes/pessoaRoutes');
const formacaoRoutes = require('./routes/formacaoRoutes');
const experienciaRoutes = require('./routes/experienciaRoutes');
const projetoRoutes = require('./routes/projetoRoutes');
const habilidadeRoutes = require('./routes/habilidadeRoutes');

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API de Currículos funcionando!',
        status: 'online'
    });
});

app.use('/pessoas', pessoaRoutes);
app.use('/formacoes', formacaoRoutes);
app.use('/experiencias', experienciaRoutes);
app.use('/projetos', projetoRoutes);
app.use('/habilidades', habilidadeRoutes);

module.exports = app;
