document.addEventListener('DOMContentLoaded', function() {
  // Находим все ротаторы
  const rotators = document.querySelectorAll('.rotator');

  // Обрабатываем все ротоаторы
  rotators.forEach(rotator => {
    // Получаем все объявления текущего ротатора
    const cases = rotator.querySelectorAll('.rotator__case');
    let currentIndex = 0;

    // Функция для ротации объявлений
    function rotate() {
      // Деактивируем все объявления
      cases.forEach(caseElement => {
        caseElement.classList.remove('rotator__case_active');
      });

      // Устанавливаем цвет текущего объявления
      const currentCase = cases[currentIndex];
      const color = currentCase.getAttribute('data-color');
      currentCase.style.color = color;

      // Активируем текущее объявление
      currentCase.classList.add('rotator__case_active');

      // Организуем индекс бесконечного цикла
      currentIndex = (currentIndex + 1) % cases.length;
    }

    // Запускаем первую ротацию сразу после инициализации
    rotate();

    // Запускаем бесконечный цикл ротации объявлений с частотой 1 Гц    
    const firstCase = cases[0];
    const initialSpeed = parseInt(firstCase.getAttribute('data-speed')) || 1000;
    setInterval(rotate, initialSpeed);
  });
});
