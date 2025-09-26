// Seleciona o botão de teste e o toast
const btn = document.getElementById('testBtn');
const toast = document.getElementById('toast');

// Adiciona estilo básico do toast dinamicamente
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

// Função para detectar navegador
function detectBrowser() {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('instagram')) return 'instagram';
  if (ua.includes('fbav') || ua.includes('facebook')) return 'facebook';
  if (ua.includes('chrome')) return 'chrome';
  if (ua.includes('safari') && !ua.includes('chrome')) return 'safari';
  return 'other';
}

// Atualiza estado do botão e exibe toast se necessário
function updateButtonState() {
  const browser = detectBrowser();
  if (browser === 'chrome' || browser === 'safari') {
    btn.style.pointerEvents = 'auto';
    btn.style.opacity = '1';
  } else {
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.6';

    if (!localStorage.getItem('toastShown')) { // mostra toast apenas uma vez
      toast.innerText = 'Abra no navegador Chrome ou Safari para acessar a aplicação.';
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
        localStorage.setItem('toastShown', 'true');
      }, 3000);
    }
  }
}

// Chama a função assim que a página carrega
updateButtonState();

// Caso o usuário volte do Instagram/Facebook para o navegador
window.addEventListener('focus', updateButtonState);
