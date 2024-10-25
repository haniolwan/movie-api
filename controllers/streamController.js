exports.createStreams = async (req, res) => {
    const { query: { movie: id } } = req;

    const {
        url,
        platform,
    } = req.body;

    try {
        const newMovieStream = await StreamingLink.create({
            url,
            platform,
            movieId: id
        });
        const movies = await Movie.findAll({
            where: { id: id },
            include: StreamingLink
        });


        if (movies.length > 0) {
            const movieData = movies[0].dataValues; // Access the dataValues
            const response = {
                ...movieData,  // Spread the movie data
                streams: newMovieStream // Add your streams data
            };
            res.json(success("Streams created", response, 201));
        }
    } catch ({ message }) {
        res.json(error(message, 500));
    }
};

exports.createDownloads = async (req, res) => {
    const { query: { movie } } = req;

    const {
        urls,
        platform,
    } = req.body;

    try {
        const newMovieDownloads = await DownloadLink.create({
            urls,
            platform,
            movieId: movie
        });
        res.json(success("Downloads created", newMovieDownloads, 201));
    } catch ({ message }) {
        res.json(error(message, 500));
    }
};
