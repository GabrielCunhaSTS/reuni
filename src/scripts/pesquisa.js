document.getElementById('inputSearch').addEventListener('input', async () => {
    const searchTerm = document.getElementById('inputSearch').value.trim(); // Remova espaços em branco no início e no final
    if (searchTerm !== '') {
        try {
            const response = await fetch(`/pesquisa/${searchTerm}`);
            const data = await response.json();
            exibirResultado(data);
        } catch (error) {
            console.error(error);
        }
    } else {
        exibirResultado([]);
    }   
});
function exibirResultado(data) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    if (data.message) {
        resultadoDiv.innerText = data.message;
    } else {
        data.forEach(usuario => {
            const li = document.createElement('li');
            li.classList.add('usuario-item');
            li.innerHTML = `
                <div class="perfil-icon">
                    <!-- Aqui você pode adicionar o ícone do perfil, se necessário. -->
                </div>
                <p class="nome-usuario">${usuario.nm_usu}</p>
                <p class="email-usuario">${usuario.ds_emailUsu}</p>
            `;
            resultadoDiv.appendChild(li);
        });
        resultadoDiv.style.display = 'block';
    }
}