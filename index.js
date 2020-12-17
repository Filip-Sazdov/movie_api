const express = require('express'),
	morgan = require('morgan');

const app = express();

let users = [
	{
		id: 1,
		Username: 'davidcohen2580',
		Password: 'test123',
		Email: 'davidcohen2580@gmail.com',
		Birthday: '1988-09-10',
		FavoriteMovies: [],
	},
	{
		id: 2,
		Username: 'larissamayer',
		Password: 'password555',
		Email: 'larissalove@yahoo.com',
		Birthday: '1995-05-04',
		FavoriteMovies: [],
	},
	{
		id: 3,
		Username: 'Hannah Keating',
		Password: '1234',
		Email: 'h.monet1104@gmail.com',
		Birthday: '1990-11-04',
		FavoriteMovies: [],
	},
	{
		id: 4,
		Username: 'Natasha Keating',
		Password: '5678',
		Email: 'n.monet1104@yahoo.com',
		Birthday: '1992-12-02',
		FavoriteMovies: [],
	},
	{
		id: 5,
		Username: 'Sean Keating',
		Password: '5555',
		Email: 'seank@gmail.com',
		Birthday: '1989-01-13',
		FavoriteMovies: [],
	},
];

let movies = [
	{
		id: 1,
		Title: 'Silence of the Lambs',
		Description:
			'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.',
		Genre: {
			Name: 'Thriller',
			Description:
				'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.',
		},
		Director: {
			Name: 'Jonathan Demme',
			Bio: 'Robert Jonathan Demme was an American director, producer, and screenwriter.',
			Birth: '1944',
			Death: '2017',
		},

		ImagePath:
			'https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,677,1000_AL_.jpg',
		Featured: true,
	},
	{
		id: 2,
		Title: 'Joker',
		Description:
			'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.',
		Genre: {
			Name: 'Drama',
			Description:
				'In film and television, drama is a genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. ... These terms tend to indicate a particular setting or subject-matter, or else they qualify the otherwise serious tone of a drama with elements that encourage a broader range of moods.',
		},
		Director: {
			Name: 'Todd Phillips',
			Bio:
				'Todd Phillips was born on December 20, 1970 in Brooklyn, New York City, New York, USA as Todd Bunzl. He is a producer and director, known for Joker (2019), Old School (2003) and Due Date (2010).',
			Birth: '1970',
			Death: '',
		},

		ImagePath:
			'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
		Featured: true,
	},
	{
		id: 3,
		Title: 'The Notebook',
		Description:
			'A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.',
		Genre: {
			Name: 'Romance',
			Description:
				'Romance films or romance movies are romantic love stories recorded in visual media for broadcast in theaters and on TV that focus on passion, emotion, and the affectionate romantic involvement of the main characters and the journey that their love takes them through dating, courtship or marriage.',
		},
		Director: {
			Name: 'Nick Cassavetes',
			Bio:
				"Nick Cassavetes was born in New York City, the son of actress Gena Rowlands and Greek-American actor and film director John Cassavetes. As a child, he appeared in two of his father's films: Husbands (1970) and A Woman Under the Influence (1974). After spending so much of his youth surrounded by the film industry, Cassavetes initially decided he did not want to go into the field. He instead attended Syracuse University on a basketball scholarship. ",
			Birth: '1959',
			Death: '',
		},

		ImagePath: 'https://m.media-amazon.com/images/M/MV5BMTk3OTM5Njg5M15BMl5BanBnXkFtZTYwMzA0ODI3._V1_.jpg',
		Featured: true,
	},
	{
		id: 4,
		Title: 'Harry Potter and the Deathly Hallows: Part 2',
		Description:
			"Harry, Ron, and Hermione search for Voldemort's remaining Horcruxes in their effort to destroy the Dark Lord as the final battle rages on at Hogwarts.",
		Genre: {
			Name: 'Adventure',
			Description:
				'Adventure film is a genre that revolves around the conquests and explorations of a protagonist. The purpose of the conquest can be to retrieve a person or treasure, but often the main focus is simply the pursuit of the unknown. These films generally take place in exotic locations and play on historical myths.',
		},
		Director: {
			Name: 'David Yates',
			Bio:
				'David Yates was born on October 8, 1963 in St. Helens, Merseyside, England. He is a director and producer, known for Harry Potter and the Deathly Hallows: Part 2 (2011), Harry Potter and the Order of the Phoenix (2007) and The Legend of Tarzan (2016).',
			Birth: '1963',
			Death: '',
		},

		ImagePath:
			'https://m.media-amazon.com/images/M/MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX667_CR0,0,667,999_AL_.jpg',
		Featured: true,
	},
	{
		id: 5,
		Title: 'Tenet',
		Description:
			'Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.',
		Genre: {
			Name: 'Action',
			Description:
				'Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, rescues and frantic chases.',
		},
		Director: {
			Name: 'Christopher Nolan',
			Bio:
				'Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.',
			Birth: '1970',
			Death: '',
		},

		ImagePath:
			'https://m.media-amazon.com/images/M/MV5BYzg0NGM2NjAtNmIxOC00MDJmLTg5ZmYtYzM0MTE4NWE2NzlhXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_UX182_CR0,0,182,268_AL_.jpg',
		Featured: true,
	},
	{
		id: 6,
		Title: 'Dunkirk',
		Description:
			'Allied soldiers from Belgium, the British Empire, and France are surrounded by the German Army and evacuated during a fierce battle in World War II.',
		Genre: {
			Name: 'Action',
			Description:
				'Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, rescues and frantic chases.',
		},
		Director: {
			Name: 'Christopher Nolan',
			Bio:
				'Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.',
			Birth: '1970',
			Death: '',
		},

		ImagePath:
			'https://m.media-amazon.com/images/M/MV5BN2YyZjQ0NTEtNzU5MS00NGZkLTg0MTEtYzJmMWY3MWRhZjM2XkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_UX182_CR0,0,182,268_AL_.jpg',
		Featured: true,
	},
	{
		id: 7,
		Title: 'Interstellar',
		Description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
		Genre: {
			Name: 'Adventure',
			Description:
				'Adventure film is a genre that revolves around the conquests and explorations of a protagonist. The purpose of the conquest can be to retrieve a person or treasure, but often the main focus is simply the pursuit of the unknown. These films generally take place in exotic locations and play on historical myths.',
		},
		Director: {
			Name: 'Christopher Nolan',
			Bio:
				'Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.',
			Birth: '1970',
			Death: '',
		},

		ImagePath:
			'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg',
		Featured: true,
	},
	{
		id: 8,
		Title: 'Fight Club',
		Description:
			'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
		Genre: {
			Name: 'Drama',
			Description:
				'In film and television, drama is a genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. ... These terms tend to indicate a particular setting or subject-matter, or else they qualify the otherwise serious tone of a drama with elements that encourage a broader range of moods.',
		},
		Director: {
			Name: 'David Fincher',
			Bio:
				'David Fincher was born in 1962 in Denver, Colorado, and was raised in Marin County, California. When he was 18 years old he went to work for John Korty at Korty Films in Mill Valley. He subsequently worked at ILM (Industrial Light and Magic) from 1981-1983.',
			Birth: '1962',
			Death: '',
		},

		ImagePath:
			'https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg',
		Featured: true,
	},
	{
		id: 9,
		Title: 'The Godfather',
		Description:
			'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
		Genre: {
			Name: 'Drama',
			Description:
				'In film and television, drama is a genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. ... These terms tend to indicate a particular setting or subject-matter, or else they qualify the otherwise serious tone of a drama with elements that encourage a broader range of moods.',
		},
		Director: {
			Name: 'Francis Ford Coppola',
			Bio:
				'Francis Ford Coppola was born in 1939 in Detroit, Michigan, but grew up in a New York suburb in a creative, supportive Italian-American family. His father, Carmine Coppola, was a composer and musician. His mother, Italia Coppola (née Pennino), had been an actress. Francis Ford Coppola graduated with a degree in drama from Hofstra University, and did graduate work at UCLA in filmmaking.',
			Birth: '1939',
			Death: '',
		},

		ImagePath:
			'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR3,0,182,268_AL_.jpg',
		Featured: true,
	},
	{
		id: 10,
		Title: 'Pulp Fiction',
		Description:
			'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
		Genre: {
			Name: 'Drama',
			Description:
				'In film and television, drama is a genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. ... These terms tend to indicate a particular setting or subject-matter, or else they qualify the otherwise serious tone of a drama with elements that encourage a broader range of moods.',
		},
		Director: {
			Name: 'Quentin Tarantino',
			Bio:
				"Quentin Jerome Tarantino was born in Knoxville, Tennessee. In January of 1992, first-time writer-director Tarantino's Reservoir Dogs (1992) appeared at the Sundance Film Festival. The film garnered critical acclaim and the director became a legend immediately. Two years later, he followed up Dogs success with Pulp Fiction (1994) which premiered at the Cannes film festival, winning the coveted Palme D'Or Award.",
			Birth: '1963',
			Death: '',
		},

		ImagePath:
			'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY132_CR1,0,89,132_AL_.jpg',
		Featured: true,
	},
];
// Morgan is a package for keeping logs
app.use(morgan('common'));
// Express.static returns all the static files located within the folder name provided as an argument
app.use(express.static('public'));

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
app.get('/users', function (req, res) {
	res.json(users);
});

// Get user by username
app.get('/users/:Username', (req, res) => {
	res.json(
		users.find((user) => {
			return user.Username === req.params.Username;
		})
	);
});
// Add user data
app.post('/users', (req, res) => {
	res.status(201).send('User added!');
});
// Update user data
app.put('/users/:Username', (req, res) => {
	res.json(
		users.find((user) => {
			return user.Username === req.params.Username;
		})
	);
});

//add movie to favorites
app.post('/users/:Username/favorites/:Title', (req, res) => {
	res.status(201).send('Succesfully added movie to favorites!');
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
