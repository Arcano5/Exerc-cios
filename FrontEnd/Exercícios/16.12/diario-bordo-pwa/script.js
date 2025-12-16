// ========== SERVICE WORKER ==========
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      // IMPORTANTE: Use caminho relativo explícito
      navigator.serviceWorker.register('./service-worker.js', {
        scope: './' // Escopo explícito
      })
      .then(function(registration) {
        console.log('✅ Service Worker registrado com sucesso:', registration.scope);
        
        // Verificar se há atualização
        registration.onupdatefound = function() {
          const installingWorker = registration.installing;
          installingWorker.onstatechange = function() {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                console.log('🔄 Nova versão disponível!');
                // Aqui você pode mostrar um botão para atualizar
              } else {
                console.log('✅ Conteúdo cacheado para uso offline');
              }
            }
          };
        };
      })
      .catch(function(error) {
        console.log('❌ Falha no registro do Service Worker:', error);
      });
    });
  }
}

// ========== VERIFICAR INSTALAÇÃO PWA ==========
function checkPWAInstallation() {
  let deferredPrompt;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Mostrar botão de instalação
    console.log('📱 PWA pode ser instalado!');
    
    // Você pode adicionar um botão de instalação
    const installBtn = document.createElement('button');
    installBtn.id = 'installPWA';
    installBtn.innerHTML = '📲 Instalar App';
    installBtn.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: #10b981;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    installBtn.onclick = () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ Usuário instalou o PWA');
        }
        deferredPrompt = null;
      });
    };
    document.body.appendChild(installBtn);
  });
  
  // Detecta se já está instalado
  window.addEventListener('appinstalled', () => {
    console.log('🎉 PWA instalado com sucesso!');
    const installBtn = document.getElementById('installPWA');
    if (installBtn) installBtn.remove();
  });
}

// ========== INICIALIZAR TUDO ==========
document.addEventListener("DOMContentLoaded", function() {
  // 1. Registrar Service Worker
  registerServiceWorker();
  
  // 2. Verificar instalação PWA
  checkPWAInstallation();
  
  // 3. Inicializar tema (seu código existente)
  inicializarTema();
  
  // 4. Resto do seu código do diário...
  // ... continue com seu código atual ...
});
// CONFIGURAÇÃO DO TEMA
function inicializarTema() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const themeText = themeToggle.querySelector('.theme-text');
    
    // Verificar preferência salva ou do sistema
    const temaSalvo = localStorage.getItem('diarioTema');
    const prefereEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Definir tema inicial
    if (temaSalvo === 'dark' || (!temaSalvo && prefereEscuro)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Modo Claro';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Modo Escuro';
    }
    
    // Evento do botão
    themeToggle.addEventListener('click', function() {
        const temaAtual = document.documentElement.getAttribute('data-theme');
        const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
        const novoIcone = temaAtual === 'dark' ? '🌙' : '☀️';
        const novoTexto = temaAtual === 'dark' ? 'Modo Escuro' : 'Modo Claro';
        
        // Trocar tema
        document.documentElement.setAttribute('data-theme', novoTema);
        localStorage.setItem('diarioTema', novoTema);
        
        // Atualizar ícone e texto
        themeIcon.textContent = novoIcone;
        themeText.textContent = novoTexto;
    });
}

// DIÁRIO DE BORDO
document.addEventListener("DOMContentLoaded", function() {
    // Inicializar tema
    inicializarTema();
    
    const formulario = document.getElementById("diarioForm");
    const inputTitulo = document.getElementById("entryTitulo");
    const inputDescricao = document.getElementById("entryDescricao");
    const inputData = document.getElementById("entryData");
    const listaEntradas = document.getElementById("entryList");

    carregarEntradas();

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const titulo = inputTitulo.value;
        const descricao = inputDescricao.value;
        const data = inputData.value;

        if (!titulo || !descricao || !data) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const novaEntrada = {
            id: Date.now(),
            titulo: titulo,
            descricao: descricao,
            data: data
        };
        
        salvarEntrada(novaEntrada);
        formulario.reset();
    });

    function salvarEntrada(entrada) {
        let entradas = JSON.parse(localStorage.getItem("diarioEntradas")) || [];
        entradas.push(entrada);
        localStorage.setItem("diarioEntradas", JSON.stringify(entradas));
        adicionarEntradaNaLista(entrada);
    }

    function carregarEntradas() {
        let entradas = JSON.parse(localStorage.getItem("diarioEntradas")) || [];
        listaEntradas.innerHTML = "";
        entradas.forEach(adicionarEntradaNaLista);
    }

function adicionarEntradaNaLista(entrada) {
    const li = document.createElement("li");
    li.id = `entrada-${entrada.id}`;
    
    // CORREÇÃO DO FUSO HORÁRIO
    // Método 1: Ajustar a data adicionando o fuso horário
    const dataObj = new Date(entrada.data + 'T00:00:00');
    const dataFormatada = dataObj.toLocaleDateString('pt-BR');
    
    // OU Método 2 (mais simples): Usar a data diretamente
    // const dataFormatada = entrada.data.split('-').reverse().join('/');
    
    li.innerHTML = `
        <div class="entrada-item">
            <strong>${entrada.titulo}</strong>
            <span class="data">${dataFormatada}</span>
            <p>${entrada.descricao}</p>
            <button onclick="removerEntrada(${entrada.id})" class="btn-remover">Remover</button>
        </div>
    `;
    
    listaEntradas.appendChild(li);
}

    function removerEntrada(id) {
        let entradas = JSON.parse(localStorage.getItem("diarioEntradas")) || [];
        entradas = entradas.filter(entrada => entrada.id !== id);
        localStorage.setItem("diarioEntradas", JSON.stringify(entradas));
        
        const elemento = document.getElementById(`entrada-${id}`);
        if (elemento) {
            elemento.remove();
        }
    }

    // Tornar removerEntrada acessível globalmente
    window.removerEntrada = removerEntrada;
});


if ('serviceWorker' in navigator) {
  console.log('✅ Service Worker suportado');
} else {
  console.log('❌ Service Worker NÃO suportado');
}