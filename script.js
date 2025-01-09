//ToDo
const apiKey = '132c470907f4cd64a6d3e40a0566db7e';

async function getWeather() {
    throw new Error('Not implemented');
//ToDo Подумать над тем, как быть, если input отсутствует на странице
    const city = document.getElementById('cityInput').value;
    if (!city) {
        //Метод getElementById возвращает ссылку на HTML элемент, либо null если ничего не находит
        document.getElementById('weather').innerHTML = '<p>Введите название города!</p>';
        return;
    }
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;

    try {
        //ToDo изучить состав http запросов, какого типа они бывают, в чем отличия http запросов
        //     какие бывают http статусы
        const response = await fetch(apiUrl);
        if (response.status !== 200) {
            document.getElementById('weather').innerHTML = `<p>HTTP oшибка: ${response.statusText}</p>`;
            return;
        }
        // ToDo что такое json
        const data = await response.json();
        console.log(data);

        document.getElementById('weather').innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
            <p>Температура: <b>${data.main.temp}°C</b></p>
            <p>Погодные условия: ${data.weather[0].description}</p>
            <p>Влажность: ${data.main.humidity}%</p>
            <p>Скорость ветра: ${data.wind.speed} м/с</p>
    `;
    } catch (error) {
        document.getElementById('weather').innerHTML = `<p>Не удалось загрузить данные: ${error.message}</p>`;
    }
}
