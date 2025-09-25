// Seleciona elementos
const btn = document.getElementById('testBtn');
const toast = document.createElement('div');
toast.id = 'toast';
toast.className = 'toast';
toast.innerText = 'Abra no navegador Chrome ou Safari para acessar a aplicação.';
document.body.appendChild(toast);

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
  bottom: 30px;
  font-size: 16px;
}
.toast.show {
  visibility: visible;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}
@keyframes fadein {
  from { bottom: 0; opacity: 0; } 
  to { bottom: 30px; opacity: 1; }
}
@keyframes fadeout {
  from { bottom: 30px; opacity: 1; }
  to { bottom: 0; opacity: 0; }
}`;
document.head.appendChild(style);

// Função para detectar navegador
function detectBrowser() {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('instagram')) return 'instagram';
  if (ua.includes('chrome')) return 'chrome';
  if (ua.includes('safari') && !ua.includes('chrome')) return 'safari';
  return 'other';
}

const browser = detectBrowser();

// Habilita/desabilita botão
if (browser === 'chrome' || browser === 'safari') {
  btn.style.pointerEvents = 'auto';
  btn.style.opacity = '1';
} else {
  btn.style.pointerEvents = 'none';
  btn.style.opacity = '0.6';

  // Exibe toast
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
