
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
 *               empresa:
 *                 type: string
 *                 example: Empresa de Tecnologia
 *               cargo:
 *                 type: string
 *                 example: Desenvolvedor Backend
 *               descricao:
 *                 type: string
 *                 example: Desenvolvimento de APIs REST
 *               data_inicio:
 *                 type: string
 *                 format: date
 *                 example: 2024-01-10
 *               data_fim:
 *                 type: string
 *                 format: date
 *                 example: 2025-06-10
 *     responses:
 *       201:
 *         description: Experiência cadastrada com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno
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
 *               empresa:
 *                 type: string
 *                 example: Empresa de Tecnologia
 *               cargo:
 *                 type: string
 *                 example: Desenvolvedor Backend
 *               descricao:
 *                 type: string
 *                 example: Desenvolvimento de APIs REST
 *               data_inicio:
 *                 type: string
 *                 format: date
 *                 example: 2024-01-10
 *               data_fim:
 *                 type: string
 *                 format: date
 *                 example: 2025-06-10
 *     responses:
 *       200:
 *         description: Experiência atualizada
 *       404:
 *         description: Experiência não encontrada
 *       500:
 *         description: Erro interno
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
 *       404:
 *         description: Experiência não encontrada
 */
router.delete('/:id', experienciaController.excluirExperiencia);

module.exports = router;
