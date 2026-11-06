
const pool = require('../config/database');

// LISTAR FORMACOES
exports.listarFormacoes = async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT f.*, p.nome AS nome_pessoa
            FROM formacoes f
            JOIN pessoas p ON p.id = f.pessoa_id
            ORDER BY f.id
        `);

        res.status(200).json(resultado.rows);

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// BUSCAR FORMACAO POR ID
exports.buscarFormacao = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(`
            SELECT f.*, p.nome AS nome_pessoa
            FROM formacoes f
            JOIN pessoas p ON p.id = f.pessoa_id
            WHERE f.id = $1
        `, [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensagem: 'Formação não encontrada'
            });
        }

        res.status(200).json(resultado.rows[0]);

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// CADASTRAR FORMACAO
exports.criarFormacao = async (req, res) => {
    try {
        const {
            pessoa_id,
            curso,
            instituicao,
            nivel,
            data_inicio,
            data_fim,
            em_andamento,
            descricao
        } = req.body || {};

        if (!pessoa_id || !curso || !instituicao) {
            return res.status(400).json({
                mensagem: 'Pessoa, curso e instituição são obrigatórios'
            });
        }

        const resultado = await pool.query(`
            INSERT INTO formacoes
            (pessoa_id, curso, instituicao, nivel,
             data_inicio, data_fim, em_andamento, descricao)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `, [
            pessoa_id,
            curso,
            instituicao,
            nivel,
            data_inicio || null,
            data_fim || null,
            em_andamento ?? false,
            descricao || null
        ]);

        res.status(201).json({
            mensagem: 'Formação cadastrada com sucesso!',
            formacao: resultado.rows[0]
        });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// ATUALIZAR FORMACAO
exports.atualizarFormacao = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            pessoa_id,
            curso,
            instituicao,
            nivel,
            data_inicio,
            data_fim,
            em_andamento,
            descricao
        } = req.body || {};

        if (!pessoa_id || !curso || !instituicao) {
            return res.status(400).json({
                mensagem: 'Pessoa, curso e instituição são obrigatórios'
            });
        }

        const resultado = await pool.query(`
            UPDATE formacoes
            SET pessoa_id = $1,
                curso = $2,
                instituicao = $3,
                nivel = $4,
                data_inicio = $5,
                data_fim = $6,
                em_andamento = $7,
                descricao = $8
            WHERE id = $9
            RETURNING *
        `, [
            pessoa_id,
            curso,
            instituicao,
            nivel,
            data_inicio || null,
            data_fim || null,
            em_andamento ?? false,
            descricao || null,
            id
        ]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensagem: 'Formação não encontrada'
            });
        }

        res.status(200).json({
            mensagem: 'Formação atualizada com sucesso!',
            formacao: resultado.rows[0]
        });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// EXCLUIR FORMACAO
exports.excluirFormacao = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            'DELETE FROM formacoes WHERE id = $1 RETURNING *',
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensagem: 'Formação não encontrada'
            });
        }

        res.status(200).json({
            mensagem: 'Formação excluída com sucesso!'
        });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};
