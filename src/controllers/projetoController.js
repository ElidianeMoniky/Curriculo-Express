
const pool = require('../config/database');

// Listar todos os projetos
const listarProjetos = async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT projetos.*, pessoas.nome AS pessoa_nome
            FROM projetos
            JOIN pessoas ON projetos.pessoa_id = pessoas.id
            ORDER BY projetos.id
        `);

        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// Buscar projeto por ID
const buscarProjeto = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            'SELECT * FROM projetos WHERE id = $1',
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensagem: 'Projeto não encontrado'
            });
        }

        res.json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// Cadastrar projeto
const criarProjeto = async (req, res) => {
    try {
        const {
            pessoa_id,
            nome,
            descricao,
            tecnologias,
            url_repositorio,
            url_demo,
            data_inicio,
            data_fim
        } = req.body;

        const inicio = data_inicio || null;
        const fim = data_fim || null;

        const resultado = await pool.query(
            `INSERT INTO projetos
            (pessoa_id, nome, descricao, tecnologias,
            url_repositorio, url_demo, data_inicio, data_fim)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
            [
                pessoa_id, nome, descricao, tecnologias,
                url_repositorio, url_demo, inicio, fim
            ]
        );

        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// Atualizar projeto
const atualizarProjeto = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            pessoa_id,
            nome,
            descricao,
            tecnologias,
            url_repositorio,
            url_demo,
            data_inicio,
            data_fim
        } = req.body;

        const inicio = data_inicio || null;
        const fim = data_fim || null;

        const resultado = await pool.query(
            `UPDATE projetos SET
            pessoa_id = $1,
            nome = $2,
            descricao = $3,
            tecnologias = $4,
            url_repositorio = $5,
            url_demo = $6,
            data_inicio = $7,
            data_fim = $8
            WHERE id = $9
            RETURNING *`,
            [
                pessoa_id, nome, descricao, tecnologias,
                url_repositorio, url_demo, inicio, fim, id
            ]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensagem: 'Projeto não encontrado'
            });
        }

        res.json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// Excluir projeto
const excluirProjeto = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            'DELETE FROM projetos WHERE id = $1 RETURNING *',
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensagem: 'Projeto não encontrado'
            });
        }

        res.json({
            mensagem: 'Projeto excluído com sucesso'
        });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

module.exports = {
    listarProjetos,
    buscarProjeto,
    criarProjeto,
    atualizarProjeto,
    excluirProjeto
};
