require('dotenv').config();

const app = require('./app');
const pool = require('./config/database');

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
    try {
        await pool.query('SELECT NOW()');

        console.log('Banco de dados conectado!');

        const servidor = app.listen(PORT, '127.0.0.1', () => {
            console.log('================================');
            console.log('API DE CURRICULOS ONLINE');
            console.log(`Endereço: http://127.0.0.1:${PORT}`);
            console.log(`Swagger: http://127.0.0.1:${PORT}/api-docs/`);
            console.log('================================');
        });

        servidor.on('error', (error) => {
            console.error('Erro no servidor:', error);
        });

    } catch (error) {
        console.error('Erro ao iniciar:', error.message);
        process.exit(1);
    }
}

iniciarServidor();