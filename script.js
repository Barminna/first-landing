const button = document.querySelector('#demoButton');
const message = document.querySelector('#demoMessage');
const toolsGrid = document.querySelector('#toolsGrid');




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