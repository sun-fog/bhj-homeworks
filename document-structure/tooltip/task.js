// Ожидаем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
  // Находим все элементы с подсказками
  const tooltipElements = document.querySelectorAll('.has-tooltip');
  // Создаём элемент для отображения подсказок
  const tooltip = document.createElement('div');
  // Стилизуем его через класс tooltip
  tooltip.classList.add('tooltip');
  // Добавляем его в конец страницы
  document.body.appendChild(tooltip);
  // Создаём объект для хранения ссылок на элементы с подсказками и их оригинальные title
  const originalTitles = new Map();
  // Переменная для хранения ссылки на элемент, для которого в текущий момент показывается подсказка
  let activeTooltipElement = null; 
  // Перебираем все элементы с подсказками и сохраняем их оригинальные title
  tooltipElements.forEach(function(element) {
    const title = element.getAttribute('title');
    if (title) {
      originalTitles.set(element, title);
    }
  });
  // Функция возвращает подсказку при клике на элемент
  function showTooltip(element) {
    const tooltipText = originalTitles.get(element);
    if (!tooltipText) return;
    // Передаём текст подсказки в элемент подсказки
    tooltip.textContent = tooltipText;
    // Сохраняем ссылку на активный элемент
    activeTooltipElement = element; 
    // Получаем координаты элемента относительно видимой области
    const rect = element.getBoundingClientRect();
    // Учитываем текущую прокрутку страницы вверх
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // Учитываем текущую прокрутку страницы влево
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    // Позиционируем подсказку под элементом
    let topPos = rect.bottom + scrollTop + 4;
    let leftPos = rect.left + scrollLeft;
    // Применяем рассчитанные координаты к подсказке
    tooltip.style.left = leftPos + 'px';
    tooltip.style.top = topPos + 'px';
    // Добавляем класс видимости к элементу подсказки
    tooltip.classList.add('tooltip_active');
  }
  // Функция скрывает подсказку
  function hideTooltip() {
    // Удаляем класс видимости
    tooltip.classList.remove('tooltip_active');
    // Очищаем текст подсказки
    tooltip.textContent = ''; 
    // Сбрасываем активный элемент
    activeTooltipElement = null; 
  }
  // Перебираем все элементы с подсказками
  tooltipElements.forEach(function(element) {
    // Навешиваем на каждый элемент обработчик события клика
    element.addEventListener('click', function(event) {
      // Отменяем стандартное действие
      event.preventDefault();
      // Если кликаем на тот же элемент — скрываем подсказку
      if (activeTooltipElement === this) {
        hideTooltip();
      } else {
        // Иначе скрываем старую подсказку и показываем новую
        hideTooltip();
        showTooltip(this);
      }
    });
  });

  // Скрываем подсказку при нажатии Esc
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      hideTooltip();
    }
  });
});
