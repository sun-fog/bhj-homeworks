document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form');
  const fileInput = document.getElementById('file');
  const progressBar = document.getElementById('progress');

  // Обработчик отправки формы 
  form.addEventListener('submit', function(event) {
    // Отменяем стандартную отправку формы
    event.preventDefault(); 

    const file = fileInput.files[0];
    // Выводим ошибку, если не выбран файл для отправки 
    if (!file) {
      alert('Пожалуйста, выберите файл для загрузки');
      return;
    }
    // Создаём новый AJAX‑запрос для асинхронной отправки файла
    const xhr = new XMLHttpRequest();

    // Обработчик прогресса загрузки
    xhr.upload.addEventListener('progress', function(e) {
      if (e.lengthComputable) {
        const percentComplete = e.loaded / e.total;
        progressBar.value = percentComplete;
      }
    });

    // Обработчик успешного завершения загрузки
    xhr.addEventListener('load', function() {
      // Если загрузка файла успешная, то устанавливаем прогресс на 100 %
      if (xhr.status === 200 || xhr.status === 201) {
        progressBar.value = 1.0; 
        alert('Файл успешно загружен!');
      // Если загрузка файла неуспешная, то выводим ошибку
      } else {
        alert(`Ошибка загрузки: ${xhr.status} ${xhr.statusText}`);
        progressBar.value = 0;
      }
    });

    // Обработчик ошибок
    xhr.addEventListener('error', function() {
      alert('Произошла ошибка при загрузке файла');
      progressBar.value = 0;
    });

    // Настройка и отправка запроса
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload', true);    
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    const formData = new FormData();
    formData.append('file', file);

    xhr.send(formData);
  });
});
