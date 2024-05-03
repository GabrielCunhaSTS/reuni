 const cepInput = document.getElementById('cep');
 const logradouroInput = document.getElementById('logradouro');
 const bairroInput = document.getElementById('bairro');
 const cidadeInput = document.getElementById('cidade');
 const estadoInput = document.getElementById('estado');

 cepInput.addEventListener('input', function() {


     let cep = cepInput.value.replace(/\D/g, '');

     if (cep.length > 5) {
        cep = cep.replace(/^(\d{5})(\d)/, "$1-$2");
    }
        cepInput.value = cep;
    
     if (cep.length === 9) {
         // faz a requisição para a API de CEPs
         fetch(`https://viacep.com.br/ws/${cep}/json/`)
             .then(response => {
                 if (!response.ok) {
                     throw new Error('CEP não encontrado');
                 }
                 return response.json();
             })
             .then(data => {
                 logradouroInput.value = data.logradouro;
                 bairroInput.value = data.bairro;
                 cidadeInput.value = data.localidade;
                 estadoInput.value = data.uf;
             })
             .catch(error => {
                 console.error('Erro:', error);
                 alert('CEP não encontrado');
             });
     } else {
         logradouroInput.value = '';
         bairroInput.value = '';
         cidadeInput.value = '';
         estadoInput.value = '';
     }
 });