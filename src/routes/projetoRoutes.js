
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
 *     responses:
 *       201:
 *         description: Projeto cadastrado com sucesso
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
 *     responses:
 *       200:
 *         description: Projeto atualizado
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
 */
router.delete('/:id', projetoController.excluirProjeto);

module.exports = router;
