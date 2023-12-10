var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const routes = require('./routes/personagemIndex');
require('dotenv').config();

const secret = process.env.SECRET;


// 4 cruds
var personagemRouter = require('./routes/personagemIndex');
var jogadorRouter = require('./routes/jogadorIndex');
var mestreRouter = require('./routes/mestreIndex');
var animalRouter = require('./routes/animalIndex');

var rotaUsuarios = require('./routes/users');
var rotaLogin = require('./routes/login');


var app = express();

app.use(express.json());
app.use('/', routes);

//Usuário
app.use('/usuarios', rotaUsuarios);

//Login
app.use('/', rotaLogin);

app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 4 cruds
app.use('/personagem', personagemRouter);
app.use('/jogador', jogadorRouter);
app.use('/mestre', mestreRouter);
app.use('/animal', animalRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({mensagem: "Um erro desconhecido ocorreu."});
});

module.exports = app;
