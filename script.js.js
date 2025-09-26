document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById('testBtn');
  const toast = document.getElementById('toast');

  // Adiciona estilo básico do toast
  const style = document.createElement('style');
  style.innerHTML = `
  .toast {
    visibility: hidden;
    min-width: 250px;
    margin-left: -125px;
    background-color: #d6336c;
    color: #fff;
    text-align: center;
    border-radius: 8px;
    padding: 16px;
    position: fixed;
    z-index: 1000;
    left: 50%;
    top: 20px;
    font-size: 16px;
  }
  .toast.show {
    visibility: visible;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
  }
  @keyframes fadein {
    from { top: 0; opacity: 0; } 
    to { top: 20px; opacity: 1; }
  }
  @keyframes fadeout {
    from { top: 20px; opacity: 1; }
    to { top: 0; opacity: 0; }
  }`;
  document.head.appendChild(style);

  // Detecta navegador
  function detectBrowser() {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('instagram')) return 'instagram';
    if (ua.includes('fbav') || ua.includes('facebook')) return 'facebook';
    if (ua.includes('chrome')) return 'chrome';
    if (ua.includes('safari') && !ua.includes('chrome')) return 'safari';
    return 'other';
  }

  function updateButtonState() {
    const browser = detectBrowser();

    if (browser === 'chrome' || browser === 'safari') {
      btn.style.display = 'inline-block'; // mostra botão
    } else {
      btn.style.display = 'none'; // esconde botão
      // Exibe toast apenas uma vez
      toast.innerText = 'Abra no navegador Chrome ou Safari para acessar a aplicação.';
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  }

  // Chama ao carregar
  updateButtonState();

  // Atualiza caso o usuário volte do Instagram/Facebook
  window.addEventListener('focus', updateButtonState);
});
