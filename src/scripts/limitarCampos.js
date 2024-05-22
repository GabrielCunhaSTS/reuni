document.getElementById('ds_nomeAnfitriao').addEventListener('input', function () {

    this.value = this.value.replace(/[0-9]/g, '');
});

document.getElementById('an_anoCriacao').addEventListener('input', function () {

    this.value = this.value.replace(/\D/g, '');
});

document.getElementById('valorMensal').addEventListener('input', function () {

    this.value = this.value.replace(/\D/g, '');
});

function mascaraTelefone(input) {

    let numero = input.value.replace(/\D/g, '');
    
    if (!numero || (event.inputType === 'deleteContentBackward' || event.keyCode === 8 || event.keyCode === 46)) {
        if (!numero) {
            input.value = '';
            return;
        } else {
            return;
        }
    }
    
    let formato = '(' + numero.substring(0, 2) + ') ' + numero.substring(2, 7) + '-' + numero.substring(7, 11);
    
    input.value = formato;
}

function mascaraCPF(i) {
    var v = i.value;

    if (isNaN(v[v.length - 1])) {
        i.value = v.substring(0, v.length - 1);
        return;
    }

    i.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) i.value += ".";
    if (v.length == 11) i.value += "-";
}