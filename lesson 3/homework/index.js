const express = require('express');
const data = require('./public/scripts/getData');

const app = express();

app.get('/', async (req, res) => {
    const result = await data.get('index');
    res.send('<h1>Корневая страница</h1>'
            + '<p>Просмотров: <label class="counter">' + result + '</label></p>'
            + '<a href="/about">Ссылка на страницу /about</a>');
});


app.get('/about', async (req, res) => {
    const result = await data.get('about');
    res.send('<h1>Страница about</h1>'
        + '<p>Просмотров: <label class="counter">' + result + '</label></p>'
        + '<a href="/">Ссылка на страницу /</a>');
});

app.listen(3000);