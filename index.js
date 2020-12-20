const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

const app = express();
// Morgan is a package for keeping logs
app.use(morgan('common'));
// Express.static returns all the static files located within the folder name provided as an argument
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/movie_APIDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
	res.send('Welcome to my Movie App!');
});

// Movies endpoints
app.get('/movies', (req, res) => {
	res.json(movies);
});

// Return single movies data
app.get('/movies/:Title', (req, res) => {
	res.json(
		movies.find((movie) => {
			return movie.Title === req.params.Title;
		})
	);
});
// Genre description by genre name
app.get('/movies/genre/:Name', (req, res) => {
	res.json(
		movies.find((movie) => {
			return movie.Genre.Name === req.params.Name;
		}).Genre
	);
});
// Get director by name
app.get('/movies/director/:Name', (req, res) => {
	res.json(
		movies.find((movie) => {
			return movie.Director.Name === req.params.Name;
		}).Director
	);
});

// Users endpoints
// All users
// app.get('/users', function (req, res) {
// 	res.json(users);
// });

app.get('/users', (req, res) => {
	Users.find()
		.then((users) => {
			res.status(201).json(users);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});

// Get user by username
// app.get('/users/:Username', (req, res) => {
// 	res.json(
// 		users.find((user) => {
// 			return user.Username === req.params.Username;
// 		})
// 	);
// });

app.get('/users/:Username', (req, res) => {
	Users.findOne({ Username: req.params.Username })
		.then((user) => {
			res.json(user);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});

// Add user data
// app.post('/users', (req, res) => {
// 	res.status(201).send('User added!');
// });

//Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date 
}*/

app.post('/users', (req, res) => {
	Users.findOne({ Username: req.body.Username })
		.then((user) => {
			if (user) {
				return res.status(400).send(req.body.Username + 'already exists');
			} else {
				Users.create({
					Username: req.body.Username,
					Password: req.body.Password,
					Email: req.body.Email,
					Birthday: req.body.Birthday,
				})
					.then((user) => {
						res.status(201).json(user);
					})
					.catch((error) => {
						console.error(error);
						res.status(500).send('Error: ' + error);
					});
			}
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send('Error: ' + error);
		});
});

// Update user data
// app.put('/users/:Username', (req, res) => {
// 	res.json(
// 		users.find((user) => {
// 			return user.Username === req.params.Username;
// 		})
// 	);
// });

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username', (req, res) => {
	Users.findOneAndUpdate(
		{ Username: req.params.Username },
		{
			$set: {
				Username: req.body.Username,
				Password: req.body.Password,
				Email: req.body.Email,
				Birthday: req.body.Birthday,
			},
		},
		{ new: true }, // This line makes sure that the updated document is returned
		(err, updatedUser) => {
			if (err) {
				console.error(err);
				res.status(500).send('Error: ' + err);
			} else {
				res.json(updatedUser);
			}
		}
	);
});

//add movie to favorites
// app.post('/users/:Username/favorites/:Title', (req, res) => {
// 	res.status(201).send('Succesfully added movie to favorites!');
// });

// Add a movie to a user's list of favorites
app.post('/users/:Username/Movies/:MovieID', (req, res) => {
	Users.findOneAndUpdate(
		{ Username: req.params.Username },
		{
			$push: { FavoriteMovies: req.params.MovieID },
		},
		{ new: true }, // This line makes sure that the updated document is returned
		(err, updatedUser) => {
			if (err) {
				console.error(err);
				res.status(500).send('Error: ' + err);
			} else {
				res.json(updatedUser);
			}
		}
	);
});

//remove movie from favorites
app.delete('/users/:Username/favorites/:Title', (req, res) => {
	res.status(201).send('Successfully removed movie from favorites.');
});
// remove user
app.delete('/users/:Email', (req, res) => {
	res.status(201).send('User Deleted.');
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

app.listen(8080, () => {
	console.log('Your app is listening on port 8080.');
});
