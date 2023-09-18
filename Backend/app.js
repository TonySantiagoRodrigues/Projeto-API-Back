require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const jwt = require('jsonwebtoken');
const tratarErrosEsperados = require('./functions/tratarErrosEsperados');
const conectarBancoDados = require('./middlewares/conectarBD');
const UserRouter = require('./routes/usuario');
const LivrosRouter = require('./routes/livros');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const swaggerDocument = require('./swagger/swagger_output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/usuarios', UserRouter);
app.use('/livros', LivrosRouter);

app.get('/', (req, res) => {
  res.send('Bem-vindo à minha API!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
