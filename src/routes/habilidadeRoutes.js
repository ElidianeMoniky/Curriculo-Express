
const express = require('express');
const router = express.Router();

const habilidadeController = require('../controllers/habilidadeController');

/**
 * @swagger
 * tags:
 *   name: Habilidades
 *   description: Gerenciamento de habilidades profissionais
 */

/**
 * @swagger
 * /habilidades:
 *   get:
 *     summary: Lista todas as habilidades
 *     tags: [Habilidades]
 *     responses:
 *       200:
 *         description: Lista de habilidades cadastradas
 */
router.get('/', habilidadeController.listarHabilidades);

/**
 * @swagger
 * /habilidades/{id}:
 *   get:
 *     summary: Busca habilidade pelo ID
 *     tags: [Habilidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Habilidade encontrada
 *       404:
 *         description: Habilidade não encontrada
 */
router.get('/:id', habilidadeController.buscarHabilidade);

/**
 * @swagger
 * /habilidades:
 *   post:
 *     summary: Cadastra uma habilidade
 *     tags: [Habilidades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pessoa_id
 *               - nome
 *             properties:
 *               pessoa_id:
 *                 type: integer
 *                 example: 1
 *               nome:
 *                 type: string
 *                 example: TypeScript
 *               categoria:
 *                 type: string
 *                 example: Programação
 *               nivel:
 *                 type: string
 *                 example: Avançado
 *     responses:
 *       201:
 *         description: Habilidade cadastrada com sucesso
 */
router.post('/', habilidadeController.criarHabilidade);

/**
 * @swagger
 * /habilidades/{id}:
 *   put:
 *     summary: Atualiza uma habilidade
 *     tags: [Habilidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pessoa_id:
 *                 type: integer
 *                 example: 1
 *               nome:
 *                 type: string
 *                 example: TypeScript
 *               categoria:
 *                 type: string
 *                 example: Programação
 *               nivel:
 *                 type: string
 *                 example: Avançado
 *     responses:
 *       200:
 *         description: Habilidade atualizada
 *       404:
 *         description: Habilidade não encontrada
 */
router.put('/:id', habilidadeController.atualizarHabilidade);

/**
 * @swagger
 * /habilidades/{id}:
 *   delete:
 *     summary: Exclui uma habilidade
 *     tags: [Habilidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Habilidade excluída com sucesso
 *       404:
 *         description: Habilidade não encontrada
 */
router.delete('/:id', habilidadeController.excluirHabilidade);

module.exports = router;
