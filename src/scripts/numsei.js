document.querySelectorAll('.btnEsc').forEach((button, index) => {
    button.addEventListener('click', () => {
        // Remove a classe 'clicked' de todos os botões
        document.querySelectorAll('.btnEsc').forEach(btn => btn.classList.remove('clicked'));
        
        // Adiciona a classe 'clicked' ao botão clicado
        button.classList.add('clicked');
        
        // Esconde todas as seções de conteúdo
        document.querySelectorAll('.conteudo').forEach(section => section.style.display = 'none');
        
        // Mostra a seção de conteúdo correspondente ao botão clicado
        document.getElementById(`conteudo${index + 1}`).style.display = 'flex';
    });
});

document.getElementById('editarnome').addEventListener('click', function() {
    var input = document.getElementById('nome');
    if (input.hasAttribute('readonly')) {
        input.removeAttribute('readonly');
    } else {
        input.setAttribute('readonly', 'readonly');
    }
});

document.getElementById('editaremail').addEventListener('click', function() {
    var input = document.getElementById('email');
    if (input.hasAttribute('readonly')) {
        input.removeAttribute('readonly');
    } else {
        input.setAttribute('readonly', 'readonly');
    }
});

document.getElementById('editarsenha').addEventListener('click', function() {
    var input = document.getElementById('senha');
    if (input.hasAttribute('readonly')) {
        input.removeAttribute('readonly');
    } else {
        input.setAttribute('readonly', 'readonly');
    }
});
