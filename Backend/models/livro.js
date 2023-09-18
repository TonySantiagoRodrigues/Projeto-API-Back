const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  numeroPaginas: {
    type: Number,
    required: true,
  },
  codigoISBN: {
    type: String,
    required: true,
  },
  editora: {
    type: String,
    required: true,
  },
});

const Livro = mongoose.model('Livro', livroSchema);

module.exports = Livro;
