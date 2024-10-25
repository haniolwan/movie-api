const { Movie, StreamingLink, DownloadLink } = require('../models/movie');
const { success, error } = require('../helpers/apiResponse');
const { Op } = require('sequelize');


exports.findMovies = async (req, res) => {
    try {
        const { query: { q } } = req;
        const searchTerm = q;
        const movies = await Movie.findAll({
            where: {
                [Op.or]: [
                    {
                        title: {
                            [Op.like]: `%${searchTerm}%`
                        }
                    },
                    {
                        description: {
                            [Op.like]: `%${searchTerm}%`
                        }
                    }
                ]
            }
        });

        res.json(success('Searched movies', movies, 200));
    } catch ({ message }) {
        res.json(error(message, 500));
    }
}

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.json(success('fetch all movies', movies, 200));
    } catch ({ message }) {
        res.json(error(message, 500));
    }
}

exports.createMovie = async (req, res) => {
    const {
        title,
        description,
        releaseDate,
        genre,
        rating,
        duration,
        director,
        cast,
        language,
        posterUrl,
        trailerUrl,
        isAvailable,
    } = req.body;

    const existingMovie = await Movie.findOne({ where: { title, releaseDate } });

    if (existingMovie) {
        return res.json(error('Movie already exists', 400))
    }


    try {
        const newMovie = await Movie.create({
            title,
            description,
            releaseDate,
            genre,
            rating,
            duration,
            director,
            cast,
            language,
            posterUrl,
            trailerUrl,
            isAvailable,
        });
        res.json(success("Movie created", newMovie, 201));
    } catch ({ message }) {
        res.json(error(message, 500));
    }
};



exports.getMovie = async (req, res) => {
    try {
        const { params: { id } } = req;

        if (!id) {
            res.json(error('Movie id is required', 400))
        }

        const movie = await Movie.findByPk(id);

        res.json(success("Get movie", movie || {}, 200))
    } catch ({ message }) {
        res.json(error(message, 400))
    }
}

exports.deleteMovie = async (req, res) => {
    try {
        const { params: { id } } = req;

        if (!id) {
            res.json(error('Movie id is required', 400))
        }

        const deletedCount = await Movie.destroy({
            where: { id }
        });

        if (deletedCount === 0) {
            res.json(error('Movie not found', 404))
        }

        res.json(success("Movie deleted", [], 200))
    } catch ({ message }) {
        res.json(error(message, 400))
    }
}

exports.updateMovie = async (req, res) => {
    try {
        const { params: { id } } = req;
        const { title, description, genre, rating, duration, director, cast, language, posterUrl, trailerUrl, isAvailable } = req.body; // Assuming these fields are in the request body


        if (!id) {
            res.json(error('Movie id is required', 400))
        }

        const [updatedCount] = await Movie.update(
            {
                title,
                description,
                genre,
                rating,
                duration,
                director,
                cast,
                language,
                posterUrl,
                trailerUrl,
                isAvailable
            },
            {
                where: { id: id }
            }
        );
        if (updatedCount === 0) {
            res.json(error("Movie not found", [], 404))

        }

        res.json(success("Movie updated", await Movie.findByPk(id), 200))
    } catch ({ message }) {
        res.json(error(message, 400))
    }
}


