
let animais = [];
let animalEmEdicao = null;

const conteudo = document.getElementById('conteudo');
const btnInicio = document.getElementById('btn-inicio');
const btnAnimais = document.getElementById('btn-animais');
const btnCadastrar = document.getElementById('btn-cadastrar');
const animalDialog = document.getElementById('animal-dialog');
const formAnimal = document.getElementById('form-animal');
const dialogDetalhes = document.getElementById('dialog-detalhes');

async function salvarAnimais() {
  await window.api.salvar(animais);
}

function mostrarHome() {
  btnInicio.classList.add('ativo');
  btnAnimais.classList.remove('ativo');

  conteudo.innerHTML = `
    <section class="home-content">
      <h1 class="titulo-pagina">Bem-vindo ao Adoção Pet!</h1>
      <p class="descricao">Sistema para gerenciamento de animais disponíveis para adoção.</p>
    </section>
  `;
}

function criarCard(animal) {
  const card = document.createElement('article');
  card.className = 'card-animal';
  card.dataset.acao = 'detalhes';
  card.dataset.id = animal.id;

  const info = document.createElement('div');
  info.className = 'animal-info';

  const nome = document.createElement('h2');
  nome.className = 'animal-nome';
  nome.textContent = animal.nome;

  const dados = document.createElement('p');
  dados.className = 'animal-dados';
  dados.textContent = `${animal.especie} • ${animal.faixaEtaria} • ${animal.sexo} • ${animal.porte}`;

  const status = document.createElement('span');
  status.className = 'selo';

  if (animal.status === 'Disponível') {
    status.classList.add('status-disponivel');
  } else {
    status.classList.add('status-adotado');
  }

  status.textContent = animal.status;
  info.append(nome, dados, status);

  const acoes = document.createElement('div');
  acoes.className = 'animal-acoes';

  const editar = document.createElement('button');
  editar.className = 'botao botao-editar';
  editar.textContent = 'Editar';
  editar.addEventListener('click', function () {
    editarAnimal(animal);
  });

  const excluir = document.createElement('button');
  excluir.className = 'botao botao-excluir';
  excluir.textContent = 'Excluir';
  excluir.addEventListener('click', function () {
    excluirAnimal(animal);
  });

  acoes.append(editar, excluir);
  card.append(info, acoes);

  return card;
}

function mostrarAnimais() {
  btnAnimais.classList.add('ativo');
  btnInicio.classList.remove('ativo');

  conteudo.innerHTML = `
    <section class="tela-lista">
      <div class="lista-topo">
        <div>
          <p class="sobretitulo">NOSSO ABRIGO</p>
          <h1 class="titulo-pagina">Animais</h1>
        </div>
        <button id="btn-novo" class="botao botao-principal">+ Cadastrar animal</button>
      </div>
      <div id="lista-animais" class="lista-animais"></div>
    </section>
  `;

  document.getElementById('btn-novo').addEventListener('click', abrirFormulario);

  const lista = document.getElementById('lista-animais');

  if (animais.length === 0) {
    lista.innerHTML = `
      <div class="lista-vazia">
        <h2>Nenhum animal cadastrado</h2>
      </div>
    `;
  }

  for (const animal of animais) {
    lista.appendChild(criarCard(animal));
  }
}

async function excluirAnimal(animal) {
  const confirmou = await window.api.confirmarExclusao(animal.nome);

  if (!confirmou) return;

  animais = animais.filter(function (a) {
    return a.id !== animal.id;
  });

  await salvarAnimais();
  mostrarAnimais();
}

function editarAnimal(animal) {
  animalEmEdicao = animal;

  const campos = formAnimal.elements;

  campos.nome.value = animal.nome;
  campos.especie.value = animal.especie;
  campos.faixaEtaria.value = animal.faixaEtaria;
  campos.sexo.value = animal.sexo;
  campos.porte.value = animal.porte;
  campos.status.value = animal.status;

  document.getElementById('form-title').textContent = 'Editar Animal';
  animalDialog.showModal();
}

function abrirFormulario() {
  animalEmEdicao = null;
  formAnimal.reset();

  document.getElementById('form-title').textContent = 'Cadastrar Animal';
  animalDialog.showModal();
}

function mostrarDetalhes(animal) {
  document.querySelector('#detalhes-nome').textContent = animal.nome;
  document.querySelector('#detalhes-especie').textContent = animal.especie;
  document.querySelector('#detalhes-faixa-etaria').textContent = animal.faixaEtaria;
  document.querySelector('#detalhes-sexo').textContent = animal.sexo;
  document.querySelector('#detalhes-porte').textContent = animal.porte;

  const status = document.querySelector('#detalhes-status');
  status.textContent = animal.status;
  status.className = 'selo ' + (animal.status === 'Disponível' ? 'status-disponivel' : 'status-adotado');

  dialogDetalhes.showModal();
}

async function onSalvar(evento) {
  evento.preventDefault();

  const campos = formAnimal.elements;
  const nome = campos.nome.value.trim();

  if (nome === '') {
    campos.nome.focus();
    return;
  }

  if (animalEmEdicao !== null) {
    animalEmEdicao.nome = nome;
    animalEmEdicao.especie = campos.especie.value;
    animalEmEdicao.faixaEtaria = campos.faixaEtaria.value;
    animalEmEdicao.sexo = campos.sexo.value;
    animalEmEdicao.porte = campos.porte.value;
    animalEmEdicao.status = campos.status.value;
  } else {
    animais.push({
      id: crypto.randomUUID(),
      nome,
      especie: campos.especie.value,
      faixaEtaria: campos.faixaEtaria.value,
      sexo: campos.sexo.value,
      porte: campos.porte.value,
      status: campos.status.value
    });
  }

  await salvarAnimais();

  animalEmEdicao = null;

  animalDialog.close();
  mostrarAnimais();
}

formAnimal.addEventListener('submit', onSalvar);

for (const botao of document.querySelectorAll('[data-fechar]')) {
  botao.addEventListener('click', () => {
    const dialogo = botao.closest('dialog');
    if (dialogo) dialogo.close();
  });
}

btnInicio.addEventListener('click', mostrarHome);
btnAnimais.addEventListener('click', mostrarAnimais);
btnCadastrar.addEventListener('click', abrirFormulario);

conteudo.addEventListener('click', function (evento) {
  if (evento.target.closest('.animal-acoes')) return;

  const botao = evento.target.closest('[data-acao]');
  if (botao === null) return;

  const acao = botao.dataset.acao;
  const id = botao.dataset.id;

  if (acao === 'ver-animais') {
    mostrarAnimais();
    return;
  }

  if (acao === 'detalhes') {
    const animal = animais.find(function (a) {
      return a.id === id;
    });

    if (animal) mostrarDetalhes(animal);
    return;
  }
});

if (window.api.onMenuNovoCadastro) {
  window.api.onMenuNovoCadastro(function () {
    abrirFormulario(null);
  });
}

async function iniciar() {
  try {
    animais = await window.api.carregar();
    mostrarHome();
  } catch (erro) {
    console.error('Erro ao carregar animais:', erro);
    alert('Não foi possível carregar os animais salvos.');
  }
}

iniciar();

