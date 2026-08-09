const button = document.querySelector('#demoButton');
const message = document.querySelector('#demoMessage');
const toolsGrid = document.querySelector('#toolsGrid');
const todoForm =  document.querySelector('#todoForm');
const taskInput =  document.querySelector('#taskInput');
const todoList = document.querySelector('#todoList');
const todoCounter =
    document.querySelector('#todoCounter');
const clearCompletedButton =
    document.querySelector('#clearCompletedButton');




button.addEventListener('click', function () {
    message.textContent = 'JavaScript работает!';
    button.textContent = 'Готово!';
});


const hoursInput =
    document.querySelector('#hoursInput');

const calculateButton =
    document.querySelector('#calculateButton');

const calculatorResult =
    document.querySelector('#calculatorResult');
const automationRate = 0.4;


// Калькулятор экономии времени
function calculateSavedTime(hours) {
    const savedPerWeek = hours * automationRate;
    const savedPerMonth = savedPerWeek * 4;

    return savedPerMonth;
}

calculateButton.addEventListener('click', function () {
    const hours = Number(hoursInput.value);

    if (hours <= 0) {
        calculatorResult.textContent =
            'Введите количество часов больше нуля';

        return;
    }

    const result = calculateSavedTime(hours);

    calculatorResult.textContent =
        `Примерная экономия: ${result.toFixed(1)} часов в месяц`;
});

// массив
const tools = [
    {
        title: 'ChatGPT',
        category: 'ИИ',
        level: 'Начальный',
        description: 'Помогает работать с текстом, идеями и кодом.'
    },
    {
        title: 'Figma',
        category: 'Дизайн',
        level: 'Продвинутый',
        description: 'Подходит для создания макетов сайтов и интерфейсов.'
    },
    {
        title: 'GitHub',
        category: 'Разработка',
        level: 'Начальный',
        description: 'Хранит проекты и историю изменений кода.'
    },
    {
        title: 'VS Code',
        category: 'Разработка',
        level: 'Начальный',
        description: 'Редактор для HTML, CSS, JavaScript и других языков.'
    },
    {
    title: 'Canva',
    category: 'Дизайн',
    level: 'Продвинутый',
    description: 'Быстрое создание графики и презентаций.'
    },
    {
    title: 'n8n',
    category: 'Claude',
    level: 'Начальный',
    description: 'Программирование и web-дизайн '
    },
    {
    title: 'n8n',
    category: 'Автоматизация',
    level: 'Продвинутый',
    description: 'Хренька всякая раз'
    },
    {
    title: 'Make',
    category: 'Автоматизация',
    level: 'Продвинутый',
    description: 'Хренька всякая два'
    }
];


// карточки по массиву
function renderTools(items) {
    toolsGrid.innerHTML = '';

    items.forEach(function (tool) {
        const card =
            document.createElement('article');

        card.classList.add('tool-card');

        card.innerHTML = `
            <span class="tool-card__category">
                ${tool.category}
            </span>

            <h3>${tool.title}</h3>

            <p>${tool.description}</p>

            <p>
                Уровень: ${tool.level}
            </p>
        `;

        toolsGrid.append(card);
    });
}


renderTools(tools);
const filterButtons =
    document.querySelectorAll('.filter-button');

    filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        const category =
            button.dataset.category;
    
            filterButtons.forEach(function (item) {
    item.classList.remove('active');
});

// выбор по категории в массиве
button.classList.add('active');
        if (category === 'Все') {
            renderTools(tools);
        } else {
            const filteredTools =
                tools.filter(function (tool) {
                    return tool.category === category;
                });

            renderTools(filteredTools);
        }
    });
});


// ==============================
// ПРИЛОЖЕНИЕ "СПИСОК ЗАДАЧ"
// ==============================


// Получаем сохранённые задачи из браузера.
// Если их нет — используем пустой массив.
const savedTasks = localStorage.getItem('tasks');

let tasks = savedTasks
    ? JSON.parse(savedTasks)
    : [];


// --------------------------------
// Функция сохранения задач
// --------------------------------

function saveTasks() {
    localStorage.setItem(
        'tasks',
        JSON.stringify(tasks)
    );
}


// --------------------------------
// Функция отображения задач
// --------------------------------

function renderTasks() {

    // Каждый раз сначала очищаем список,
    // а потом рисуем его заново.
    todoList.innerHTML = '';


    // Если задач нет — показываем сообщение.
    if (tasks.length === 0) {
        const emptyMessage =
            document.createElement('li');

        emptyMessage.textContent =
            'Список пока пуст.';

        todoList.append(emptyMessage);
    }


    // Перебираем все задачи массива.
    tasks.forEach(function (task) {

        // Создаём элемент списка.
        const item =
            document.createElement('li');

        item.classList.add('todo-item');


        // Если задача выполнена —
        // добавляем класс completed.
        if (task.completed) {
            item.classList.add('completed');
        }


        // Создаём содержимое задачи:
        // чекбокс, текст и кнопку удаления.
        item.innerHTML = `
            <input
                type="checkbox"
                class="todo-item__checkbox"
                ${task.completed ? 'checked' : ''}
            >

            <span class="todo-item__text">
                ${task.text}
            </span>

            <button
                class="todo-item__delete"
                type="button"
            >
                Удалить
            </button>
        `;


        // -------------------------
        // Чекбокс "Выполнено"
        // -------------------------

        const checkbox =
            item.querySelector(
                '.todo-item__checkbox'
            );

        checkbox.addEventListener(
            'change',
            function () {

                // Записываем состояние чекбокса
                // в объект задачи.
                task.completed =
                    checkbox.checked;

                // Сохраняем изменения.
                saveTasks();

                // Перерисовываем список.
                renderTasks();
            }
        );


        // -------------------------
        // Кнопка "Удалить"
        // -------------------------

        const deleteButton =
            item.querySelector(
                '.todo-item__delete'
            );

        deleteButton.addEventListener(
            'click',
            function () {

                // Оставляем все задачи,
                // кроме текущей.
                tasks = tasks.filter(
                    function (item) {
                        return item.id !== task.id;
                    }
                );

                saveTasks();
                renderTasks();
            }
        );


        // Только теперь добавляем задачу
        // в список на странице.
        todoList.append(item);
    });


    // --------------------------------
    // Счётчик задач
    // --------------------------------

    const completedCount =
        tasks.filter(function (task) {
            return task.completed;
        }).length;

    todoCounter.textContent =
        `Всего задач: ${tasks.length}. Выполнено: ${completedCount}.`;
}


// --------------------------------
// Первый вывод задач на страницу
// --------------------------------

renderTasks();


// --------------------------------
// Добавление новой задачи
// --------------------------------

todoForm.addEventListener(
    'submit',
    function (event) {

        // Не даём форме перезагрузить страницу.
        event.preventDefault();

        // Получаем текст и убираем
        // пробелы по краям.
        const text =
            taskInput.value.trim();


        // Пустую задачу не добавляем.
        if (text === '') {
            return;
        }


        // Создаём объект новой задачи.
        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };


        // Добавляем объект в массив.
        tasks.push(newTask);


        // Сохраняем массив.
        saveTasks();


        // Перерисовываем список.
        renderTasks();


        // Очищаем поле ввода.
        taskInput.value = '';
    }
);


// --------------------------------
// Кнопка "Очистить выполненные"
// --------------------------------

clearCompletedButton.addEventListener(
    'click',
    function () {

        // Оставляем только невыполненные задачи.
        tasks = tasks.filter(
            function (task) {
                return !task.completed;
            }
        );

        // Сохраняем изменения.
        saveTasks();

        // Перерисовываем список.
        renderTasks();
    }
);



// =================================
// ДАННЫЕ ИЗ ВНЕШНЕГО API
// =================================


// Кнопка, которая запускает запрос.
const loadPostsButton =
    document.querySelector(
        '#loadPostsButton'
    );


// Элемент для сообщений:
// "Загрузка...", "Ошибка" и т. д.
const apiStatus =
    document.querySelector(
        '#apiStatus'
    );


// Контейнер, куда будем
// добавлять карточки.
const apiGrid =
    document.querySelector(
        '#apiGrid'
    );
   
   
  const postsCount =
    document.querySelector(
        '#postsCount'
    ); 



 // =================================
// ЗАГРУЗКА ПУБЛИКАЦИЙ
// =================================


// async означает:
// внутри этой функции мы можем
// использовать await.


 // =================================
// ОТОБРАЖЕНИЕ ПУБЛИКАЦИЙ
// =================================

function renderPosts(posts) {

    // Перед новой отрисовкой
    // очищаем старые карточки.
    apiGrid.innerHTML = '';


    // Перебираем массив публикаций.
    posts.forEach(function (post) {

        // Создаём карточку.
        const card =
            document.createElement(
                'article'
            );


        // Добавляем CSS-класс.
        card.classList.add(
            'api-card'
        );


        // Заполняем карточку
        // данными конкретного объекта.
        card.innerHTML = `
            <span class="api-card__number">
                Публикация №${post.id}
            </span>

            <h3>
                ${post.title}
            </h3>

            <p>
                ${post.body}
            </p>
            <h4>
               Автор ID: ${post.userId}
            </h4>

        `;


        // Добавляем карточку
        // на страницу.
        apiGrid.append(card);
    });
}

// =================================
// ЗАПУСК ЗАГРУЗКИ ПО КЛИКУ
// =================================

loadPostsButton.addEventListener(
    'click',
    function () {

        // Вызываем асинхронную функцию.
        loadPosts();
        



    }
);


// =================================
// ЗАГРУЗКА ДАННЫХ С ОБРАБОТКОЙ ОШИБОК
// =================================

async function loadPosts() {
    console.log(
        'Начинаем загрузку'
    );

const count =
    Number(postsCount.value);

    // Отправляем HTTP-запрос.
    //
    // await означает:
    // дождаться результата fetch()
    // и только потом продолжать.
    const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
    );
    // Преобразуем тело ответа
    // из JSON в JavaScript-данные.
    const posts =
        await response.json();

    // Берём только первые 6 элементов массива.
    const firstPosts =
        posts.slice(0, count );

    console.log(firstPosts);
    // Посмотрим, что получилось.

    console.log(response);

    // -----------------------------
    // СОСТОЯНИЕ "ЗАГРУЗКА"
    // -----------------------------

    // Показываем пользователю,
    // что процесс начался.
    apiStatus.textContent =
        'Загрузка публикаций...';


    // На время запроса
    // отключаем кнопку,
    // чтобы пользователь
    // не нажал её 20 раз подряд.
    loadPostsButton.disabled = true;
    loadPostsButton.textContent =
    'Загрузка...';

    try {

        // -------------------------
        // HTTP-ЗАПРОС
        // -------------------------

        const response = await fetch(
            'https://jsonplaceholder.typicode.com/posts'
            //'https://jsonplaceholder.typicode.com/abracadabra'
            //ощибка
        );


        // -------------------------
        // ПРОВЕРЯЕМ HTTP-СТАТУС
        // -------------------------

        // fetch сам по себе не обязан
        // выбрасывать ошибку только потому,
        // что сервер вернул, например, 404.
        //
        // Поэтому статус ответа
        // проверяем отдельно.
        if (!response.ok) {

            throw new Error(
                `Ошибка сервера: ${response.status}`
            );
        }


        // -------------------------
        // ЧИТАЕМ JSON
        // -------------------------

        const posts =
            await response.json();


        // Оставляем первые 6 (count вместо 6).
        const firstPosts =
            posts.slice(0, count );


        // Показываем карточки.
        renderPosts(firstPosts);


        // Сообщаем об успехе.
        apiStatus.textContent =
            'Публикации загружены.';


    } catch (error) {

        // -------------------------
        // ЕСЛИ ЧТО-ТО ПОШЛО НЕ ТАК
        // -------------------------

        console.error(error);


        // Показываем понятное
        // сообщение пользователю.
        apiStatus.textContent =
            'Не удалось загрузить данные.';


    } finally {

        // -------------------------
        // ВЫПОЛНЯЕТСЯ В ЛЮБОМ СЛУЧАЕ
        // -------------------------

        // Запрос завершён:
        // успешный или с ошибкой.
        //
        // Поэтому снова разрешаем
        // нажимать кнопку.
        loadPostsButton.disabled = false;
        loadPostsButton.textContent =
    'Обновить публикации';
    }
}