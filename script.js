const button = document.querySelector('#demoButton');
const message = document.querySelector('#demoMessage');

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