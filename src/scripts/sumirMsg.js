// Adicionando a classe fade-out após 5 segundos
setTimeout(() => {
    document.querySelector('.alert').classList.add('fade-out');
}, 5000);

// Removendo a mensagem do DOM após a transição
setTimeout(() => {
    document.querySelector('.alert').remove();
}, 5500);
