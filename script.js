// ============================================================
// ПЕРВЫЙ УЧЕБНЫЙ ПРОЕКТ
// ============================================================
//
// В этом файле находятся несколько независимых мини-приложений:
//
// 1. Демонстрационная JavaScript-кнопка.
// 2. Калькулятор экономии времени.
// 3. Каталог цифровых инструментов.
// 4. Список задач с localStorage.
// 5. Загрузка данных с внешнего API.
//
// Каждый блок отделён комментариями,
// чтобы было понятно, где начинается и заканчивается
// конкретная логика.
//
// ============================================================



// ============================================================
// 1. ПРОСТАЯ JAVASCRIPT-КНОПКА
// ============================================================


// Находим кнопку в HTML по её id="demoButton".
const button =
    document.querySelector('#demoButton');


// Находим пустой абзац,
// куда будем выводить сообщение.
const message =
    document.querySelector('#demoMessage');


// Слушаем событие click.
//
// Когда пользователь нажимает кнопку,
// выполняется функция внутри addEventListener().
button.addEventListener('click', function () {

    // Меняем текст в пустом абзаце.
    message.textContent =
        'JavaScript работает!';


    // Меняем текст самой кнопки.
    button.textContent =
        'Готово!';
});



// ============================================================
// 2. КАЛЬКУЛЯТОР ЭКОНОМИИ ВРЕМЕНИ
// ============================================================


// Поле, куда пользователь вводит
// количество часов в неделю.
const hoursInput =
    document.querySelector('#hoursInput');


// Кнопка "Рассчитать".
const calculateButton =
    document.querySelector('#calculateButton');


// Элемент для вывода результата.
const calculatorResult =
    document.querySelector('#calculatorResult');


// Предполагаем, что автоматизация
// позволяет экономить 40% времени.
//
// 0.4 = 40%.
const automationRate = 0.4;



// ------------------------------------------------------------
// ФУНКЦИЯ РАСЧЁТА
// ------------------------------------------------------------

function calculateSavedTime(hours) {

    // Сколько часов экономится за одну неделю.
    const savedPerWeek =
        hours * automationRate;


    // Условно считаем,
    // что в месяце четыре недели.
    const savedPerMonth =
        savedPerWeek * 4;


    // Возвращаем результат функции.
    return savedPerMonth;
}



// ------------------------------------------------------------
// ОБРАБОТКА КНОПКИ "РАССЧИТАТЬ"
// ------------------------------------------------------------

calculateButton.addEventListener(
    'click',
    function () {

        // Значение из input приходит как строка.
        //
        // Number() превращает её в число.
        const hours =
            Number(hoursInput.value);


        // Проверяем корректность значения.
        //
        // Если введено 0,
        // отрицательное число
        // или поле пустое —
        // расчёт не выполняем.
        if (hours <= 0) {

            calculatorResult.textContent =
                'Введите количество часов больше нуля';

            return;
        }


        // Вызываем нашу функцию расчёта.
        const result =
            calculateSavedTime(hours);


        // Показываем результат.
        //
        // toFixed(1) оставляет
        // один знак после запятой.
        calculatorResult.textContent =
            `Примерная экономия: ${result.toFixed(1)} часов в месяц`;
    }
);



// ============================================================
// 3. КАТАЛОГ ЦИФРОВЫХ ИНСТРУМЕНТОВ
// ============================================================


// Контейнер,
// куда JavaScript будет добавлять карточки.
const toolsGrid =
    document.querySelector('#toolsGrid');



// ------------------------------------------------------------
// ДАННЫЕ КАТАЛОГА
// ------------------------------------------------------------
//
// Здесь мы храним данные отдельно от HTML.
//
// Каждый элемент массива — объект,
// описывающий один инструмент.
//

const tools = [

    {
        title: 'ChatGPT',
        category: 'ИИ',
        level: 'Начальный',
        description:
            'Помогает работать с текстом, идеями и кодом.'
    },

    {
        title: 'Figma',
        category: 'Дизайн',
        level: 'Продвинутый',
        description:
            'Подходит для создания макетов сайтов и интерфейсов.'
    },

    {
        title: 'GitHub',
        category: 'Разработка',
        level: 'Начальный',
        description:
            'Хранит проекты и историю изменений кода.'
    },

    {
        title: 'VS Code',
        category: 'Разработка',
        level: 'Начальный',
        description:
            'Редактор для HTML, CSS, JavaScript и других языков.'
    },

    {
        title: 'Canva',
        category: 'Дизайн',
        level: 'Продвинутый',
        description:
            'Быстрое создание графики и презентаций.'
    },

    {
        title: 'Claude',
        category: 'ИИ',
        level: 'Начальный',
        description:
            'ИИ-инструмент для работы с текстом, анализом и кодом.'
    },

    

    {
        title: 'Make',
        category: 'Автоматизация',
        level: 'Продвинутый',
        description:
            'Сервис для соединения приложений и автоматизации процессов.'
    }
];



// ------------------------------------------------------------
// ФУНКЦИЯ ОТОБРАЖЕНИЯ КАРТОЧЕК
// ------------------------------------------------------------

function renderTools(items) {

    // Сначала удаляем старые карточки.
    //
    // Это нужно при переключении фильтров.
    toolsGrid.innerHTML = '';


    // Перебираем переданный массив.
    items.forEach(function (tool) {

        // Создаём HTML-элемент <article>.
        const card =
            document.createElement('article');


        // Добавляем CSS-класс.
        card.classList.add('tool-card');


        // Заполняем карточку
        // данными из объекта tool.
        card.innerHTML = `
            <span class="tool-card__category">
                ${tool.category}
            </span>

            <h3>
                ${tool.title}
            </h3>

            <p>
                ${tool.description}
            </p>

            <p>
                Уровень: ${tool.level}
            </p>
        `;


        // Добавляем карточку
        // в контейнер на странице.
        toolsGrid.append(card);
    });
}



// Первый вывод каталога.
//
// Пока никакой фильтр не выбран,
// показываем весь массив.
renderTools(tools);



// ------------------------------------------------------------
// ФИЛЬТРЫ КАТАЛОГА
// ------------------------------------------------------------


// Получаем сразу ВСЕ кнопки,
// у которых есть класс .filter-button.
const filterButtons =
    document.querySelectorAll(
        '.filter-button'
    );



// ВАЖНО:
//
// У кнопки "Очистить выполненные"
// тоже сейчас есть класс .filter-button.
//
// Но у неё нет data-category.
//
// Поэтому ниже дополнительно проверяем,
// существует ли category.
//
// Иначе кнопка списка задач
// вмешивалась бы в фильтрацию каталога.
filterButtons.forEach(function (filterButton) {

    filterButton.addEventListener(
        'click',
        function () {

            // Получаем значение:
            // data-category="ИИ"
            // data-category="Дизайн"
            // и т. д.
            const category =
                filterButton.dataset.category;


            // Если у кнопки нет data-category,
            // это не кнопка фильтра каталога.
            //
            // Поэтому просто прекращаем
            // выполнение этого обработчика.
            if (!category) {
                return;
            }


            // Убираем active
            // только с кнопок,
            // у которых есть data-category.
            filterButtons.forEach(
                function (item) {

                    if (item.dataset.category) {
                        item.classList.remove(
                            'active'
                        );
                    }
                }
            );


            // Выделяем нажатую кнопку.
            filterButton.classList.add(
                'active'
            );


            // Если нажали "Все",
            // показываем полный массив.
            if (category === 'Все') {

                renderTools(tools);

            } else {

                // Создаём новый массив,
                // содержащий только инструменты
                // нужной категории.
                const filteredTools =
                    tools.filter(
                        function (tool) {

                            return (
                                tool.category ===
                                category
                            );
                        }
                    );


                // Показываем отфильтрованные данные.
                renderTools(filteredTools);
            }
        }
    );
});



// ============================================================
// 4. ПРИЛОЖЕНИЕ "СПИСОК ЗАДАЧ"
// ============================================================


// ------------------------------------------------------------
// ПОЛУЧАЕМ HTML-ЭЛЕМЕНТЫ
// ------------------------------------------------------------


// Форма добавления новой задачи.
const todoForm =
    document.querySelector('#todoForm');


// Поле ввода текста задачи.
const taskInput =
    document.querySelector('#taskInput');


// Список <ul>,
// в который добавляются задачи.
const todoList =
    document.querySelector('#todoList');


// Элемент для счётчика.
const todoCounter =
    document.querySelector('#todoCounter');


// Общая кнопка:
// "Очистить выполненные".
const clearCompletedButton =
    document.querySelector(
        '#clearCompletedButton'
    );



// ------------------------------------------------------------
// ЗАГРУЖАЕМ СОХРАНЁННЫЕ ЗАДАЧИ
// ------------------------------------------------------------


// localStorage хранит строки.
//
// Поэтому получаем JSON-строку.
const savedTasks =
    localStorage.getItem('tasks');


// Если данные существуют,
// JSON.parse() превращает строку
// обратно в массив.
//
// Если данных нет,
// создаём пустой массив.
let tasks =
    savedTasks
        ? JSON.parse(savedTasks)
        : [];



// ------------------------------------------------------------
// СОХРАНЕНИЕ ЗАДАЧ
// ------------------------------------------------------------

function saveTasks() {

    // JSON.stringify()
// превращает массив объектов
// в строку JSON,
// которую умеет хранить localStorage.
    localStorage.setItem(
        'tasks',
        JSON.stringify(tasks)
    );
}



// ------------------------------------------------------------
// ОТОБРАЖЕНИЕ СПИСКА
// ------------------------------------------------------------

function renderTasks() {

    // Каждый раз полностью
    // очищаем старый список.
    todoList.innerHTML = '';


    // --------------------------------
    // ЕСЛИ ЗАДАЧ НЕТ
    // --------------------------------

    if (tasks.length === 0) {

        const emptyMessage =
            document.createElement('li');


        emptyMessage.textContent =
            'Список пока пуст.';


        todoList.append(
            emptyMessage
        );
    }


    // --------------------------------
    // СОЗДАЁМ КАЖДУЮ ЗАДАЧУ
    // --------------------------------

    tasks.forEach(function (task) {

        // Создаём <li>.
        const item =
            document.createElement('li');


        item.classList.add(
            'todo-item'
        );


        // Если задача выполнена,
        // добавляем специальный класс.
        //
        // CSS через него
        // зачёркивает текст.
        if (task.completed) {

            item.classList.add(
                'completed'
            );
        }


        // Создаём содержимое строки задачи.
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



        // --------------------------------
        // ЧЕКБОКС "ВЫПОЛНЕНО"
        // --------------------------------

        const checkbox =
            item.querySelector(
                '.todo-item__checkbox'
            );


        checkbox.addEventListener(
            'change',
            function () {

                // Записываем состояние
                // checkbox в объект задачи.
                task.completed =
                    checkbox.checked;


                // Сохраняем изменения.
                saveTasks();


                // Перерисовываем интерфейс.
                renderTasks();
            }
        );



        // --------------------------------
        // КНОПКА "УДАЛИТЬ"
        // --------------------------------

        const deleteButton =
            item.querySelector(
                '.todo-item__delete'
            );


        deleteButton.addEventListener(
            'click',
            function () {

                // Создаём новый массив,
                // в котором нет задачи
                // с текущим id.
                tasks = tasks.filter(
                    function (currentTask) {

                        return (
                            currentTask.id !==
                            task.id
                        );
                    }
                );


                // Сохраняем новый массив.
                saveTasks();


                // Обновляем интерфейс.
                renderTasks();
            }
        );


        // Добавляем готовую задачу
        // в список.
        todoList.append(item);
    });



    // --------------------------------
    // СЧЁТЧИК
    // --------------------------------


    // Получаем массив
    // только выполненных задач.
    const completedTasks =
        tasks.filter(
            function (task) {
                return task.completed;
            }
        );


    // Количество выполненных.
    const completedCount =
        completedTasks.length;


    // Общее количество —
    // tasks.length.
    todoCounter.textContent =
        `Всего задач: ${tasks.length}. Выполнено: ${completedCount}.`;
}



// Первый вывод после загрузки страницы.
renderTasks();



// ------------------------------------------------------------
// ДОБАВЛЕНИЕ НОВОЙ ЗАДАЧИ
// ------------------------------------------------------------

todoForm.addEventListener(
    'submit',
    function (event) {

        // Запрещаем форме
        // стандартно перезагружать страницу.
        event.preventDefault();


        // Получаем текст
        // и удаляем пробелы по краям.
        const text =
            taskInput.value.trim();


        // Пустую задачу не добавляем.
        if (text === '') {
            return;
        }


        // Создаём новый объект.
        const newTask = {

            // Date.now()
            // используем как простой id.
            id: Date.now(),

            text: text,

            completed: false
        };


        // Добавляем объект
        // в конец массива tasks.
        tasks.push(newTask);


        // Сохраняем.
        saveTasks();


        // Обновляем список.
        renderTasks();


        // Очищаем поле ввода.
        taskInput.value = '';


        // Возвращаем курсор
        // обратно в input.
        taskInput.focus();
    }
);



// ------------------------------------------------------------
// ОЧИСТКА ВЫПОЛНЕННЫХ
// ------------------------------------------------------------

clearCompletedButton.addEventListener(
    'click',
    function () {

        // Оставляем только те задачи,
        // у которых completed === false.
        tasks = tasks.filter(
            function (task) {

                return !task.completed;
            }
        );


        // Сохраняем изменённый массив.
        saveTasks();


        // Перерисовываем интерфейс.
        renderTasks();
    }
);



// ============================================================
// 5. ДАННЫЕ ИЗ ВНЕШНЕГО API
// ============================================================
//
// Используем учебный API JSONPlaceholder.
//
// Сервер возвращает данные
// в формате JSON.
//
// После response.json()
// они превращаются в обычный
// массив JavaScript-объектов.
//
// ============================================================



// ------------------------------------------------------------
// ПОЛУЧАЕМ HTML-ЭЛЕМЕНТЫ
// ------------------------------------------------------------


// Кнопка запуска загрузки.
const loadPostsButton =
    document.querySelector(
        '#loadPostsButton'
    );


// Выпадающий список:
// 3 / 6 / 10 публикаций.
const postsCount =
    document.querySelector(
        '#postsCount'
    );


// Элемент для сообщений:
// "Загрузка..."
// "Ошибка..."
// "Загружено..."
const apiStatus =
    document.querySelector(
        '#apiStatus'
    );


// Контейнер,
// куда добавляются карточки.
const apiGrid =
    document.querySelector(
        '#apiGrid'
    );



// ------------------------------------------------------------
// ОТОБРАЖЕНИЕ ПУБЛИКАЦИЙ
// ------------------------------------------------------------

function renderPosts(posts) {

    // Удаляем предыдущие карточки.
    apiGrid.innerHTML = '';


    // Перебираем массив,
    // который получили от API.
    posts.forEach(function (post) {

        // Создаём новую карточку.
        const card =
            document.createElement(
                'article'
            );


        // Назначаем CSS-класс.
        card.classList.add(
            'api-card'
        );


        // Используем свойства объекта:
        //
        // post.id
        // post.title
        // post.body
        // post.userId
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

            <p>
                Автор ID: ${post.userId}
            </p>
        `;


        // Добавляем карточку
        // в сетку.
        apiGrid.append(card);
    });
}



// ------------------------------------------------------------
// ЗАГРУЗКА ПУБЛИКАЦИЙ
// ------------------------------------------------------------
//
// async позволяет использовать await.
//
// await нужен,
// когда результат операции
// появится не мгновенно,
// например после ответа сервера.
//
// ============================================================
// ЗАГРУЗКА ПУБЛИКАЦИЙ ИЗ API
// ============================================================

async function loadPosts() {

    // Показываем пользователю,
    // что загрузка уже началась.
    apiStatus.textContent =
        'Загрузка публикаций...';


    // На время запроса блокируем кнопку,
    // чтобы не отправлять несколько запросов подряд.
    loadPostsButton.disabled = true;


    // Меняем текст кнопки.
    loadPostsButton.textContent =
        'Загрузка...';


    try {

        // --------------------------------
        // ЧИТАЕМ КОЛИЧЕСТВО ПУБЛИКАЦИЙ
        // --------------------------------

        // Получаем текущее значение из <select>.
        // Number() превращает строку в число.
        const count =
            Number(postsCount.value);


        // --------------------------------
        // ОТПРАВЛЯЕМ ЗАПРОС К API
        // --------------------------------

        const response =
            await fetch(
                'https://jsonplaceholder.typicode.com/posts'
            );


        // --------------------------------
        // ПРОВЕРЯЕМ HTTP-СТАТУС
        // --------------------------------

        // Если сервер вернул ошибочный статус,
        // создаём ошибку вручную.
        if (!response.ok) {

            throw new Error(
                `Ошибка сервера: ${response.status}`
            );
        }


        // --------------------------------
        // ПОЛУЧАЕМ JSON
        // --------------------------------

        // Превращаем ответ сервера
        // в обычный JavaScript-массив объектов.
        const posts =
            await response.json();


        // --------------------------------
        // ОСТАВЛЯЕМ НУЖНОЕ КОЛИЧЕСТВО
        // --------------------------------

        const firstPosts =
            posts.slice(0, count);


        // --------------------------------
        // РИСУЕМ КАРТОЧКИ
        // --------------------------------

        renderPosts(firstPosts);


        // Показываем успешный результат.
        apiStatus.textContent =
            `Загружено публикаций: ${firstPosts.length}`;


    } catch (error) {

        // --------------------------------
        // ЕСЛИ ПРОИЗОШЛА ОШИБКА
        // --------------------------------

        // Для разработчика —
        // подробности в консоль.
        console.error(error);


        // Для пользователя —
        // простое сообщение.
        apiStatus.textContent =
            'Не удалось загрузить данные.';


    } finally {

        // --------------------------------
        // ВЫПОЛНЯЕТСЯ ВСЕГДА
        // --------------------------------

        // Снова включаем кнопку.
        loadPostsButton.disabled = false;


        // Возвращаем нормальный текст.
        loadPostsButton.textContent =
            'Обновить публикации';
    }
}



// ------------------------------------------------------------
// ЗАПУСК API-ЗАПРОСА
// ------------------------------------------------------------

loadPostsButton.addEventListener(
    'click',
    function () {

        // По клику вызывается
        // асинхронная функция.
        loadPosts();
    }
);