document.addEventListener('DOMContentLoaded', function() {
  const pollTitleElement = document.getElementById('poll__title');
  const pollAnswersElement = document.getElementById('poll__answers');

  // Функция загрузки опроса
  async function loadPoll() {
    try {
      const response = await fetch('https://students.netoservices.ru/nestjs-backend/poll');
      // Выдать ошибку, если запрос неуспешный
      if (!response.ok) {
        throw new Error(`Ошибка загрузки опроса: ${response.status}`);
      }

      const data = await response.json();
      displayPoll(data);
    } catch (error) {
      console.error('Произошла ошибка при загрузке опроса:', error);
      pollTitleElement.textContent = 'Не удалось загрузить опрос';
      pollAnswersElement.innerHTML = '';
    }
  }

  // Функция отображения опроса
  function displayPoll(pollData) {
    // Очищаем контейнер с ответами
    pollAnswersElement.innerHTML = '';

    // Устанавливаем заголовок опроса
    pollTitleElement.textContent = pollData.data.title;

    // Создаём кнопки для каждого ответа
    pollData.data.answers.forEach(answerText => {
      const button = document.createElement('button');
      button.className = 'poll__answer';
      button.textContent = answerText;

      // Добавляем обработчик клика
      button.addEventListener('click', () => {
        alert('Спасибо, ваш голос засчитан!');
      });

      // Добавляем кнопку в контейнер ответов
      pollAnswersElement.appendChild(button);
    });
  }

  // Загружаем опрос при загрузке страницы
  loadPoll();
});
