var  express = require('express');
var  app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public'));
//tell express where we store views, set a variable calles views to ./src/views NOTE: ./ is important , if omit won't work
app.set('views', './src/views');

var handlebars = require('express-handlebars');
app.engine('.hbs',handlebars({extname: '.hbs'}));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {title: 'Hello from render', list: ['Menu1', 'Menu2']});
});

app.get('/books', function (req, res) {
    res.send('Hello Books');
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});

 