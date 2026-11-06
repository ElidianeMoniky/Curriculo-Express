
const pool = require('../config/database');

// LISTAR TODAS AS HABILIDADES
exports.listarHabilidades = async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT h.*, p.nome AS nome_pessoa
            FROM habilidades h
            JOIN pessoas p ON p.id = h.pessoa_id
            ORDER BY h.id
        `);

        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// BUSCAR HABILIDADE POR ID
exports.buscarHabilidade = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(`
            SELECT h.*, p.nome AS nome_pessoa
            FROM habilidades h
            JOIN pessoas p ON p.id = h.pessoa_id
            WHERE h.id = $1
        `, [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensagem: 'Habilidade não encontrada'
            });
        }

        res.json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// CADASTRAR HABILIDADE
exports.criarHabilidade = async (req, res) => {
    try {
        const {
            pessoa_id,
            nome,
            categoria,
            nivel
        } = req.body;

        if (!pessoa_id || !nome) {
            return res.status(400).json({
                mensagem: 'Pessoa e nome da habilidade são obrigatórios'
            });
        }

        const resultado = await pool.query(`
            INSERT INTO habilidades
            (pessoa_id, nome, categoria, nivel)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `, [
            pessoa_id,
            nome,
            categoria,
            nivel
        ]);

        res.status(201).json({
            mensagem: 'Habilidade cadastrada com sucesso!',
            habilidade: resultado.rows[0]
        });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// ATUALIZAR HABILIDADE
exports.atualizarHabilidade = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            pessoa_id,
            nome,
            categoria,
            nivel
        } = req.body;

        const resultado = await pool.query(`
            UPDATE habilidades
            SET pessoa_id = $1,
                nome = $2,
                categoria = $3,
                nivel = $4
            WHERE id = $5
            RETURNING *
        `, [
            pessoa_id,
            nome,
            categoria,
            nivel,
            id
        ]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensagem: 'Habilidade não encontrada'
            });
        }

        res.json({
            mensagem: 'Habilidade atualizada com sucesso!',
            habilidade: resultado.rows[0]
        });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// EXCLUIR HABILIDADE
exports.excluirHabilidade = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            'DELETE FROM habilidades WHERE id = $1 RETURNING *',
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensagem: 'Habilidade não encontrada'
            });
        }

        res.json({
            mensagem: 'Habilidade excluída com sucesso!'
        });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};
