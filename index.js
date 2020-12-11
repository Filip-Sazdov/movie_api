const express = require('express'),
	morgan = require('morgan');

const app = express();

let users = [
	{
		id: 1,
		Username: 'Hannah Keating',
		Password: '1234',
		Email: 'h.monet1104@gmail.com',
		Birthday: '11/04/1990',
		FavoriteMovies: [],
	},
	{
		id: 2,
		Username: 'Natasha Keating',
		Password: '5678',
		Email: 'h.monet1104@yahoo.com',
		Birthday: '11/04/1990',
		FavoriteMovies: [],
	},
	{
		id: 3,
		Username: 'Sean Keating',
		Password: '5555',
		Email: 'seank@gmail.com',
		Birthday: '11/04/1990',
		FavoriteMovies: [],
	},
];

let listOfMovies = [
	{
		title: 'The Matrix',
		'Written by': 'The Wachowskis',
	},
	{
		title: 'The Matrix Reloaded',
		'Written by': 'The Wachowskis',
	},
	{
		title: 'The Matrix Revolutions',
		'Written by': 'The Wachowskis',
	},
	{
		title: 'Star Wars: Episode IV - A New Hope',
		'Written by': 'George Lucas',
	},
	{
		title: 'E.T. the Extra-Terrestrial',
		'Written by': 'Melissa Mathison',
	},
	{
		title: 'The Bridge on the River Kwai',
		'Written by': 'Pierre Boulle',
	},
	{
		title: 'Ben-Hur',
		'Written by': 'Lew Wallace',
	},
	{
		title: 'Gladiator',
		'Written by': 'David Franzoni',
	},
	{
		title: 'Saving Private Ryan',
		'Written by': 'Robert Rodat',
	},
	{
		title: 'Close Encounters of the Third Kind',
		'Written by': 'Steven Spielberg',
	},
];

app.use(morgan('common'));

app.use('/documentation', express.static('public/documentation.html'));

app.get('/', (req, res) => {
	res.send('Welcome to my app!');
});

app.get('/movies', (req, res) => {
	res.json(listOfMovies);
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

app.listen(8080, () => {
	console.log('Your app is listening on port 8080.');
});
