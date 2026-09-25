// menu mobile
const menuToggle =
  document.getElementById(
    'menuToggle');
const navMobile =
  document.getElementById(
    'navMobile');

menuToggle.addEventListener(
  'click', () => {
    menuToggle.classList
      .toggle('aberto');
    navMobile.classList
      .toggle('aberto');
  }
);

document
  .querySelectorAll(
    '.nav-mobile a')
  .forEach(link => {
    link.addEventListener(
      'click', () => {
        menuToggle.classList
          .remove('aberto');
        navMobile.classList
          .remove('aberto');
      }
    );
  });

// filtro de cardápio
const filtros =
  document
    .querySelectorAll(
      '.filtro');
const produtos =
  document
    .querySelectorAll(
      '.produto');

function aplicarFiltro(
  categoria) {
  produtos.forEach(
    produto => {
      if (
        produto.dataset
          .cat ===
        categoria
      ) {
        produto.classList
          .add('mostrar');
      } else {
        produto.classList
          .remove('mostrar');
      }
    }
  );
}

filtros.forEach(botao => {
  botao.addEventListener(
    'click', () => {
      filtros.forEach(b =>
        b.classList.remove(
          'ativo'));
      botao.classList.add(
        'ativo');
      aplicarFiltro(
        botao.dataset.cat);
    }
  );
});

aplicarFiltro(
  'hamburgueres');

// animação ao rolar a tela
// (conteúdo já nasce visível,
// isso só adiciona o efeito)
const elementosFade =
  document
    .querySelectorAll(
      '.fade-in');

if (
  'IntersectionObserver' in
  window
) {
  const observador =
    new IntersectionObserver(
      entradas => {
        entradas.forEach(
          entrada => {
            if (
              entrada
                .isIntersecting
            ) {
              entrada.target
                .classList.add(
                  'animar');
              observador
                .unobserve(
                  entrada
                    .target);
            }
          }
        );
      },
      { threshold: 0.15 }
    );

  elementosFade.forEach(
    el => observador
      .observe(el));
}

// header some ao rolar pra baixo
const header =
  document.getElementById(
    'header');
let ultimoScroll = 0;

window.addEventListener(
  'scroll', () => {
    const atual =
      window.scrollY;
    if (
      atual > ultimoScroll &&
      atual > 120
    ) {
      header.style
        .transform =
        'translateY(-100%)';
    } else {
      header.style
        .transform =
        'translateY(0)';
    }
    ultimoScroll = atual;
  }
);

// ===== HORÁRIO EM TEMPO REAL =====
// Edite aqui os horários reais
// de cada dia. Use null,null
// pra um dia fechado.
// Formato 24h: "HH:MM"
const horariosSemana = {
  0: { abre: '11:00',
    fecha: '23:00' }, // Dom
  1: { abre: '11:00',
    fecha: '23:00' }, // Seg
  2: { abre: '11:00',
    fecha: '23:00' }, // Ter
  3: { abre: '11:00',
    fecha: '23:00' }, // Qua
  4: { abre: '11:00',
    fecha: '23:00' }, // Qui
  5: { abre: '11:00',
    fecha: '00:00' }, // Sex
  6: { abre: '11:00',
    fecha: '00:00' }  // Sáb
};

const nomesDias = [
  'Domingo', 'Segunda',
  'Terça', 'Quarta',
  'Quinta', 'Sexta',
  'Sábado'
];

function paraMinutos(hora) {
  const partes =
    hora.split(':');
  const h = Number(partes[0]);
  const m = Number(partes[1]);
  return h * 60 + m;
}

function atualizarHorario() {
  const tag =
    document.getElementById(
      'horarioTag');
  const texto =
    document.getElementById(
      'horarioTexto');

  if (!tag || !texto) {
    return;
  }

  const agora = new Date();
  const diaAtual =
    agora.getDay();
  const minutosAgora =
    agora.getHours() * 60 +
    agora.getMinutes();

  const hojeInfo =
    horariosSemana[diaAtual];

  let aberto = false;

  if (
    hojeInfo &&
    hojeInfo.abre &&
    hojeInfo.fecha
  ) {
    const abreMin =
      paraMinutos(
        hojeInfo.abre);
    let fechaMin =
      paraMinutos(
        hojeInfo.fecha);

    if (fechaMin <= abreMin) {
      fechaMin =
        fechaMin + 24 * 60;
    }

    let minutosComparar =
      minutosAgora;
    if (
      minutosAgora < abreMin &&
      fechaMin > 24 * 60
    ) {
      minutosComparar =
        minutosComparar +
        24 * 60;
    }

    aberto =
      minutosComparar >=
        abreMin &&
      minutosComparar 
        fechaMin;
  }

  if (aberto) {
    tag.textContent =
      'Aberto agora';
    tag.classList.remove(
      'fechado');
    texto.textContent =
      'Fecha às ' +
      hojeInfo.fecha;
    return;
  }

  tag.textContent =
    'Fechado';
  tag.classList.add(
    'fechado');

  const aindaNaoAbriu =
    hojeInfo &&
    hojeInfo.abre &&
    minutosAgora 
      paraMinutos(
        hojeInfo.abre);

  if (aindaNaoAbriu) {
    texto.textContent =
      'Abre hoje às ' +
      hojeInfo.abre;
    return;
  }

  let proximoDia =
    (diaAtual + 1) % 7;
  let voltas = 0;

  while (
    voltas < 7 &&
    (!horariosSemana[
      proximoDia] ||
    !horariosSemana[
      proximoDia].abre)
  ) {
    proximoDia =
      (proximoDia + 1) % 7;
    voltas = voltas + 1;
  }

  const proximo =
    horariosSemana[
      proximoDia];

  texto.textContent =
    'Abre ' +
    nomesDias[proximoDia] +
    ' às ' +
    proximo.abre;
}

atualizarHorario();
setInterval(
  atualizarHorario, 60000);
