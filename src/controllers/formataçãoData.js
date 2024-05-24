const ptBR = {
    formatDistance: function (token, count, options) {
      if (token === 'lessThanXMinutes') {
        return 'há menos de um minuto';
      } else if (token === 'xMinutes') {
        return `${count} minutos atrás`;
      } else if (token === 'aboutXHours') {
        return `aproximadamente ${count} horas atrás`;
      } else if (token === 'xHours') {
        return `${count} horas atrás`;
      } else if (token === 'xDays') {
        return `${count} dias atrás`;
      } else if (token === 'aboutXMonths') {
        return `aproximadamente ${count} meses atrás`;
      } else if (token === 'xMonths') {
        return `${count} meses atrás`;
      } else if (token === 'aboutXYears') {
        return `aproximadamente ${count} anos atrás`;
      } else if (token === 'xYears') {
        return `${count} anos atrás`;
      } else {
        return `há um tempo`;
      }
    }
  };
  
  module.exports = ptBR;
  