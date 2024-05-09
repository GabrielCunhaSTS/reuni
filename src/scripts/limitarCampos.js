document.getElementById('ds_nomeAnfitriao').addEventListener('input', function() {

    this.value = this.value.replace(/[0-9]/g, '');
});

document.getElementById('nmr_telefoneAnfitriao').addEventListener('input', function() {

    this.value = this.value.replace(/\D/g, '');
});

document.getElementById('an_anoCriacao').addEventListener('input', function() {

    this.value = this.value.replace(/\D/g, '');
});

document.getElementById('valorMensal').addEventListener('input', function() {
   
    this.value = this.value.replace(/\D/g, '');
});

