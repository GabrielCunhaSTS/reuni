setTimeout(() => {
    const alertElement = document.querySelector('.alert');
    alertElement.classList.add('fade-out');

    setTimeout(() => {
        alertElement.remove();
    }, 2000); 
}, 3000);