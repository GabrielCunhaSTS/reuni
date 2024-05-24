function filtrarEstado() {
    var form = document.getElementById('filtroForm');
    var selects = form.querySelectorAll('select');
    for (var i = 0; i < selects.length; i++) {
        if (!selects[i].value) {
                selects[i].remove();
        }
    }

    var precoInput = form.querySelector('input[name="preco"]');
    if (precoInput.value.trim() === "") {
        precoInput.remove();
    }

    form.submit();
}

function limparFiltros() {
    var form = document.getElementById('filtroForm');
    var selects = form.querySelectorAll('select');
    for (var i = 0; i < selects.length; i++) {
        selects[i].selectedIndex = 0;
    }
    form.submit();
}