// Ожидаем полную загрузку DOM
document.addEventListener('DOMContentLoaded', function() {
    // Находим поле ввода
    const taskInput = document.getElementById('task__input');
    // Находим кнопку "Добавить"
    const addButton = document.getElementById('tasks__add');
    // Находим список задач
    const tasksList = document.getElementById('tasks__list');

    // Функция добавления новой задачи
    function addTask() {
        // Получаем текст новой задачи и удаляем пробелы в начале и в конце
        const taskText = taskInput.value.trim();
        // Если задачи нет, то выходим
        if (taskText === '') {
            return;
        }

        // Создаём контейнер задачи
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        // Создаём контейнер заголовка задачи
        const titleElement = document.createElement('div');
        titleElement.className = 'task__title';
        // Переносим текст задачи в контейнер заголовка задачи 
        titleElement.textContent = taskText;
        // Создаём кнопку удаления задачи
        const removeLink = document.createElement('a');
        removeLink.className = 'task__remove';
        removeLink.href = '#';
        removeLink.textContent = '×';
        // Добавляем обработчик события на кнопку удаления задачи
        removeLink.addEventListener('click', function(event) {
            event.preventDefault();
            taskElement.remove();
        });

        // Добавляем в задачу заголовок
        taskElement.appendChild(titleElement);
        // Добавляем в задачу кнопку удаления
        taskElement.appendChild(removeLink);
        // Добавляем задачу в список задач
        tasksList.appendChild(taskElement);

        // Очищаем поле ввода
        taskInput.value = '';
        // Фокусируемся на поле ввода для удобства
        taskInput.focus();
    }

    // Добавляем обработчик кликов для кнопки «Добавить»
    addButton.addEventListener('click', function(event) {
        // Предотвращаем отправку формы
        event.preventDefault(); 
        // Добавляем новую задачу
        addTask();
    });

    // Добавляем обработчик нажатий клавиши Enter в поле ввода
    taskInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            // Предотвращаем отправку формы
            event.preventDefault(); 
            // Добавляем новую задачу
            addTask();
        }
    });
});
