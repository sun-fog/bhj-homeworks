// Получаем элемент textarea по ID
const editor = document.getElementById('editor');

// Создаём ключ для хранения данных в localStorage
const LOCAL_STORAGE_KEY = 'myNote';

// Функция для восстановления текста из localStorage при загрузке страницы
function restoreText() {
  const savedText = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedText !== null) {
    editor.value = savedText;
  }
}

// Функция сохранения текста в localStorage
function saveText() {
  localStorage.setItem(LOCAL_STORAGE_KEY, editor.value);
}

// Восстанавливаем текст при загрузке страницы
restoreText();

// Добавляем обработчик изменений в textarea
editor.addEventListener('input', saveText);
