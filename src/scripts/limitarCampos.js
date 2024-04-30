document.getElementById('nome').addEventListener('input', function() {

    this.value = this.value.replace(/[0-9]/g, '');
});

document.getElementById('numeroTelefone').addEventListener('input', function() {

    this.value = this.value.replace(/\D/g, '');
});

document.getElementById('Ano').addEventListener('input', function() {

    this.value = this.value.replace(/\D/g, '');
});

document.getElementById('valorMensal').addEventListener('input', function() {
   
    this.value = this.value.replace(/\D/g, '');
});

