
const express = require('express');
const router = express.Router();

const pessoaController = require('../controllers/pessoaController');

/**
 * @swagger
 * tags:
 *   name: Pessoas
 *   description: Gerenciamento de pessoas
 */

/**
 * @swagger
 * /pessoas:
 *   get:
 *     summary: Lista todas as pessoas
 *     tags: [Pessoas]
 *     responses:
 *       200:
 *         description: Lista de pessoas
 */
router.get('/', pessoaController.listarPessoas);

/**
 * @swagger
 * /pessoas/{id}:
 *   get:
 *     summary: Busca pessoa pelo ID
 *     tags: [Pessoas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pessoa encontrada
 *       404:
 *         description: Pessoa não encontrada
 */
router.get('/:id', pessoaController.buscarPessoa);

/**
 * @swagger
 * /pessoas:
 *   post:
 *     summary: Cadastra uma pessoa
 *     tags: [Pessoas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João da Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               telefone:
 *                 type: string
 *                 example: (81) 99999-9999
 *               endereco:
 *                 type: string
 *                 example: Recife - PE
 *               resumo:
 *                 type: string
 *                 example: Desenvolvedor Web
 *     responses:
 *       201:
 *         description: Pessoa cadastrada
 *       400:
 *         description: Dados obrigatórios ausentes
 *       409:
 *         description: E-mail já cadastrado
 */
router.post('/', pessoaController.criarPessoa);

/**
 * @swagger
 * /pessoas/{id}:
 *   put:
 *     summary: Atualiza uma pessoa
 *     tags: [Pessoas]
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
 *             required:
 *               - nome
 *               - email
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João da Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               telefone:
 *                 type: string
 *                 example: (81) 99999-9999
 *               endereco:
 *                 type: string
 *                 example: Recife - PE
 *               resumo:
 *                 type: string
 *                 example: Desenvolvedor Full Stack
 *     responses:
 *       200:
 *         description: Pessoa atualizada
 *       404:
 *         description: Pessoa não encontrada
 */
router.put('/:id', pessoaController.atualizarPessoa);

/**
 * @swagger
 * /pessoas/{id}:
 *   delete:
 *     summary: Exclui uma pessoa
 *     tags: [Pessoas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pessoa excluída
 *       404:
 *         description: Pessoa não encontrada
 */
router.delete('/:id', pessoaController.excluirPessoa);

module.exports = router;
