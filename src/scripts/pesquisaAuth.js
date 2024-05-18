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
        resultadoDiv.innerHTML = '';
        resultadoDiv.style.display = 'none';
    }
});

function exibirResultado(data) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    // <p>Descrição da República: ${republica.Descricao}</p>    
    // <p>Bairro: ${republica.Bairro}</p>

    //----------------teste ja funcionando linakndo com o perfil da rep especifica
    //<a href="/perfil?id=${republica.id}" class="link-perfil">

    data.forEach(republica => {
        const li = document.createElement('li');
        li.classList.add('republica-item');
        li.innerHTML = `
        <div class ="lista" >
            <div class="section-item">
                <a href="/perfil?id=${republica.id}">
                    <div class="img">
                        <img href="/perfil" src="/pexels-timesaverhacks-1080721.jpg" alt="">
                    </div>
                    <div class="content">
                        <div class="title-local">
                            <div>
                                <h1>${republica.nome}</h1> 
                            </div>
                            <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                          </svg><p>${republica.cidade}</p>
                            </div>
                        </div>
                        <div class="valor">
                            <p>R$ ${republica.aluguel} / mês</p>
                        </div>
                        <div class="cards">
                            <div>
                                <img src="image 4.png" alt=""><p>${republica.tipo}</p>
                            </div>
                            <div>
                                <img src="quartos.png" alt=""><p>${republica.quarto}</p>
                            </div>
                            <div>
                                <img src="banheiro.png" alt=""><p>${republica.banheiro}</p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        `;
        resultadoDiv.appendChild(li);
    });

    resultadoDiv.style.display = 'block';
}

