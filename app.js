// Tema claro/escuro e botões de copiar.
(function () {
  var raiz = document.documentElement;
  var aviso = document.getElementById('aviso');
  var temporizador;

  function avisar(texto) {
    aviso.textContent = texto;
    aviso.classList.add('ver');
    clearTimeout(temporizador);
    temporizador = setTimeout(function () { aviso.classList.remove('ver'); }, 1800);
  }

  // Tema: alterna entre claro e escuro e lembra a escolha. Sem escolha salva, segue o sistema.
  document.getElementById('tema').addEventListener('click', function () {
    var escuroAgora = raiz.dataset.theme
      ? raiz.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    var novo = escuroAgora ? 'light' : 'dark';
    raiz.dataset.theme = novo;
    try { localStorage.setItem('tema', novo); } catch (e) { /* modo privado: vale só nesta visita */ }
  });

  // Copiar e-mail. Se o navegador recusar a área de transferência, mostra o endereço para copiar à mão.
  document.querySelectorAll('[data-copiar]').forEach(function (botao) {
    botao.addEventListener('click', function () {
      var texto = botao.getAttribute('data-copiar');
      if (!navigator.clipboard) { avisar(texto); return; }
      navigator.clipboard.writeText(texto).then(
        function () { avisar('E-mail copiado'); },
        function () { avisar(texto); }
      );
    });
  });
})();
