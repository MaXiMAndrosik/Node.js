const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Главная страница</h1>'
        + '<a href="/about">Обо мне</a>'
    );
});

app.get('/about', (req, res) => {
    res.send('<h1>Страница обо мне</h1>'
        + '<a href="/">Главная</a>'
    );
});

app.listen(3000);