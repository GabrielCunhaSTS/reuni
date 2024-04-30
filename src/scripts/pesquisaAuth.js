document.getElementById('inputSearch').addEventListener('input', async () => {
    const searchTerm = document.getElementById('inputSearch').value.trim();
    if (searchTerm !== '') {
        try {
            const response = await fetch(`/pesquisa/${searchTerm}`);
            const data = await response.json();
            exibirResultado(data);
        } catch (error) {
            console.error(error);
        }
    }
});

function exibirResultado(data) {
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = '';

    data.forEach(republica => {
        const li = document.createElement('li');
        li.classList.add('republica-item');
        li.innerHTML = `
            <p>Nome da República: ${republica.ds_nomeRepublica}</p>
            <p>Descrição da República: ${republica.ds_descricaoRepublica}</p>
            <p>Tipo de República: ${republica.tb_tipoRepublica.ds_tipoRepublica}</p>
            <p>Tipo de Imóvel: ${republica.tb_tipoRepublica.ds_tipoImovel}</p>
            <p>Valor Mensal do Aluguel: ${republica.tb_aluguel.vl_valorMensal}</p>  
        `;
        resultadoDiv.appendChild(li);
    });

    resultadoDiv.style.display = 'block';
}