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
            <p>Nome da República: ${republica.Nome_da_Republica}</p>
            <p>Descrição da República: ${republica.Descricao}</p>    
            <p>Tipo da Rep: ${republica.Tipo}</p>
            <p>Aluguel mensal: ${republica.Aluguel_Mensal}</p>
            <p>Cidade: ${republica.Cidade}</p>
            <p>Bairro: ${republica.Bairro}</p>
        `;
        resultadoDiv.appendChild(li);
    });

    resultadoDiv.style.display = 'block';
}