document.getElementById('inputSearch').addEventListener('input', async () => {
    const searchTerm = document.getElementById('inputSearch').value.trim();
    const resultadoDiv = document.getElementById('resultado');

    if (searchTerm !== '') {
        try {
            const response = await fetch(`/pesquisa/${searchTerm}`);
            const data = await response.json();
            exibirResultado(data);
        } catch (error) {
            console.error(error);
        }
    } else {
        // Limpar os resultados
        resultadoDiv.innerHTML = '';
        resultadoDiv.style.display = 'none';
    }
});

function exibirResultado(data) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    data.forEach(republica => {
        const li = document.createElement('li');
        li.classList.add('republica-item');
        li.innerHTML = `
        <div style="display: flex; flex-direction: row; background-color: #000; width: 410px; height: 150px;">
            <div style="width: 30%; background-color: #ccc; height: 100%;">
            <img src="" style="width: 100%; height: 100%;">
            </div>
            <div style="display: flex; flex-direction: column; width: 70%;">
                <div style="width:100%; height: 35%;">
                    <div style="display: flex; flex-direction: column;">
                        <h1>Nome bem genérico</h1>
                        <div style="display: flex; flex-direction: row;">
                            <img><p>Amazonas</p>
                        </div>
                    </div>
                    <div>
                        <img>
                    </div>
                </div>
                <div style="width:100%; height: 30%; background-color: #fff;">
                    
                </div>
                <div style="width:100%; height: 35%; background-color: #000;">
                    
                </div>
            </div>

        </div>
        `;
        resultadoDiv.appendChild(li);
    });

    resultadoDiv.style.display = 'block';
}
