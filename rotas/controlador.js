const express = require('express');
const { cadastrar, buscar } = require('./modelo');
const router = express.Router();

router.get('/contato', async (req, res) => {
  const resposta = await buscar(req.query.nome)
  res.setHeader('Content-Type', 'application/json;charset=utf-8');
  res.jsonp(resposta);
});

router.post('/contato', async (req, res) => {
  const resposta = await cadastrar(req.body.data);
  res.setHeader('Content-Type', 'application/json;charset=utf-8');
  res.jsonp(resposta);
});

module.exports = router;