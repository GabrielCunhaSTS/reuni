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
                <div class="img">
                    <img href="/perfil" src="/pexels-timesaverhacks-1080721.jpg" alt="">
                </div>
            <div class="content">
                <div class="title-local">
                    <div>
                        <h1>${republica.nome}</h1> 
                        <img src="heart (4) 1.png" alt="" class="cora">
                    </div>
                    <div>
                        <img src="/location 1.png" alt=""><p>${republica.cidade}</p>
                    </div>
                </div>
                <div class="valor">
                    <p>R$ ${republica.aluguel}</p>
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
        </div>
    </div>
        `;
        resultadoDiv.appendChild(li);
    });

    resultadoDiv.style.display = 'block';
}
