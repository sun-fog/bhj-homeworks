document.addEventListener('DOMContentLoaded', function() {
  // Находим все элементы с классом font-size
  const fontSizeButtons = document.querySelectorAll('.font-size');
  // Находим элемент с классом book
  const bookElement = document.getElementById('book');

  // Функция обработки клика по кнопке изменения размера шрифта
  function handleFontSizeChange(event) {
    // Отменяем стандартное поведение ссылки (переход по href)
    event.preventDefault();

    // Убираем класс font-size_active у всех кнопок
    fontSizeButtons.forEach(button => {
      button.classList.remove('font-size_active');
    });

    // Добавляем класс font-size_active к нажатой кнопке
    const clickedButton = event.target;
    clickedButton.classList.add('font-size_active');

    // Получаем размер шрифта data-size у нажатой кнопки
    const size = clickedButton.getAttribute('data-size');

    // Удаляем все классы, связанные с размером шрифта, у элемента book
    bookElement.classList.remove('book_fs-small', 'book_fs-big');

    // В зависимости размера шрифта нажатой кнопки добавляем соответствующий класс к элементу book
    if (size === 'small') {
      bookElement.classList.add('book_fs-small');
    } else if (size === 'big') {
      bookElement.classList.add('book_fs-big');
    }
  }

  // Добавляем обработчик события click для каждой кнопки изменения размера шрифта
  fontSizeButtons.forEach(button => {
    button.addEventListener('click', handleFontSizeChange);
  });
});
