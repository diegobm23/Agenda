const fileSystem = require('fs');
const { promisify } = require('util');
const caminhoPersistencia = './persistencia/agenda.json';

const appendFile = promisify(fileSystem.appendFile);
const writeFile = promisify(fileSystem.writeFile);
const exists = promisify(fileSystem.exists);
const readFile = promisify(fileSystem.readFile);

const criarArquivo = async () => {
  let agenda = JSON.stringify([]);
  await appendFile(caminhoPersistencia, agenda, 'utf8');
};

const gravarArquivo = async (agenda) => {
  await writeFile(caminhoPersistencia, JSON.stringify(agenda), 'utf8');
};

const carregarArquivo = async () => {
  let agenda = await readFile(caminhoPersistencia, 'utf8');

  if (agenda === '') {
    agenda = '[]';
  }

  return JSON.parse(agenda);
};

const cadastrar = async (contato) => {
  if (!(await exists(caminhoPersistencia))) {
    await criarArquivo();
  }

  let agenda = await carregarArquivo();

  agenda.push(contato);
  await gravarArquivo(agenda);

  return agenda;
};

const buscar = async (nome) => {
  if (!(await exists(caminhoPersistencia))) {
    await criarArquivo();
  }

  let agenda = await carregarArquivo();

  return agenda.filter((registro) => registro.nome.indexOf(nome) > -1 || nome === "");
}

module.exports = {
  cadastrar,
  buscar,
};