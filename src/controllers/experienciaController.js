
const pool = require('../config/database');

// LISTAR EXPERIENCIAS
exports.listarExperiencias = async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT e.*, p.nome AS nome_pessoa
            FROM experiencias e
            JOIN pessoas p ON e.pessoa_id = p.id
            ORDER BY e.id
        `);

        res.status(200).json(resultado.rows);

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// BUSCAR EXPERIENCIA POR ID
exports.buscarExperiencia = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(`
            SELECT e.*, p.nome AS nome_pessoa
            FROM experiencias e
            JOIN pessoas p ON e.pessoa_id = p.id
            WHERE e.id = $1
        `, [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensagem: 'Experiência não encontrada'
            });
        }

        res.status(200).json(resultado.rows[0]);

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// CADASTRAR EXPERIENCIA
exports.criarExperiencia = async (req, res) => {
    try {
        const {
            pessoa_id,
            empresa,
            cargo,
            tipo_contrato,
            local,
            data_inicio,
            data_fim,
            atual,
            descricao
        } = req.body || {};

        if (!pessoa_id || !empresa || !cargo) {
            return res.status(400).json({
                mensagem: 'Pessoa, empresa e cargo são obrigatórios'
            });
        }

        const resultado = await pool.query(`
            INSERT INTO experiencias
            (pessoa_id, empresa, cargo, tipo_contrato, local,
             data_inicio, data_fim, atual, descricao)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
        `, [
            pessoa_id,
            empresa,
            cargo,
            tipo_contrato || null,
            local || null,
            data_inicio || null,
            data_fim || null,
            atual ?? false,
            descricao || null
        ]);

        res.status(201).json({
            mensagem: 'Experiência cadastrada com sucesso!',
            experiencia: resultado.rows[0]
        });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// ATUALIZAR EXPERIENCIA
exports.atualizarExperiencia = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            pessoa_id,
            empresa,
            cargo,
            tipo_contrato,
            local,
            data_inicio,
            data_fim,
            atual,
            descricao
        } = req.body || {};

        if (!pessoa_id || !empresa || !cargo) {
            return res.status(400).json({
                mensagem: 'Pessoa, empresa e cargo são obrigatórios'
            });
        }

        const resultado = await pool.query(`
            UPDATE experiencias
            SET pessoa_id = $1,
                empresa = $2,
                cargo = $3,
                tipo_contrato = $4,
                local = $5,
                data_inicio = $6,
                data_fim = $7,
                atual = $8,
                descricao = $9
            WHERE id = $10
            RETURNING *
        `, [
            pessoa_id,
            empresa,
            cargo,
            tipo_contrato || null,
            local || null,
            data_inicio || null,
            data_fim || null,
            atual ?? false,
            descricao || null,
            id
        ]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensagem: 'Experiência não encontrada'
            });
        }

        res.status(200).json({
            mensagem: 'Experiência atualizada com sucesso!',
            experiencia: resultado.rows[0]
        });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// EXCLUIR EXPERIENCIA
exports.excluirExperiencia = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(`
            DELETE FROM experiencias
            WHERE id = $1
            RETURNING *
        `, [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensagem: 'Experiência não encontrada'
            });
        }

        res.status(200).json({
            mensagem: 'Experiência excluída com sucesso!'
        });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};
