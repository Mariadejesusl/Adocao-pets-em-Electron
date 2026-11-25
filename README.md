# 🐾 Adoção Pet

Sistema desktop desenvolvido com **Electron**, JavaScript, HTML e CSS para o gerenciamento de animais disponíveis para adoção.

A aplicação permite cadastrar, visualizar, editar e excluir animais, além de acompanhar a situação de cada um (disponível ou adotado). Os dados são armazenados localmente em um arquivo JSON.

## ✨ Funcionalidades

- **Página inicial:** apresenta a tela de boas-vindas do sistema.
- **Cadastro de animais:** permite registrar um animal informando:
  - Nome;
  - Espécie (cachorro ou gato);
  - Faixa etária;
  - Sexo;
  - Porte;
  - Status (disponível ou adotado).
- **Listagem:** exibe os animais cadastrados e suas principais informações.
- **Detalhes:** permite consultar as informações completas de um animal.
- **Edição:** permite alterar os dados de um animal já cadastrado.
- **Exclusão:** permite excluir um cadastro após uma confirmação.
- **Persistência local:** mantém os dados salvos entre as execuções do aplicativo.

## 🛠️ Tecnologias utilizadas

- **Electron:** criação da aplicação desktop.
- **HTML5:** estrutura das telas e formulários.
- **CSS3:** estilização e apresentação visual.
- **JavaScript:** lógica e interatividade da aplicação.
- **Node.js:** acesso aos recursos do sistema e manipulação de arquivos.
- **JSON:** formato utilizado para armazenar os cadastros.

## 📋 Pré-requisitos

Antes de executar o projeto, instale:

- [Node.js](https://nodejs.org/) (que inclui o npm).

## 🚀 Como instalar e executar

1. Faça o download ou clone este repositório.
2. Abra o terminal na pasta raiz do projeto, onde está localizado o arquivo `package.json`.
3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie a aplicação:

   ```bash
   npm start
   ```

## 📁 Estrutura do projeto

```text
Adocao-pets-em-Electron-main/
├── src/
│   ├── index.html       # Estrutura da interface
│   ├── renderer.js      # Funcionalidades e interações da interface
│   └── style.css        # Estilos da aplicação
├── main.js              # Processo principal do Electron e criação da janela
├── preload.js           # Comunicação segura entre a interface e o processo principal
├── repositorio.js       # Leitura e gravação dos dados em JSON
├── package.json         # Configurações e dependências do projeto
├── package-lock.json    # Registro das versões das dependências
└── .gitignore           # Arquivos e pastas ignorados pelo Git
```

## 💾 Armazenamento dos dados

Os animais são armazenados no arquivo `animais.json`, criado automaticamente na pasta de dados do usuário disponibilizada pelo Electron (`app.getPath('userData')`).

O módulo `repositorio.js` é responsável por salvar e carregar os registros. Caso o arquivo ainda não exista, a aplicação inicia com uma lista vazia.

## ⌨️ Atalho do aplicativo

| Atalho | Ação |
|---|---|
| `Ctrl + N` (Windows/Linux) ou `Command + N` (macOS) | Abrir o formulário de novo cadastro |

O atalho está disponível no menu **Arquivo → Novo Cadastro**.

## 🔐 Comunicação entre processos

O projeto utiliza o recurso `contextBridge` do Electron no arquivo `preload.js` para disponibilizar funções específicas à interface. A comunicação com o processo principal é realizada por IPC (`ipcRenderer.invoke` e `ipcMain.handle`).

A opção `contextIsolation` está habilitada na criação da janela.

## 📌 Observações

- O aplicativo funciona como uma aplicação desktop.
- Os dados são armazenados localmente no computador em que o aplicativo é executado.

## 👩‍💻 Desenvolvimento

Projeto desenvolvido para gerenciamento de animais para adoção.
