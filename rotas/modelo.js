var fileSystem = require('fs');
const caminhoPersistencia = './persistencia/agenda.json';

var modelo = {
  cadastrarContato: async function(contato) {
    let agenda;

    if (await !fileSystem.existsSync(caminhoPersistencia)) {
      await modelo.criarArquivo();
    }
    
    agenda = await modelo.carregarArquivo();
    agenda.push(contato);
    await modelo.gravarArquivo(agenda);
    return agenda;
  },
  buscarContato: async function(nome) {
    let agenda;

    if (await !fileSystem.existsSync(caminhoPersistencia)) {
      await modelo.criarArquivo();
    }
    
    agenda = await modelo.carregarArquivo();
    return agenda.filter(c => {
      return (c.nome.indexOf(nome) > -1 || nome === "");
    });
  },
  criarArquivo: async function() {
    let agenda = JSON.stringify([]);
    await fileSystem.appendFileSync(caminhoPersistencia, agenda, 'utf8');
  },
  carregarArquivo: async function() {
    let agenda;
    agenda = await fileSystem.readFileSync(caminhoPersistencia, 'utf8');

    if (agenda === "") {
        agenda = "[]";
    }

    return JSON.parse(agenda);
  },
  gravarArquivo: async function(agenda) {
    await fileSystem.writeFileSync(caminhoPersistencia, JSON.stringify(agenda), 'utf8')
  }
};

module.exports = modelo;