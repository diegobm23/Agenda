var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var controlador = require('./rotas/controlador');

var app = express();
var home = process.env.deployPath || "";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(home, express.static(path.join(__dirname, 'public')));
app.use(home + '/servico', controlador);

app.listen(3000, function () {
  console.log('Agenda app iniciado na porta 3000');
});

module.exports = app;