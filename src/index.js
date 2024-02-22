const express = require('express');
const routes = require('./routes');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();

//handlebars configuration
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views')

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(5000, console.log('Server is running on 5000...'));