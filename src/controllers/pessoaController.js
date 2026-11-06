
const pool = require('../config/database');

// LISTAR PESSOAS
exports.listarPessoas = async (req, res) => {
    try {
        const resultado = await pool.query(
            'SELECT * FROM pessoas ORDER BY id'
        );

        res.status(200).json(resultado.rows);
    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao listar pessoas',
            detalhes: error.message
        });
    }
};

// BUSCAR PESSOA POR ID
exports.buscarPessoa = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            'SELECT * FROM pessoas WHERE id = $1',
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensagem: 'Pessoa não encontrada'
            });
        }

        res.status(200).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao buscar pessoa',
            detalhes: error.message
        });
    }
};

// CADASTRAR PESSOA
exports.criarPessoa = async (req, res) => {
    try {
        const { nome, email, telefone, endereco, resumo } = req.body;

        if (!nome || !email) {
            return res.status(400).json({
                mensagem: 'Nome e e-mail são obrigatórios'
            });
        }

        const resultado = await pool.query(
            `INSERT INTO pessoas
            (nome, email, telefone, endereco, resumo)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [nome, email, telefone, endereco, resumo]
        );

        res.status(201).json({
            mensagem: 'Pessoa cadastrada com sucesso!',
            pessoa: resultado.rows[0]
        });
    } catch (error) {
        res.status(error.code === '23505' ? 409 : 500).json({
            erro: 'Erro ao cadastrar pessoa',
            detalhes: error.message
        });
    }
};

// ATUALIZAR PESSOA
exports.atualizarPessoa = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, telefone, endereco, resumo } = req.body;

        if (!nome || !email) {
            return res.status(400).json({
                mensagem: 'Nome e e-mail são obrigatórios'
            });
        }

        const resultado = await pool.query(
            `UPDATE pessoas
             SET nome = $1, email = $2, telefone = $3,
                 endereco = $4, resumo = $5
             WHERE id = $6
             RETURNING *`,
            [nome, email, telefone, endereco, resumo, id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensagem: 'Pessoa não encontrada'
            });
        }

        res.status(200).json({
            mensagem: 'Pessoa atualizada com sucesso!',
            pessoa: resultado.rows[0]
        });
    } catch (error) {
        res.status(error.code === '23505' ? 409 : 500).json({
            erro: 'Erro ao atualizar pessoa',
            detalhes: error.message
        });
    }
};

// EXCLUIR PESSOA
exports.excluirPessoa = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            'DELETE FROM pessoas WHERE id = $1 RETURNING *',
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensagem: 'Pessoa não encontrada'
            });
        }

        res.status(200).json({
            mensagem: 'Pessoa excluída com sucesso!'
        });
    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao excluir pessoa',
            detalhes: error.message
        });
    }
};
