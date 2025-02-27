const http = require('http');

const server = http.createServer((req, res) => {
    console.log('Запрос получен');

    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8'
        });
        res.end('\
            <h1>Корневая страница</h1>\
            <p>Просмотров: <label class="counter"></label></p>\
            <a href="http://localhost:3000/about">Ссылка на страницу /about</a>\
            <script>\
                let first_web = localStorage.getItem("first_web");\
                first_web++;\
                localStorage.setItem("first_web", first_web);\
                let counter = document.querySelector(".counter");\
                counter.textContent = `${first_web}`;\
            </script>\
        ');
    } else if (req.url === '/about') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8'
        });
        res.end('\
            <h1>Страница about</h1>\
            <p>Просмотров: <label class="counter"></label></p>\
            <a href="http://localhost:3000">Ссылка на страницу /</a>\
            <script>\
                let second_web = localStorage.getItem("second_web");\
                second_web++;\
                localStorage.setItem("second_web", second_web);\
                let counter = document.querySelector(".counter");\
                counter.textContent = `${second_web}`;\
            </script>\
        ');
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=UTF-8'
        });
        res.end('<h1>Страница не найдена!</h1>');
    }

});

const port = 3000;

server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});