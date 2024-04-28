// Seleciona os campos de entrada
const cepInput = document.getElementById('cep');
const logradouroInput = document.getElementById('logradouro');
const bairroInput = document.getElementById('bairro');
const cidadeInput = document.getElementById('cidade');
const estadoInput = document.getElementById('estado');

// Adiciona um ouvinte de evento de entrada ao campo de entrada do CEP
cepInput.addEventListener('input', function() {
    // Obtém o valor atual do campo de entrada do CEP
    const cep = cepInput.value;

    // Verifica se o valor do CEP tem o tamanho correto (8 dígitos)
    if (cep.length === 8) {
        // Faz a requisição para a API de CEPs
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('CEP não encontrado');
                }
                return response.json();
            })
            .then(data => {
                // Preenche os campos com os dados do CEP
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
        // Se o comprimento do CEP não for 8, limpa os campos
        logradouroInput.value = '';
        bairroInput.value = '';
        cidadeInput.value = '';
        estadoInput.value = '';
    }
})