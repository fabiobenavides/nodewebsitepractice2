const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const sessionsRouter = require('./src/router/sessionsRouter');
const adminRouter = require('./src/router/adminRouter');
const authRouter = require('./src/router/authRouter');

const PORT = process.env.PORT || 4000; //default
const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//app.use(cookieParser);
app.use(session({secret: 'fabiopsctesting'}));

require('./src/config/passport.js')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/admin', adminRouter);
app.use('/sessions', sessionsRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.render('index', {title:'Welcome to Fabiomantics', data: ['a', 'b', 'c']});
})

app.listen(PORT, () => {
    debug(`Listening on port ${chalk.green(PORT)}`);
})
