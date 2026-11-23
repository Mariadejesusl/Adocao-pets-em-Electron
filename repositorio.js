const fs = require('node:fs/promises');
const path = require('node:path');
const { app } = require('electron');

function caminhoDoArquivo() {
    return path.join(app.getPath('userData'), 'animais.json');
}

async function salvar(animais) {
    const texto = JSON.stringify(animais, null, 2);
    await fs.writeFile(caminhoDoArquivo(), texto, 'utf-8');
}

async function carregar() {
    try {
        const texto = await fs.readFile(caminhoDoArquivo(), 'utf-8');
        return JSON.parse(texto);
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            return [];
        }
        throw erro;
    }
}

module.exports = {
    carregar,
    salvar,
    caminhoDoArquivo
};