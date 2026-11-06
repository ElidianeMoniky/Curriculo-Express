
require('dotenv').config();

const app = require('./app');
const pool = require('./config/database');

const PORT = process.env.PORT || 3000;

const habilidadeRoutes = require('./routes/habilidadeRoutes');

app.use('/habilidades', habilidadeRoutes);

async function iniciarServidor() {
    try {
        await pool.query('SELECT NOW()');

        console.log('Banco de dados conectado!');

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });

    } catch (error) {
        console.error('Erro ao conectar ao banco:', error.message);
        process.exit(1);
    }
}

iniciarServidor();
