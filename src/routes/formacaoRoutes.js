
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
 *     responses:
 *       201:
 *         description: Formação cadastrada com sucesso
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
 *     responses:
 *       200:
 *         description: Formação atualizada
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
 */
router.delete('/:id', formacaoController.excluirFormacao);

module.exports = router;
