var express = require('express');
var app = express();

var port = process.env.PORT || 5000;
var nav = [{
	Link: '/Books',
	Text: 'Books'
		}, {
	Link: '/Authors',
	Text: 'Authors'
		}];

var bookRouter = require('./src/routes/bookRoutes')(nav);
app.use(express.static('public'));
//tell express where we store views, set a variable calles views to ./src/views NOTE: ./ is important , if omit won't work
app.set('views', './src/views');

var handlebars = require('express-handlebars');
app.engine('.hbs', handlebars({
	extname: '.hbs'
}));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	res.render('index', {
		title: 'HOME',
		nav: [{
			Link: '/Books',
			Text: 'Books'
		}, {
			Link: '/Authors',
			Text: 'Authors'
		}]
	});
});

app.use('/Books', bookRouter);
var books = [{
	title: 'title',
	author: 'Author'
}, {
	title: 'title2',
	author: 'Author2'
}]
bookRouter.route('/')
	.get(function (req, res) {
		res.render('books', {
			title: 'BOOKS',
			nav: [{
				Link: '/Books',
				Text: 'Books'
		}, {
				Link: '/Authors',
				Text: 'Authors'
		}],
			books: books
		});
	});


app.get('/authors', function (req, res) {
	res.render('index', {
		title: 'AUTHORS',
		nav: [{
			Link: '/Books',
			Text: 'Books'
		}, {
			Link: '/Authors',
			Text: 'Authors'
		}]
	});
});

app.listen(port, function (err) {
	console.log('running server on port ' + port);
});
