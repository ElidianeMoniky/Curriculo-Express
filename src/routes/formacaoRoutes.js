
const express = require('express');
const router = express.Router();

const formacaoController = require('../controllers/formacaoController');

/**
 * @swagger
 * tags:
 *   name: Formações
 *   description: Gerenciamento de formações acadêmicas
 */

/**
 * @swagger
 * /formacoes:
 *   get:
 *     summary: Lista todas as formações
 *     tags: [Formações]
 *     responses:
 *       200:
 *         description: Lista de formações cadastradas
 */
router.get('/', formacaoController.listarFormacoes);

/**
 * @swagger
 * /formacoes/{id}:
 *   get:
 *     summary: Busca formação pelo ID
 *     tags: [Formações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Formação encontrada
 *       404:
 *         description: Formação não encontrada
 */
router.get('/:id', formacaoController.buscarFormacao);

/**
 * @swagger
 * /formacoes:
 *   post:
 *     summary: Cadastra uma formação
 *     tags: [Formações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pessoa_id
 *             properties:
 *               pessoa_id:
 *                 type: integer
 *                 example: 2
 *               instituicao:
 *                 type: string
 *                 example: Universidade Federal de Pernambuco
 *               curso:
 *                 type: string
 *                 example: Análise e Desenvolvimento de Sistemas
 *               nivel:
 *                 type: string
 *                 example: Graduação
 *               data_inicio:
 *                 type: string
 *                 format: date
 *                 example: 2023-01-10
 *               data_fim:
 *                 type: string
 *                 format: date
 *                 example: 2025-12-10
 *     responses:
 *       201:
 *         description: Formação cadastrada com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno
 */
router.post('/', formacaoController.criarFormacao);

/**
 * @swagger
 * /formacoes/{id}:
 *   put:
 *     summary: Atualiza uma formação
 *     tags: [Formações]
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
 *                 example: 2
 *               instituicao:
 *                 type: string
 *                 example: Universidade Federal de Pernambuco
 *               curso:
 *                 type: string
 *                 example: Análise e Desenvolvimento de Sistemas
 *               nivel:
 *                 type: string
 *                 example: Graduação
 *               data_inicio:
 *                 type: string
 *                 format: date
 *                 example: 2023-01-10
 *               data_fim:
 *                 type: string
 *                 format: date
 *                 example: 2025-12-10
 *     responses:
 *       200:
 *         description: Formação atualizada
 *       404:
 *         description: Formação não encontrada
 *       500:
 *         description: Erro interno
 */
router.put('/:id', formacaoController.atualizarFormacao);

/**
 * @swagger
 * /formacoes/{id}:
 *   delete:
 *     summary: Exclui uma formação
 *     tags: [Formações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Formação excluída com sucesso
 *       404:
 *         description: Formação não encontrada
 */
router.delete('/:id', formacaoController.excluirFormacao);

module.exports = router;
