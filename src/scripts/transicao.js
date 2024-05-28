
function setaesquerda_trans() {
    document.getElementById('setaesquerda_trans').addEventListener('click', function() {
        var elemento = document.getElementById('elemento');
        if (elemento.classList.contains('classe-original')) {
          elemento.classList.remove('classe-original');
          elemento.classList.add('classe-alterada');
        } else {
          elemento.classList.remove('classe-alterada');
          elemento.classList.add('classe-original');
        }
      });
}