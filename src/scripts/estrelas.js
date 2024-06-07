document.addEventListener('DOMContentLoaded', () => {
    const counts = document.querySelectorAll('.count');
    const ratingInput = document.getElementById('rating');
    let rating = 0;

    counts.forEach(count => {
        count.addEventListener('mouseover', handleMouseOver);
        count.addEventListener('mouseout', handleMouseOut);
        count.addEventListener('click', handleClick);
    });

    function handleMouseOver(event) {
        const value = parseInt(event.target.closest('.count').dataset.value);
        highlightStars(value);
    }

    function handleMouseOut() {
        highlightStars(rating);
    }

    function handleClick(event) {
        event.preventDefault(); // Impede que o botão execute a ação padrão de submit
        rating = parseInt(event.target.closest('.count').dataset.value);
        ratingInput.value = rating;
        highlightStars(rating);
    }

    function highlightStars(value) {
        counts.forEach(count => {
            const starValue = parseInt(count.dataset.value);
            if (starValue <= value) {
                count.querySelector('img').src = '/Star 46.png';
            } else {
                count.querySelector('img').src = '/Star 4.png';
            }
        });
    }
});

//Controlador do tamnho da barra de stars na rep
document.addEventListener('DOMContentLoaded', () => {
    // Selecione os elementos com a classe .stars-1, .stars-2, .stars-3, .stars-4 e .stars-5
    const stars1 = document.querySelector('.stars .value-stars .stars-1 div');
    const stars2 = document.querySelector('.stars .value-stars .stars-2 div');
    const stars3 = document.querySelector('.stars .value-stars .stars-3 div');
    const stars4 = document.querySelector('.stars .value-stars .stars-4 div');
    const stars5 = document.querySelector('.stars .value-stars .stars-5 div');

    // Defina o valor desejado para o width
    stars1.style.width = '76px';
    stars2.style.width = '405px';
    stars3.style.width = '277px';
    stars4.style.width = '464px';
    stars5.style.width = '429px';
});
