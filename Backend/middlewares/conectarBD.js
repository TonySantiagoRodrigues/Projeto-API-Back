const mongoose = require('mongoose');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados');

async function conectarBancoDados(req, res, next) {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado ao banco de dados!');
    next();
  } catch (error) {
    console.error(error);
    tratarErrosEsperados(res, 'Error: Erro ao conectar no banco de dados');
  }
}

module.exports = conectarBancoDados;
