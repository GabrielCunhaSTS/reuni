document.addEventListener('DOMContentLoaded', (event) => {
    // Obtém os elementos do DOM
var modal = document.getElementById("confirmModal");
var editButton = document.getElementById("editButton");
var closeButton = document.getElementsByClassName("close")[0];
var cancelButton = document.getElementById("cancelButton");
var confirmEditButton = document.getElementById("confirmEditButton");

// Quando o usuário clicar no botão "Salvar", abre o modal
editButton.onclick = function () {
    modal.style.display = "block";
}

// Quando o usuário clicar no (x), fecha o modal
closeButton.onclick = function () {
    modal.style.display = "none";
}

// Quando o usuário clicar no botão "Cancelar", fecha o modal
cancelButton.onclick = function () {
    modal.style.display = "none";
}

// Quando o usuário clicar no botão "Confirmar", envia o formulário
confirmEditButton.onclick = function () {
    document.getElementById("editForm").submit();
}

// Quando o usuário clicar em qualquer lugar fora do modal, fecha o modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
});