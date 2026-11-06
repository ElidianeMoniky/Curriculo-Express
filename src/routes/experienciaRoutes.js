
const express = require('express');
const router = express.Router();

const experienciaController = require('../controllers/experienciaController');

/**
 * @swagger
 * tags:
 *   name: Experiências
 *   description: Gerenciamento de experiências profissionais
 */

/**
 * @swagger
 * /experiencias:
 *   get:
 *     summary: Lista todas as experiências
 *     tags: [Experiências]
 *     responses:
 *       200:
 *         description: Lista de experiências cadastradas
 */
router.get('/', experienciaController.listarExperiencias);

/**
 * @swagger
 * /experiencias/{id}:
 *   get:
 *     summary: Busca experiência pelo ID
 *     tags: [Experiências]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Experiência encontrada
 *       404:
 *         description: Experiência não encontrada
 */
router.get('/:id', experienciaController.buscarExperiencia);

/**
 * @swagger
 * /experiencias:
 *   post:
 *     summary: Cadastra uma experiência
 *     tags: [Experiências]
 *     responses:
 *       201:
 *         description: Experiência cadastrada com sucesso
 */
router.post('/', experienciaController.criarExperiencia);

/**
 * @swagger
 * /experiencias/{id}:
 *   put:
 *     summary: Atualiza uma experiência
 *     tags: [Experiências]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Experiência atualizada
 */
router.put('/:id', experienciaController.atualizarExperiencia);

/**
 * @swagger
 * /experiencias/{id}:
 *   delete:
 *     summary: Exclui uma experiência
 *     tags: [Experiências]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Experiência excluída com sucesso
 */
router.delete('/:id', experienciaController.excluirExperiencia);

module.exports = router;
