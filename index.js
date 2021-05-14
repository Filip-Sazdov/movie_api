const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Models = require("./models.js");
const cors = require("cors");
const { check, validationResult } = require("express-validator");

/**
 * Declare Movies variable which represents the Movie schema
 * @type {object}
 */
const Movies = Models.Movie;
const Users = Models.User;

const passport = require("passport");
require("./passport");

const app = express();

app.use(cors());
// bodyParser.json() is replaced by express.json() but the exercise specifies the former
app.use(bodyParser.json());

let auth = require("./auth")(app);

// Morgan is a package for keeping logs
app.use(morgan("common"));
// Express.static returns all the static files located within the folder name provided as an argument
app.use(express.static("public"));

// mongoose.connect('mongodb://localhost:27017/movie_APIDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });


/**
 * This method sends the welcome message from the movie api back to the user.
 * @param endpoint and callback
 */
app.get("/", (req, res) => {
	res.send(
		"Welcome to myFlix, my Movie API! To access the API, please use its front-end found at: https://movie-api-client.netlify.app/. Alternatively, feel free to access the documentation found at: https://movie-api-on-heroku.herokuapp.com/documentation.html. "
	);
});

// Movies endpoints
// Get all movies

/**
 * This method makes a call to the movies endpoint,
 * authenticates the user using passport and jwt 
 * and returns an array of movies objects.
 * @returns {object}
 */
app.get("/movies", passport.authenticate("jwt", { session: false }), (req, res) => {
	Movies.find().then((movies) => {
		res.status(200).json(movies);
	});
});

// Return single movie data
/**
 * This method makes a call to the movie title endpoint,
 * authenticates the user using passport and jwt 
 * and returns a movies object.
 */
app.get("/movies/:Title", passport.authenticate("jwt", { session: false }), (req, res) => {
	Movies.findOne({ Title: req.params.Title })
		.then((movie) => {
			res.status(200).json(movie);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send("Error: " + err);
		});
});

// Genre description by genre name
/**
 * This method makes a call to the movie genre name endpoint,
 * authenticates the user using passport and jwt 
 * and returns a genre object.
 */
app.get("/movies/genre/:Name", passport.authenticate("jwt", { session: false }), (req, res) => {
	Movies.findOne({ "Genre.Name": req.params.Name }).then((movie) => {
		res.status(200).json(movie.Genre);
	});
});

// Get director by name
/**
 * This method makes a call to the movie director name endpoint,
 * authenticates the user using passport and jwt 
 * and returns a director object.
 */
app.get("/movies/director/:Name", passport.authenticate("jwt", { session: false }), (req, res) => {
	Movies.findOne({ "Director.Name": req.params.Name }).then((movie) => {
		res.status(200).json(movie.Director);
	});
});

// Users endpoints
// Get all users

/**
 * This method makes a call to the users endpoint,
 * authenticates the user using passport and jwt 
 * and returns an array of user objects.
 */
app.get("/users", passport.authenticate("jwt", { session: false }), (req, res) => {
	Users.find()
		.then((users) => {
			res.status(201).json(users);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send("Error: " + err);
		});
});

// Get user by username
/**
 * This method makes a call to the user's username endpoint,
 * authenticates the user using passport and jwt 
 * and returns a user object.
 */
app.get("/users/:Username", passport.authenticate("jwt", { session: false }), (req, res) => {
	Users.findOne({ Username: req.params.Username })
		.then((user) => {
			res.json(user);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send("Error: " + err);
		});
});

//Add a user
/**
* This method makes a call to the users endpoint,
* validates the object sent through the request
* and creates a user object in the users array
* if one does not already exist with the same username.
*
* We’ll expect JSON in this format for the user object:
*{
*	ID: Integer,
*	Username: String,
*	Password: String,
*	Email: String,
*	Birthday: Date 
*}
 */

app.post(
	"/users",
	[
		check("Username", "Username is required").isLength({ min: 5 }),
		check("Username", "Username contains non alphanumeric characters - not allowed.").isAlphanumeric(),
		check("Password", "Password is required").not().isEmpty(),
		check("Password", "Password must be at least 5 characters.").isLength({ min: 5 }),
		check("Email", "Email does not appear to be valid").isEmail(),
	],
	(req, res) => {
		// check the validation object for errors
		let errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		let hashedPassword = Users.hashPassword(req.body.Password);
		Users.findOne({ Username: req.body.Username })
			.then((user) => {
				if (user) {
					return res.status(400).send(req.body.Username + "already exists");
				} else {
					Users.create({
						Username: req.body.Username,
						Password: hashedPassword,
						Email: req.body.Email,
						Birthday: req.body.Birthday,
					})
						.then((user) => {
							res.status(201).json(user);
						})
						.catch((error) => {
							console.error(error);
							res.status(500).send("Error: " + error);
						});
				}
			})
			.catch((error) => {
				console.error(error);
				res.status(500).send("Error: " + error);
			});
	}
);

/**
* Update a user's info, by username
*We’ll expect JSON in this format
*{
*	Username: String,
*	(required)
*	Password: String,
*	(required)
*	Email: String,
*	(required)
*	Birthday: Date
*}
 */
app.put(
	"/users/:Username",
	passport.authenticate("jwt", { session: false }),
	[
		check("Username", "Username must be at least 5 characters.").isLength({ min: 5 }),
		check("Username", "Username contains non alphanumeric characters - not allowed.").isAlphanumeric(),
		check("Password", "Password is required").not().isEmpty(),
		check("Password", "Password must be at least 5 characters.").isLength({ min: 5 }),
		check("Email", "Email does not appear to be valid").isEmail(),
	],
	(req, res) => {
		// check the validation object for errors
		let errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		let hashedPassword = Users.hashPassword(req.body.Password);
		Users.findOneAndUpdate(
			{ Username: req.params.Username },
			{
				$set: {
					Username: req.body.Username,
					Password: hashedPassword,
					Email: req.body.Email,
					Birthday: req.body.Birthday,
				},
			},
			{ new: true }, // This line makes sure that the updated document is returned
			(err, updatedUser) => {
				if (err) {
					console.error(err);
					res.status(500).send("Error: " + err);
				} else {
					res.json(updatedUser);
				}
			}
		);
	}
);

// Add a movie to a user's list of favorites
/**
* This method makes a call to the user's movies endpoint,
* validates the object sent through the request
* and pushes the movieID in the FavoriteMovies array.
* 
* We’ll expect JSON in this format for the request object:
*{
*	ID: Integer,
*	Username: String,
*}
 */
app.post(
	"/users/:Username/Movies/:MovieID",
	passport.authenticate("jwt", { session: false }),
	[
		check("Username", "Username is required").isLength({ min: 5 }),
		check("Username", "Username contains non alphanumeric characters - not allowed.").isAlphanumeric(),
		check("MovieID", "MovieID is required").not().isEmpty(),
		check("MovieID", "MovieID contains non alphanumeric characters - not allowed.").isAlphanumeric(),
	],
	(req, res) => {
		Users.findOneAndUpdate(
			{ Username: req.params.Username },
			{
				$push: { FavoriteMovies: req.params.MovieID },
			},
			{ new: true }, // This line makes sure that the updated document is returned
			(err, updatedUser) => {
				if (err) {
					console.error(err);
					res.status(500).send("Error: " + err);
				} else {
					res.json(updatedUser);
				}
			}
		);
	}
);

//remove movie from favorites
/**
* This method makes a call to the user's movies endpoint,
* validates the object sent through the request
* and deletes the movieID from the FavoriteMovies array.
* 
* We’ll expect JSON in this format for the request object:
*{
*	ID: Integer,
*	Username: String,
*}
 */
app.delete(
	"/users/:Username/Movies/:MovieID",
	passport.authenticate("jwt", { session: false }),
	[
		check("Username", "Username is required").isLength({ min: 5 }),
		check("Username", "Username contains non alphanumeric characters - not allowed.").isAlphanumeric(),
		check("MovieID", "MovieID is required").not().isEmpty(),
		check("MovieID", "MovieID contains non alphanumeric characters - not allowed.").isAlphanumeric(),
	],
	(req, res) => {
		Users.findOneAndUpdate(
			{ Username: req.params.Username },
			{
				$pull: { FavoriteMovies: req.params.MovieID },
			},
			{ new: true }, // This line makes sure that the updated document is returned
			(err, updatedUser) => {
				if (err) {
					console.error(err);
					res.status(500).send("Error: " + err);
				} else {
					res.json(updatedUser);
				}
			}
		);
	}
);

// Delete a user by username
app.delete(
	"/users/:Username",
	passport.authenticate("jwt", { session: false }),
	[
		check("Username", "Username is required").isLength({ min: 5 }),
		check("Username", "Username contains non alphanumeric characters - not allowed.").isAlphanumeric(),
	],
	(req, res) => {
		Users.findOneAndRemove({ Username: req.params.Username })
			.then((user) => {
				if (!user) {
					res.status(400).send(req.params.Username + " was not found");
				} else {
					res.status(200).send(req.params.Username + " was deleted.");
				}
			})
			.catch((err) => {
				console.error(err);
				res.status(500).send("Error: " + err);
			});
	}
);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});
// Use pre-configured port number in the environment variable or 8080
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
	console.log("Listening on Port " + port);
});
