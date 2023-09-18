const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger/swagger_output.json';
const endpointsFiles = ['./routes/livros.js', './routes/usuario.js'];

const doc = {
  info: {
    title: 'API do BoardTasks',
    description: 'Documentação da API do BoardTasks.',
    version: '1.0.0',
  },
  host: 'localhost:3000', // Altere para a porta correta se necessário
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Documentação do Swagger gerada em ' + outputFile);
});
