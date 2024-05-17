document.addEventListener('DOMContentLoaded', (event) => {
    // Obtém os elementos do DOM
    var modal = document.getElementById("confirmModal");
    var btn = document.getElementById("deleteButton");
    var span = document.getElementsByClassName("close")[0];
    var cancelButton = document.getElementById("cancelButton");
    var confirmDeleteButton = document.getElementById("confirmDeleteButton");

    // Quando o usuário clicar no botão, abre o modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // Quando o usuário clicar no (x), fecha o modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Quando o usuário clicar no botão cancelar, fecha o modal
    cancelButton.onclick = function() {
        modal.style.display = "none";
    }

    // Quando o usuário clicar no botão confirmar, envia o formulário
    confirmDeleteButton.onclick = function() {
        document.getElementById("deleteForm").submit();
        document.getElementById("editForm   ").submit();
    }

    // Quando o usuário clicar em qualquer lugar fora do modal, fecha o modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});