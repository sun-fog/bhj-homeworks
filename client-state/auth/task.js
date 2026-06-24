document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signin__form');
    const signinBtn = document.getElementById('signin__btn');
    const welcomeBlock = document.getElementById('welcome');
    const userIdSpan = document.getElementById('user_id');
    const signinBlock = document.getElementById('signin');

    // Функция отображения сообщения об ошибке
    function showError(message) {
        // Проверяем наличие элемента с ошибкой
        let errorElement = document.getElementById('auth-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.id = 'auth-error';
            errorElement.style.color = 'red';
            errorElement.style.marginTop = '10px';
            errorElement.style.textAlign = 'center';
            signinForm.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    // Функция скрытия сообщения об ошибке
    function hideError() {
        const errorElement = document.getElementById('auth-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // Функция успешной авторизации
    function handleSuccess(userId) {
        // Сохраняем ID пользователя в localStorage
        localStorage.setItem('user_id', userId);

        // Очищаем форму
        signinForm.reset();

        // Скрываем форму авторизации
        signinBlock.classList.remove('signin_active');

        // Показываем блок приветствия
        welcomeBlock.classList.add('welcome_active');
        userIdSpan.textContent = userId;

        // Скрываем сообщение об ошибке
        hideError();
    }

    // Функция неуспешной авторизации
    function handleError() {
        showError('Неверный логин/пароль');
    }

    // Обработчик отправки формы
    signinForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем стандартную отправку формы

        // Скрываем предыдущее сообщение об ошибке
        hideError();

        // Создаём объект FormData из формы
        const formData = new FormData(signinForm);

        // Отправляем POST-запрос на сервер
        fetch('https://students.netoservices.ru/nestjs-backend/auth', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) // Парсим JSON-ответ
        .then(data => {
            if (data.success) {
                // Успешная авторизация
                handleSuccess(data.user_id);
            } else {
                // Неудачная авторизация
                handleError();
            }
        })
        .catch(error => {
            console.error('Ошибка при отправке запроса:', error);
            handleError();
        });
    });

    // Проверяем наличие сохранённого ID пользователя при загрузке страницы
    const savedUserId = localStorage.getItem('user_id');
    if (savedUserId) {
        // Если ID есть, то показываем блок приветствия
        welcomeBlock.classList.add('welcome_active');
        userIdSpan.textContent = savedUserId;
        // Скрываем форму авторизации
        signinBlock.classList.remove('signin_active');
    } else {
        // Если ID нет, то показываем форму авторизации
        signinBlock.classList.add('signin_active');
    }
});
