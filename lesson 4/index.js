const express = require('express');
const logger = require('./app/logger');
const { engine } = require('express-handlebars');
const { checkParams, checkBody } = require('./app/validation/validator');
const { userSchema, idScheme } = require('./app/validation/scheme');
const database = require('./app/handler/dbHandler');

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

let users, user;

app.use(express.json());

/**
 * Если базы данных не существует
 * Создание базы данных, "посев" одной записи
 */
// database.createDataBase();

/**
 * Подключение логгера
 * Запрос к базе данных для получения информации о пользователях
 */
app.use((req, resp, next) => {
    logger.log(req);
    database.getUsers()
        .then(item => users = item);
    // console.log(users);
    next();
});

/**
 * Главная страница
 * @method GET
 * @return {Rendered HTML 'Главная страница'}
 */
app.get('/', (req, res) => {
    res.status(200).render('home', {
        title: 'Home page',
        message: 'Главная страница',
        users: users
    });
    /**
     * @return { message: 'Главная страница'}
     */
    // res.status(200).send(
    //     {
    //         message: 'Главная страница',
    //     }
    // );
});

/**
 * Получение информации обо всех пользователях
 * @param {/users}
 * @method GET
 * @return {Rendered HTML 'Users not found'}
 * or
 * @return {Rendered HTML with all Users from database}
 */
app.get('/users', (req, res) => {
    if (users.length < 1) {
        res.status(204).render('users',
            { message: 'Users not found' }
        );
    } else {
        res.status(200).render('users', {
            title: 'Users page',
            message: 'Получение информации обо всех пользователя',
            users: users
        });
    }
    /**
     * @return {array of objects : users}
     * @return {[{ "id": integer, "firstName": string, "secondName": string, "age": integer, "city": string}, ...]}
     */
    // res.status(200).send(
    //     { users : users }
    // );
});

/**
 * Получение информации о пользователе по ID
 * @param {/users/:id - User ID}
 * @method GET
 * @return {Rendered HTML 'User not found'}
 * or
 * @return {Rendered HTML with User}
 */
app.get('/users/:id', (req, res) => {
    const user = users.find((user) => user.id === Number(req.params.id));
    if (!user) {
        res.status(200).render('home',
            { message: 'User not found' }
        );
    } else {
        res.status(200).render('users', {
            title: 'User page',
            message: 'Получение информации о конкретном пользовател',
            user: user
        });
    }
    /**
     * @return {object : user}
     * @return {{ "id": integer, "firstName": string, "secondName": string, "age": integer, "city": string}}
     */
    // res.status(200).send(
    //     { user : user }
    // );
});

/**
 * Создание пользователя
 * @param {/users}
 * @method POST
 * @return {Rendered HTML 'Пользователь SecondName создан'}
 */
app.post('/users', checkBody(userSchema), (req, res) => {
    database.addUser(req.body.firstName, req.body.secondName, req.body.age, req.body.city);
    res.status(201).render('home', {
        title: 'User add page',
        message: 'Пользователь ' + req.body.secondName + ' создан',
    });
    /**
     * @return { message }
     */
    // res.status(200).send(
    //     {
    //         message: 'Пользователь ' + req.body.secondName + ' создан',
    //     }
    // );
});

/**
 * Изменение информации о пользователе 
 * @param {/users/:id}
 * @method PUT
 * @return {Rendered HTML 'User not found'}
 * or
 * @return {Rendered HTML with User}
 */
app.put('/users/:id', checkParams(idScheme), checkBody(userSchema), (req, res) => {
    user = users.find(user => user.id === Number(req.params.id));
    if (!user) {
        res.status(204).render('home',
            { message: 'User not found' }
        );
    } else {
        database.updateUser(req.params.id, req.body.firstName, req.body.secondName, req.body.age, req.body.city)
        res.status(201).render('home', {
            title: 'User page',
            message: 'Информация пользователя ' + req.body.secondName + ' изменена',
        });
    }
    /**
     * @return { message }
     */
    // res.status(200).send(
    //     {
    //         message: 'Информация пользователя ' + req.body.secondName + ' изменена',
    //     }
    // );
});

/**
 * Удаление пользователя по id
 * @param {/users/:id}
 * @method DELETE
 * @return {Rendered HTML 'User not found'}
 * or
 * @return {Rendered HTML for all Users}
 */
app.delete('/users/:id', (req, res) => {
    user = users.find(user => user.id === Number(req.params.id));
    if (!user) {
        res.status(404).render('home',
            { message: 'User not found' }
        );
    } else {
        database.deleteUser(req.params.id);
        res.status(200).render('home', {
            title: 'Users page',
            message: 'Пользователь ' + user.firstName + ' удален',
        });
    }
    /**
     * @return { message }
     */
    // res.status(200).send(
    //     {
    //         message: 'Пользователь ' + user.firstName + ' удален',
    //     }
    // );
});

app.use((req, res) => {
    res.status(404).send(
        { message: 'URL not found' }
    );
});

app.listen(3000);