document.addEventListener('DOMContentLoaded', function() {
  const loader = document.getElementById('loader');
  const itemsContainer = document.getElementById('items');

  // Отправляем GET‑запрос для получения курса валют
  fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
    .then(response => {
      // Выдаём ошибку, если запрос неуспешный
      if (!response.ok) {
        throw new Error(`Ошибка сети: ${response.status}`);
      }
      // Преобразуем ответ в JSON
      return response.json();
    })
    .then(data => {
      // Скрываем анимацию загрузки после получения данных
      loader.classList.remove('loader_active');

      // Очищаем контейнер перед добавлением новых данных
      itemsContainer.innerHTML = '';

      // Получаем объект с валютами из ответа
      const valuteData = data.response.Valute;

      // Проходим по всем валютам
      for (const currencyCode in valuteData) {
        if (valuteData.hasOwnProperty(currencyCode)) {
          const currency = valuteData[currencyCode];

          // Создаём элементы для отображения данных о валюте
          const itemElement = document.createElement('div');
          itemElement.className = 'item';

          const codeElement = document.createElement('div');
          codeElement.className = 'item__code';
          codeElement.textContent = currency.CharCode;

          const valueElement = document.createElement('div');
          valueElement.className = 'item__value';
          // Округляем значение до 2 знаков после запятой
          valueElement.textContent = currency.Value.toFixed(2);

          const currencyElement = document.createElement('div');
          currencyElement.className = 'item__currency';
          currencyElement.textContent = 'руб.';

          // Добавляем элементы в контейнер item
          itemElement.appendChild(codeElement);
          itemElement.appendChild(valueElement);
          itemElement.appendChild(currencyElement);

          // Добавляем готовый элемент в контейнер items
          itemsContainer.appendChild(itemElement);
        }
      }
    })
    .catch(error => {
      // В случае ошибки скрываем анимацию и показываем сообщение об ошибке
      loader.classList.remove('loader_active');
      itemsContainer.innerHTML = `<div class="error">Ошибка загрузки данных: ${error.message}</div>`;
      console.error('Произошла ошибка при загрузке курса валют:', error);
    });
});
