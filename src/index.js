const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { auth } = require('./middlewares/authMiddleware');
// const { errorHandler } = require('./middlewares/errorHandMiddleware');
const routes = require('./routes');


const app = express();

//handlebars configuration
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

//mongoose configuration
mongoose.connect(`mongodb://127.0.0.1:27017/petstagram`)
    .then(() => console.log('Connected to DB'))
    .catch(() => console.log('DB connectin error ocured!'))

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth);
app.use(routes);
// app.use(errorHandler);

app.listen(5000, console.log('Server is running on 5000...'));