const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const controlador = require('./rotas/controlador');

const app = express();
const home = process.env.deployPath || "";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(home, express.static(path.join(__dirname, 'public')));
app.use(`${home}/servico`, controlador);

app.listen(3000, () => console.log('Agenda app iniciado na porta 3000'));

module.exports = app;