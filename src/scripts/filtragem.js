function filtrarEstado() {
    var form = document.getElementById('filtroForm');
    var selects = form.querySelectorAll('select');
    for (var i = 0; i < selects.length; i++) {
        if (!selects[i].value) {
                selects[i].remove();
        }
    }
    form.submit();
}
