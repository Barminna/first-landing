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


// приложение список задач
const savedTasks =
    localStorage.getItem('tasks');

let tasks =
    savedTasks
        ? JSON.parse(savedTasks)
        : [];  //пустой массив

function renderTasks() {
    todoList.innerHTML = '';

    tasks.forEach(function (task) {
        const item =
            document.createElement('li');

        item.classList.add('todo-item');
            if (task.completed) {
                item.classList.add('completed');
            }


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


//меняет ложь на истину
const checkbox =
    item.querySelector('.todo-item__checkbox');

checkbox.addEventListener('change', function () {
    task.completed = checkbox.checked;
    saveTasks();
    renderTasks();
});

//добавляем удаление
const deleteButton =
    item.querySelector('.todo-item__delete');

    deleteButton.addEventListener('click', function () {
    tasks = tasks.filter(function (item) {
        return item.id !== task.id;
    });
    saveTasks();
    renderTasks();
});
        todoList.append(item);
    });
}

renderTasks();

clearCompletedButton.addEventListener('click', function () {
    tasks = tasks.filter(function (task) {
        return !task.completed;
    });

    saveTasks();
    renderTasks();
});

const completedCount =
    tasks.filter(function (task) {
        return task.completed;
    }).length;

//дз кнопка

    saveTasks();
    renderTasks();
});
        todoList.append(item);
    });


todoCounter.textContent =
    `Всего задач: ${tasks.length}. Выполнено: ${completedCount}.`;

//отправка формы
todoForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (text === '') {
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);
        saveTasks();
        renderTasks();

    taskInput.value = '';
});


//функция сохранения из браузера
function saveTasks() {
    localStorage.setItem(
        'tasks',
        JSON.stringify(tasks)
    );
}