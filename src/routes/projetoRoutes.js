
const express = require('express');
const router = express.Router();

const projetoController = require('../controllers/projetoController');

/**
 * @swagger
 * tags:
 *   name: Projetos
 *   description: Gerenciamento de projetos profissionais
 */

/**
 * @swagger
 * /projetos:
 *   get:
 *     summary: Lista todos os projetos
 *     tags: [Projetos]
 *     responses:
 *       200:
 *         description: Lista de projetos cadastrados
 */
router.get('/', projetoController.listarProjetos);

/**
 * @swagger
 * /projetos/{id}:
 *   get:
 *     summary: Busca projeto pelo ID
 *     tags: [Projetos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Projeto encontrado
 *       404:
 *         description: Projeto não encontrado
 */
router.get('/:id', projetoController.buscarProjeto);

/**
 * @swagger
 * /projetos:
 *   post:
 *     summary: Cadastra um projeto
 *     tags: [Projetos]
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
 *                 example: Sistema de Currículos
 *               descricao:
 *                 type: string
 *                 example: Desenvolvimento de uma API REST
 *               tecnologias:
 *                 type: string
 *                 example: Node.js, Express, PostgreSQL
 *               url_repositorio:
 *                 type: string
 *                 example: https://github.com/usuario/projeto
 *               url_demo:
 *                 type: string
 *                 example: https://meuprojeto.com
 *               data_inicio:
 *                 type: string
 *                 format: date
 *                 example: '2025-01-10'
 *               data_fim:
 *                 type: string
 *                 format: date
 *                 example: '2025-06-10'
 *     responses:
 *       201:
 *         description: Projeto cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno
 */
router.post('/', projetoController.criarProjeto);

/**
 * @swagger
 * /projetos/{id}:
 *   put:
 *     summary: Atualiza um projeto
 *     tags: [Projetos]
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
 *                 example: Sistema atualizado
 *               descricao:
 *                 type: string
 *                 example: Projeto atualizado
 *               tecnologias:
 *                 type: string
 *                 example: Node.js, PostgreSQL
 *               url_repositorio:
 *                 type: string
 *                 example: https://github.com/usuario/projeto
 *               url_demo:
 *                 type: string
 *                 example: https://meuprojeto.com
 *               data_inicio:
 *                 type: string
 *                 format: date
 *                 example: '2025-01-10'
 *               data_fim:
 *                 type: string
 *                 format: date
 *                 example: '2025-06-10'
 *     responses:
 *       200:
 *         description: Projeto atualizado
 *       404:
 *         description: Projeto não encontrado
 */
router.put('/:id', projetoController.atualizarProjeto);

/**
 * @swagger
 * /projetos/{id}:
 *   delete:
 *     summary: Exclui um projeto
 *     tags: [Projetos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Projeto excluído com sucesso
 *       404:
 *         description: Projeto não encontrado
 */
router.delete('/:id', projetoController.excluirProjeto);

module.exports = router;
