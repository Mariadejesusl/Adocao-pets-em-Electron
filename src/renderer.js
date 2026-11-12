let animais = [];

const conteudo = document.getElementById('conteudo');
const btnInicio = document.getElementById('btn-inicio');
const btnAnimais = document.getElementById('btn-animais');
const animalDialog = document.getElementById('animal-dialog');
const formAnimal = document.getElementById('form-animal');

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

  const excluir = document.createElement('button');
  excluir.className = 'botao botao-excluir';
  excluir.textContent = 'Excluir';
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

function abrirFormulario() {
  formAnimal.reset();
  animalDialog.showModal();
}

function onSalvar(evento) {
  evento.preventDefault();
  const campos = formAnimal.elements;
  const nome = campos.nome.value.trim();
  if (nome === '') {
    campos.nome.focus();
    return;
  }

  animais.push({
    id: crypto.randomUUID(),
    nome,
    especie: campos.especie.value,
    faixaEtaria: campos.faixaEtaria.value,
    sexo: campos.sexo.value,
    porte: campos.porte.value,
    status: campos.status.value
  });

  animalDialog.close();
  mostrarAnimais();
}
formAnimal.addEventListener('submit', onSalvar);

for (const botao of document.querySelectorAll('[data-fechar]')) {
  botao.addEventListener('click', () => animalDialog.close());
}

btnInicio.addEventListener('click', mostrarHome);
btnAnimais.addEventListener('click', mostrarAnimais);

mostrarAnimais();