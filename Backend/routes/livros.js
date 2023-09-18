const express = require('express');
const router = express.Router();
const Livro = require('../models/livro'); // Importe o modelo Livro

/**
 * @swagger
 * /livros:
 *   get:
 *     description: Obtém todos os livros.
 *     responses:
 *       200:
 *         description: Livros obtidos com sucesso.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/', async (req, res) => {
  try {
    const livros = await Livro.find();
    res.status(200).send(livros);
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /livros/{id}:
 *   get:
 *     description: Obtém um livro por ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do livro a ser obtido.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Livro obtido com sucesso.
 *       404:
 *         description: Livro não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/:id', async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id);
    
    if (!livro) {
      return res.status(404).send();
    }
    
    res.status(200).send(livro);
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /livros:
 *   post:
 *     description: Cadastra um novo livro.
 *     parameters:
 *       - name: livro
 *         in: body
 *         description: Dados do livro a ser cadastrado.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             titulo:
 *               type: string
 *             numeroPaginas:
 *               type: number
 *             codigoISBN:
 *               type: string
 *             editora:
 *               type: string
 *     responses:
 *       201:
 *         description: Livro cadastrado com sucesso.
 *       400:
 *         description: Requisição inválida.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post('/', async (req, res) => {
  try {
    const livro = new Livro(req.body);
    await livro.save();
    res.status(201).send(livro);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @swagger
 * /livros/{id}:
 *   patch:
 *     description: Edita um livro por ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do livro a ser editado.
 *         required: true
 *         type: string
 *       - name: livro
 *         in: body
 *         description: Dados do livro a serem atualizados.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             titulo:
 *               type: string
 *             numeroPaginas:
 *               type: number
 *             codigoISBN:
 *               type: string
 *             editora:
 *               type: string
 *     responses:
 *       200:
 *         description: Livro editado com sucesso.
 *       400:
 *         description: Requisição inválida.
 *       404:
 *         description: Livro não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['titulo', 'numeroPaginas', 'codigoISBN', 'editora'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Atualizações inválidas!' });
  }

  try {
    const livro = await Livro.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!livro) {
      return res.status(404).send();
    }

    res.status(200).send(livro);
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /livros/{id}:
 *   delete:
 *     description: Deleta um livro por ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do livro a ser deletado.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Livro deletado com sucesso.
 *       404:
 *         description: Livro não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.delete('/:id', async (req, res) => {
  try {
    const livro = await Livro.findByIdAndDelete(req.params.id);

    if (!livro) {
      return res.status(404).send();
    }

    res.status(200).send(livro);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
