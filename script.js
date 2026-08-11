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


    // =================================
    // ЭЛЕМЕНТЫ ПОИСКА И ФИЛЬТРАЦИИ
    // =================================


    // Поле поиска по заголовку публикации.
    const postSearch =
        document.querySelector(
            '#postSearch'
        );

    // Поле отдельного поиска
    // по основному тексту публикации.
    const postSearchBody =
        document.querySelector(
            '#postSearchBody'
        );

    // Выпадающий список авторов.
    const authorFilter =
        document.querySelector(
            '#authorFilter'
        );


    // Выпадающий список сортировки.
    const postSort =
        document.querySelector(
            '#postSort'
        );

    
// ============================================================
// ОТОБРАЖЕНИЕ ПУБЛИКАЦИЙ API
// ============================================================
//
// Теперь функция получает ДВА массива:
//
// posts — публикации;
// users — пользователи.
//
// Благодаря этому мы можем
// для каждой публикации найти её автора.
//
// ============================================================

function renderPosts(posts, users) {


    console.log(
    'renderPosts получил:',
    posts,
    users
    );
    // Перед новой отрисовкой
    // удаляем старые карточки.
    apiGrid.innerHTML = '';


    // Перебираем публикации.
    posts.forEach(function (post) {

        // ----------------------------------------------------
        // ИЩЕМ АВТОРА ТЕКУЩЕЙ ПУБЛИКАЦИИ
        // ----------------------------------------------------
        //
        // В объекте post находится:
        //
        // post.userId
        //
        // Например:
        //
        // {
        //     userId: 3,
        //     id: 25,
        //     title: "...",
        //     body: "..."
        // }
        //
        // Значит нам нужно найти пользователя,
        // у которого:
        //
        // user.id === post.userId
        //
        // find() возвращает ПЕРВЫЙ
        // подходящий объект.

        const author =
            users.find(function (user) {

                return (
                    user.id === post.userId
                );
            });

          console.log(
                'Пост:',
                post.id,
                'userId:',
                post.userId,
                'Найден автор:',
                author
            );


        // ----------------------------------------------------
        // СОЗДАЁМ КАРТОЧКУ
        // ----------------------------------------------------

        const card =
            document.createElement(
                'article'
            );


        card.classList.add(
            'api-card'
        );


        // ----------------------------------------------------
        // ИМЯ АВТОРА
        // ----------------------------------------------------
        //
        // Обычно author будет найден.
        //
        // Но хороший код должен учитывать,
        // что нужного пользователя
        // теоретически может не оказаться.
        //
        // Поэтому используем проверку:
        //
        // author ? author.name : 'Неизвестный автор'
        //
        // Это называется тернарный оператор.

        const authorName =
            author
                ? author.name
                : 'Неизвестный автор';

        // Если автор найден,
        // берём его email.
        //
        // Если автора по какой-то причине нет,
        // показываем запасной текст.
        const authorEmail =
            author
                ? author.email
                : 'Email неизвестен';


        const authorCompany =
            author
                ? author.company.name
                : 'Компания неизвестна';


        // ----------------------------------------------------
        // ЗАПОЛНЯЕМ КАРТОЧКУ
        // ----------------------------------------------------

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
                <strong>Автор:</strong>
                ${authorName}
            </p>
            <p>
                <strong>Email:</strong>
                ${authorEmail}
            </p>

            <p>
                <strong>Компания:</strong>
                ${authorCompany}
            </p>
        `;


        // Добавляем карточку
        // на страницу.
        apiGrid.append(card);
    });
}


// =================================
// ХРАНИЛИЩЕ ЗАГРУЖЕННЫХ ДАННЫХ
// =================================


// Сюда сохраним публикации,
// полученные с сервера.
let loadedPosts = [];


// Сюда сохраним пользователей.
let loadedUsers = [];


// ============================================================
// ЗАГРУЗКА ПУБЛИКАЦИЙ И ПОЛЬЗОВАТЕЛЕЙ
// ============================================================
//
// async позволяет использовать await.
//
// await нужен,
// когда результат операции
// появится не мгновенно,
// например после ответа сервера.
//
// Теперь мы загружаем сразу два ресурса:
//
// 1. posts
// 2. users
//
// Они друг от друга не зависят,
// поэтому запускаем оба запроса одновременно
// через Promise.all().
//
// ============================================================

async function loadPosts() {

    // --------------------------------------------------------
    // СОСТОЯНИЕ "ЗАГРУЗКА"
    // --------------------------------------------------------

    apiStatus.textContent =
        'Загрузка публикаций и авторов...';


    loadPostsButton.disabled = true;


    loadPostsButton.textContent =
        'Загрузка...';


    try {

        // ----------------------------------------------------
        // ПОЛУЧАЕМ КОЛИЧЕСТВО ПУБЛИКАЦИЙ
        // ----------------------------------------------------

        


        // ----------------------------------------------------
        // ЗАПУСКАЕМ ДВА ЗАПРОСА ОДНОВРЕМЕННО
        // ----------------------------------------------------
        //
        // fetch(posts) запускает первый запрос.
        //
        // fetch(users) запускает второй запрос.
        //
        // Promise.all() ждёт завершения обоих.
        //
        // После этого:
        //
        // postsResponse содержит Response
        // от /posts
        //
        // usersResponse содержит Response
        // от /users

        const [
            postsResponse,
            usersResponse            
        ] = await Promise.all([

            fetch(
                'https://jsonplaceholder.typicode.com/posts'
            ),

            fetch(
                'https://jsonplaceholder.typicode.com/users'
            )

            
        ]);



        // ----------------------------------------------------
        // ПРОВЕРЯЕМ ОБА HTTP-ОТВЕТА
        // ----------------------------------------------------

        if (!postsResponse.ok) {

            throw new Error(
                `Ошибка загрузки публикаций: ${postsResponse.status}`
            );
        }


        if (!usersResponse.ok) {

            throw new Error(
                `Ошибка загрузки пользователей: ${usersResponse.status}`
            );
        }

        



        // ----------------------------------------------------
        // ЧИТАЕМ JSON
        // ----------------------------------------------------
        //
        // Здесь тоже есть ДВЕ независимые
        // асинхронные операции.
        //
        // Поэтому их тоже можно выполнить
        // одновременно через Promise.all().

        const [
            posts,
            users
            
        ] = await Promise.all([

            postsResponse.json(),

            usersResponse.json()
            
            
        ]);

        // Сохраняем данные,
        // чтобы потом использовать их
        // для поиска, фильтрации и сортировки.
        loadedPosts = posts;
        loadedUsers = users; 

           
            renderAuthorOptions(
                loadedUsers
            );

            // Применяем текущие настройки интерфейса
            // и показываем публикации.
            applyPostFilters();

        // ----------------------------------------------------
        // ОГРАНИЧИВАЕМ КОЛИЧЕСТВО ПОСТОВ
        // ----------------------------------------------------

        



       // ----------------------------------------------------
        // ПЕРЕДАЁМ ДВА МАССИВА В renderPosts()
        // ----------------------------------------------------
        //
        // Раньше:
        //
        // renderPosts(firstPosts);
        //
        // Теперь:
        //
        // renderPosts(firstPosts, users);
        //
        // Потому что функции нужны
        // данные и публикаций, и авторов.

        



        // ----------------------------------------------------
        // СООБЩЕНИЕ ОБ УСПЕХЕ
        // ----------------------------------------------------

        


    } catch (error) {

        // ----------------------------------------------------
        // ОБРАБОТКА ОШИБКИ
        // ----------------------------------------------------

        console.error(error);


        apiStatus.textContent =
            'Не удалось загрузить данные.';


    } finally {

        // ----------------------------------------------------
        // ВОЗВРАЩАЕМ КНОПКУ
        // ----------------------------------------------------

        loadPostsButton.disabled = false;


        loadPostsButton.textContent =
            'Обновить публикации';
    }
}

// =================================
// СОБЫТИЯ ФИЛЬТРОВ
// =================================


// Поиск срабатывает
// при каждом изменении текста.
postSearch.addEventListener(
    'input',
    function () {

        applyPostFilters();
    }
);

// Когда пользователь печатает
// во втором поле поиска,
// тоже запускаем фильтрацию.
postSearchBody.addEventListener(
    'input',
    function () {

        applyPostFilters();
    }
);



// Фильтр автора.
authorFilter.addEventListener(
    'change',
    function () {

        applyPostFilters();
    }
);


// Сортировка.
postSort.addEventListener(
    'change',
    function () {

        applyPostFilters();
    }
);


// Изменение количества карточек.
postsCount.addEventListener(
    'change',
    function () {

        applyPostFilters();
    }
);


// =================================
// ЗАПОЛНЕНИЕ ФИЛЬТРА АВТОРОВ
// =================================

function renderAuthorOptions(users) {

    // Сначала оставляем только
    // базовый вариант "Все авторы".
    authorFilter.innerHTML = `
        <option value="all">
            Все авторы
        </option>
    `;


    // Перебираем пользователей.
    users.forEach(function (user) {

        // Создаём новый option.
        const option =
            document.createElement(
                'option'
            );


        // В value сохраняем id автора.
        option.value =
            user.id;


        // Пользователь видит имя.
        option.textContent =
            user.name;


        // Добавляем option в select.
        authorFilter.append(option);
    });
}


// =================================
// ПОИСК, ФИЛЬТРАЦИЯ И СОРТИРОВКА
// =================================

function applyPostFilters() {

    // Начинаем с копии массива.
    //
    // [...loadedPosts]
    // создаёт новый массив,
    // чтобы не изменять исходные данные.
    let result =
        [...loadedPosts];


    // --------------------------------
    // ПОИСК
    // --------------------------------

    // Берём текст из поля поиска.
    //
    // trim() убирает лишние пробелы.
    //
    // toLowerCase() приводит всё
    // к нижнему регистру.
    const searchText =
        postSearch.value
            .trim()
            .toLowerCase();

    // Получаем текст из второго поля поиска.
    // trim() убирает пробелы по краям.
    // toLowerCase() убирает зависимость
    // поиска от регистра букв.
    const searchBodyText =
        postSearchBody.value
            .trim()
            .toLowerCase();


    // Если пользователь что-то ввёл,
    // фильтруем публикации.
    if (searchText !== '') {

        result =
            result.filter(
                function (post) {

                    // Заголовок тоже приводим
                    // к нижнему регистру.
                    const title =
                        post.title
                            .toLowerCase();

                    // Текст самой публикации.
                    // Тоже переводим в нижний регистр,
                    // чтобы поиск не зависел от регистра букв.
                    const body =
                        post.body
                            .toLowerCase();    


                    // includes() проверяет,
                    // встречается ли искомый текст
                    // либо в заголовке,
                    // либо в основном тексте
                    return title.includes(
                        searchText
                    );
                }
            );
    }

    // =================================
    // ПОИСК ПО ТЕКСТУ ПУБЛИКАЦИИ
    // =================================

    // Если второе поле НЕ пустое,
    // дополнительно фильтруем результат
    // по свойству post.body.
    if (searchBodyText !== '') {

        result =
            result.filter(
                function (post) {

                    // Получаем основной текст публикации
                    // и переводим его в нижний регистр.
                    const body =
                        post.body
                            .toLowerCase();


                    // Оставляем публикацию только тогда,
                    // когда в её тексте найдено
                    // содержимое второго поля поиска.
                    return body.includes(
                        searchBodyText
                    );
                }
            );
    }
    

    // --------------------------------
    // ФИЛЬТР ПО АВТОРУ
    // --------------------------------

    const selectedAuthor =
        authorFilter.value;


    // Если выбрали конкретного автора.
    if (selectedAuthor !== 'all') {

        // Значение select приходит строкой,
        // а post.userId — число.
        //
        // Поэтому используем Number().
        const authorId =
            Number(selectedAuthor);


        result =
            result.filter(
                function (post) {

                    return (
                        post.userId ===
                        authorId
                    );
                }
            );
    }


    // --------------------------------
    // СОРТИРОВКА
    // --------------------------------

    const sortValue =
        postSort.value;


    // От меньшего id к большему.
    if (sortValue === 'id-asc') {

        result.sort(
            function (a, b) {

                return a.id - b.id;
            }
        );
    }


    // От большего id к меньшему.
    if (sortValue === 'id-desc') {

        result.sort(
            function (a, b) {

                return b.id - a.id;
            }
        );
    }


    // --------------------------------
    // КОЛИЧЕСТВО
    // --------------------------------

    const count =
        Number(postsCount.value);


    // После всех фильтров
    // ограничиваем количество карточек.
    const visiblePosts =
        result.slice(
            0,
            count
        );


    // --------------------------------
    // ОТРИСОВКА
    // --------------------------------

    renderPosts(
        visiblePosts,
        loadedUsers
    );


    // --------------------------------
    // СТАТУС
    // --------------------------------

   // Если после всех фильтров
        // в массиве ничего не осталось...
        if (result.length === 0) {

            apiStatus.textContent =
                'Ничего не найдено.';

        } else {

            // ИНАЧЕ публикации есть —
            // показываем обычную статистику.
            apiStatus.textContent =
                `Найдено публикаций: ${result.length}. Показано: ${visiblePosts.length}.`;
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