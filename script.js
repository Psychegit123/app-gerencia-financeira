let transacoes = [];
let categorias = ['Alimentação', 'Transporte', 'Salário', 'Lazer'];

const form = document.getElementById('form-transacao');
const descricao = document.getElementById('descricao');
const valor = document.getElementById('valor');
const tipo = document.getElementById('tipo');
const data = document.getElementById('data');
const categoriaSelect = document.getElementById('categoria');
const listaTransacoes = document.getElementById('lista-transacoes');
const saldoEl = document.getElementById('saldo');
const totalReceitasEl = document.getElementById('total-receitas');
const totalDespesasEl = document.getElementById('total-despesas');
const filtroMes = document.getElementById('filtro-mes');
const novaCategoriaInput = document.getElementById('nova-categoria');
const adicionarCategoriaBtn = document.getElementById('adicionar-categoria');

function atualizarCategorias() {
    categoriaSelect.innerHTML = '';
    categorias.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoriaSelect.appendChild(option);
    });
}

function atualizarDashboard() {
    const totalReceitas = transacoes.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + t.valor, 0);
    const totalDespesas = transacoes.filter(t => t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0);
    saldoEl.textContent = `R$ ${(totalReceitas - totalDespesas).toFixed(2)}`;
    totalReceitasEl.textContent = `R$ ${totalReceitas.toFixed(2)}`;
    totalDespesasEl.textContent = `R$ ${totalDespesas.toFixed(2)}`;
}

function renderizarTransacoes() {
    const filtro = filtroMes.value;
    listaTransacoes.innerHTML = '';
    transacoes
        .filter(t => !filtro || t.data.startsWith(filtro))
        .forEach((t, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${t.descricao}</td>
            <td>R$ ${t.valor.toFixed(2)}</td>
            <td>${t.tipo}</td>
            <td>${t.categoria}</td>
            <td>${t.data}</td>
            <td>
                <button onclick="editarTransacao(${index})">Editar</button>
                <button onclick="deletarTransacao(${index})">Excluir</button>
            </td>
        `;
        listaTransacoes.appendChild(tr);
    });
}

function adicionarTransacao(e) {
    e.preventDefault();
    transacoes.push({
        descricao: descricao.value,
        valor: parseFloat(valor.value.replace(/\./g, '').replace(',', '.')),
        tipo: tipo.value,
        categoria: categoriaSelect.value,
        data: data.value
    });
    form.reset();
    atualizarDashboard();
    renderizarTransacoes();
}

function deletarTransacao(index) {
    transacoes.splice(index, 1);
    atualizarDashboard();
    renderizarTransacoes();
}

function editarTransacao(index) {
    const t = transacoes[index];
    descricao.value = t.descricao;
    valor.value = t.valor;
    tipo.value = t.tipo;
    data.value = t.data;
    categoriaSelect.value = t.categoria;

    deletarTransacao(index);
}

function adicionarCategoria() {
    const novaCat = novaCategoriaInput.value.trim();
    if(novaCat && !categorias.includes(novaCat)){
        categorias.push(novaCat);
        atualizarCategorias();
        novaCategoriaInput.value = '';
    }
}

form.addEventListener('submit', adicionarTransacao);
filtroMes.addEventListener('change', renderizarTransacoes);
adicionarCategoriaBtn.addEventListener('click', adicionarCategoria);

atualizarCategorias();
atualizarDashboard();
renderizarTransacoes();
