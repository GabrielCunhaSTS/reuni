document.addEventListener('DOMContentLoaded', (event) => {
    // Obtém os elementos do DOM
    var modal = document.getElementById("confirmModalEdit");
    var editButton = document.getElementById("editButton");
    var span = document.getElementsByClassName("closeButton")[0];
    var cancelButton = document.getElementById("cancelButtonEdit");
    var confirmEditButton = document.getElementById("confirmEditButton");

    // Quando o usuário clicar no botão "editar", abre o modal
    editButton.onclick = function () {
        modal.style.display = "block";
    }

    // Quando o usuário clicar no (x), fecha o modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // Quando o usuário clicar no botão "Cancelar", fecha o modal
    cancelButton.onclick = function () {
        modal.style.display = "none";
    }

    // Quando o usuário clicar no botão "Salvar", envia o formulário
    document.getElementById('confirmEditButton').addEventListener('click', function() {
        var nome = document.getElementById('nome').value;
        var email = document.getElementById('email').value;
        var descricao = document.getElementById('descricao').value;
        var image = document.getElementById('profile').value
        localStorage.setItem('nome', nome);
        localStorage.setItem('email', email);
        localStorage.setItem('descricao', descricao);
        localStorage.setItem('profile', image)
        // Redireciona para a página intermediária
        // window.location.href = '/pagina que ele vai depois que apertar salvar';
    });

    // Quando o usuário clicar em qualquer lugar fora do modal, fecha o modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    });