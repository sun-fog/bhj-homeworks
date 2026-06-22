
  document.addEventListener('DOMContentLoaded', function() {
    // Получаем список всех блоков показных
    const reveals = document.querySelectorAll('.reveal');

    // Гарантируем, что все показные блоки изначально скрыты
    reveals.forEach(element => {
      element.classList.remove('reveal_active');
    });

    function checkReveal() {
      const windowHeight = window.innerHeight;
      // Контрольная точка на 50 px выше нижнего края окна
      const triggerPoint = windowHeight - 50; 

      reveals.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;

        // Если верхний край показного блока выше контрольной точки, то показываем показной блок 
        if (elementTop <= triggerPoint) {
          element.classList.add('reveal_active');  
        // в противном случае скрываем показной блок        
        } else {
          element.classList.remove('reveal_active');
        }
      });
    }

    // Запускаем проверку после формирования DOM
    checkReveal();

    // Добавляем обработчик события прокрутки
    window.addEventListener('scroll', checkReveal);
  });

