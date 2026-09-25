// ======================
// EDITE AQUI OS PRODUTOS,
// PREÇOS E DESCRIÇÕES
// preco em número, ex: 25.90
// ======================
const produtos = [
  {
    id: 1,
    nome:
      'Hambúrguer Premium',
    categoria:
      'hamburgueres',
    preco: 0,
    desc:
      'Blend selecionado, ' +
      'queijo derretido e ' +
      'molho da casa.'
  },
  {
    id: 2,
    nome: 'Arroxado',
    categoria:
      'hamburgueres',
    preco: 0,
    desc:
      'Pão roxo, receita ' +
      'exclusiva Rustik.'
  },
  {
    id: 3,
    nome:
      'Hambúrguer Vegano',
    categoria:
      'vegetarianos',
    preco: 0,
    desc:
      'Sabor de verdade, ' +
      'sem carne animal.'
  },
  {
    id: 4,
    nome:
      'Milk-shake de ' +
      'Leite Ninho',
    categoria:
      'milkshakes',
    preco: 0,
    desc:
      'Cremoso e geladinho.'
  },
  {
    id: 5,
    nome:
      '[ Nome do combo ]',
    categoria: 'combos',
    preco: 0,
    desc:
      '[ Descrição a ' +
      'preencher ]'
  },
  {
    id: 6,
    nome:
      '[ Nome do ' +
      'acompanhamento ]',
    categoria:
      'acompanhamentos',
    preco: 0,
    desc:
      '[ Descrição a ' +
      'preencher ]'
  },
  {
    id: 7,
    nome:
      '[ Nome da bebida ]',
    categoria: 'bebidas',
    preco: 0,
    desc:
      '[ Descrição a ' +
      'preencher ]'
  }
];

const carrinho = {};
let categoriaAtiva =
  'hamburgueres';

function formatarPreco(
  valor) {
  return 'R$ ' +
    valor.toFixed(2)
      .replace('.', ',');
}

function renderizarProdutos() {
  const grid =
    document.getElementById(
      'gridProdutos');
  grid.innerHTML = '';

  const filtrados =
    produtos.filter(
      p => p.categoria ===
        categoriaAtiva);

  filtrados.forEach(
    produto => {
      const qtd =
        carrinho[
          produto.id] || 0;

      const card =
        document
          .createElement(
            'div');
      card.className =
        'produto';

      card.innerHTML =
        '<div class="' +
        'produto-img">' +
        '[ Foto: ' +
        produto.nome +
        ' ]</div>' +
        '<div class="' +
        'produto-info">' +
        '<h3>' +
        produto.nome +
        '</h3>' +
        '<p>' +
        produto.desc +
        '</p>' +
        '<div class="' +
        'produto-rodape">' +
        '<span class="' +
        'preco">' +
        formatarPreco(
          produto.preco) +
        '</span>' +
        '<div class="' +
        'qtd-controle">' +
        '<button class="' +
        'qtd-btn" ' +
        'data-acao="menos" ' +
        'data-id="' +
        produto.id +
        '">-</button>' +
        '<span class="' +
        'qtd-numero">' +
        qtd +
        '</span>' +
        '<button class="' +
        'qtd-btn" ' +
        'data-acao="mais" ' +
        'data-id="' +
        produto.id +
        '">+</button>' +
        '</div></div></div>';

      grid.appendChild(card);
    }
  );

  document
    .querySelectorAll(
      '.qtd-btn')
    .forEach(botao => {
      botao
        .addEventListener(
          'click', () => {
            const id =
              Number(
                botao.dataset
                  .id);
            const acao =
              botao.dataset
                .acao;

            if (
              acao === 'mais'
            ) {
              carrinho[id] =
                (carrinho[
                  id] || 0) +
                1;
            } else {
              carrinho[id] =
                (carrinho[
                  id] || 0) -
                1;
              if (
                carrinho[id]
                  <= 0
              ) {
                delete
                  carrinho[
                    id];
              }
            }

            renderizarProdutos();
            atualizarCarrinho();
          }
        );
    });
}

function atualizarCarrinho() {
  let qtdTotal = 0;
  let valorTotal = 0;

  Object.keys(carrinho)
    .forEach(id => {
      const produto =
        produtos.find(
          p => p.id ===
            Number(id));
      const qtd =
        carrinho[id];
      qtdTotal += qtd;
      valorTotal +=
        qtd * produto.preco;
    });

  document.getElementById(
    'carrinhoQtd')
    .textContent =
    qtdTotal + ' ' +
    (qtdTotal === 1 ?
      'item' : 'itens');

  document.getElementById(
    'carrinhoTotal')
    .textContent =
    formatarPreco(
      valorTotal);

  const barra =
    document.getElementById(
      'carrinhoBarra');

  if (qtdTotal > 0) {
    barra.classList.add(
      'ativo');
  } else {
    barra.classList.remove(
      'ativo');
  }
}

// filtros de categoria
document
  .querySelectorAll(
    '.filtro')
  .forEach(botao => {
    botao
      .addEventListener(
        'click', () => {
          document
            .querySelectorAll(
              '.filtro')
            .forEach(b =>
              b.classList
                .remove(
                  'ativo'));
          botao.classList
            .add('ativo');
          categoriaAtiva =
            botao.dataset
              .cat;
          renderizarProdutos();
        }
      );
  });

// finalizar no WhatsApp
document.getElementById(
  'btnFinalizar')
  .addEventListener(
    'click', () => {
      const idsCarrinho =
        Object.keys(
          carrinho);

      if (
        idsCarrinho.length
          === 0
      ) {
        return;
      }

      let mensagem =
        'Olá! Quero fazer ' +
        'o seguinte pedido:' +
        '%0A%0A';
      let valorTotal = 0;

      idsCarrinho.forEach(
        id => {
          const produto =
            produtos.find(
              p => p.id ===
                Number(id));
          const qtd =
            carrinho[id];
          const subtotal =
            qtd *
            produto.preco;
          valorTotal +=
            subtotal;

          mensagem +=
            '- ' + qtd +
            'x ' +
            produto.nome +
            ' - ' +
            formatarPreco(
              subtotal) +
            '%0A';
        }
      );

      mensagem +=
        '%0ATotal: ' +
        formatarPreco(
          valorTotal);

      window.open(
        'https://wa.me/' +
        '5582996461076' +
        '?text=' +
        mensagem,
        '_blank'
      );
    }
  );

renderizarProdutos();
atualizarCarrinho();