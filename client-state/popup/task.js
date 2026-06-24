document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('subscribe-modal');
  const closeButtons = document.querySelectorAll('.modal__close');
  const cookieName = 'modalClosed';

  // Функция установки cookie
  function setCookie(name, value, days) {
    try {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = 'expires=' + date.toUTCString();
      document.cookie = name + '=' + value + '; ' + expires + '; path=/';
      console.log(`Cookie установлен: ${name}=${value}`);
    } catch (error) {
      console.error('Ошибка установки cookie:', error);
    }
  }

  // Функция получения значения cookie по имени
  function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        const value = c.substring(nameEQ.length, c.length);
        console.log(`Cookie найден: ${name}=${value}`);
        return value;
      }
    }
    console.log(`Cookie ${name} не найден`);
    return null;
  }

  // Функция закрытия модального окна
  function closeModal() {
    modal.classList.remove('modal_active');
    setCookie(cookieName, 'true', 365);
    console.log('Окно закрыто, cookie установлен');
  }

  // Выводим текущее состояние для диагностики
  console.log('=== Проверка состояния модального окна ===');
  console.log('Modal element:', modal);
  console.log('Current cookie:', getCookie(cookieName));

  // Если cookie отсутствует, то показываем окно
  const hasClosed = getCookie(cookieName);

  if (!hasClosed) {
    console.log('Показываем модальное окно — cookie отсутствует');
    modal.classList.add('modal_active');
  } else {
    console.log('Окно не показываем — cookie уже установлен');
  }

  // Добавляем обработчики для всех элементов с классом modal__close
  closeButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      closeModal();
    });
  });

  // Закрываем окно при клике вне его содержимого
  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });
});
