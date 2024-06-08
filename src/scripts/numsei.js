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
