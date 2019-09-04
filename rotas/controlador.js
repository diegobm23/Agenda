var express = require('express');
var modelo = require('./modelo');
var router = express.Router();

router.get('/contato', async function(req, res) {
    const resposta = await modelo.buscarContato(req.query.nome)
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.jsonp(resposta);
});

router.post('/contato', async function(req, res) {
    const resposta = await modelo.cadastrarContato(req.body.data);
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.jsonp(resposta);
});
module.exports = router;