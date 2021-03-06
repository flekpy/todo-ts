const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const { check } = require('express-validator');
const tagsRouter = require('./routers/tagsRouter');
const todosRouter = require('./routers/todosRouter/todosRouter');
const todosEditRouter = require('./routers/todosRouter/todosEditRouter');
const registerRouter = require('./routers/authRouter/registerRouter');
const loginRouter = require('./routers/authRouter/loginRouter');
const logoutRouter = require('./routers/authRouter/logoutRouter');
const authRouter = require('./routers/authRouter/authRouter');

const app = express();

const sessionConfig = {
  store: new FileStore(),
  name: 'sid',
  secret: process.env.SESSION_SECRET ?? 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  },
};

app.use(cors({ origin: true, credentials: true }));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session(sessionConfig));

app.use('/api/users/registration', [
  check('name', 'Имя пользователя не должно быть пустым').notEmpty(),
  check('email', 'Email пользователя не должен быть пустым').notEmpty(),
  check('password', 'Пароль не может быть меньше 3 символов').isLength({ min: 1 }),
], registerRouter);
app.use('/api/users/login', loginRouter);
app.use('/api/users/logout', logoutRouter);
app.use('/api/users/me', authRouter);
app.use('/api/tags', tagsRouter);
app.use('/api/todos/:id', todosRouter);
app.use('/api/todos/edit/:id', todosEditRouter);

app.use((req, res, next) => {
  const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
  next(error);
});

app.use((err, req, res) => {
  const appMode = req.app.get('env');
  let error;

  if (appMode === 'development') {
    error = err;
  } else {
    error = {};
  }

  res.locals.message = err.message;
  res.locals.error = error;

  res.status(err.status || 500);

  res.render('error');
});

module.exports = app;
