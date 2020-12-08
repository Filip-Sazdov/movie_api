const express = require('express'),
	morgan = require('morgan');

const app = express();

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

app.get('/', (req, res) => {
	res.send('Welcome to my app!');
});

app.get('/movies', (req, res) => {
	res.json(listOfMovies);
});

app.get('/documentation', (req, res) => {
	res.sendFile('public/documentation.html', { root: __dirname });
});

app.listen(8080, () => {
	console.log('Your app is listening on port 8080.');
});
