const Sequelize = require('sequelize');
const db = require('../config/database');

const Movie = db.define('movie', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    releaseDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    genre: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    rating: {
        type: Sequelize.FLOAT, // for ratings like 7.5/10
        allowNull: true,
    },
    duration: {
        type: Sequelize.INTEGER, // duration in minutes
        allowNull: false,
    },
    director: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    cast: {
        type: Sequelize.JSON, // can store an array of actor names
        allowNull: true,
    },
    language: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    posterUrl: {
        type: Sequelize.STRING, // URL of the movie poster
        allowNull: true,
    },
    trailerUrl: {
        type: Sequelize.STRING, // URL of the movie trailer
        allowNull: true,
    },
    isAvailable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true, // To indicate if the movie is available for streaming
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
}, {
    tableName: "movies"
});



// StreamingLinks table
const StreamingLink = db.define('StreamingLinks', {
    url: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
    },
    platform: {
        type: Sequelize.STRING, // Optional: To indicate where the link comes from (e.g., Netflix, YouTube, etc.)
        allowNull: true,
    },
}, {
    tableName: 'StreamingLinks',
    timestamps: true,
});

// DownloadLinks table
const DownloadLink = db.define('DownloadLinks', {
    url: {
        type: Sequelize.JSON,
        allowNull: false,
    },
}, {
    tableName: 'DownloadLinks',
    timestamps: true,
});

// Relationships
Movie.hasMany(StreamingLink, { foreignKey: 'movieId', onDelete: 'CASCADE' });
StreamingLink.belongsTo(Movie, { foreignKey: 'movieId' });

Movie.hasMany(DownloadLink, { foreignKey: 'movieId', onDelete: 'CASCADE' });
DownloadLink.belongsTo(Movie, { foreignKey: 'movieId' });


module.exports = {
    Movie, StreamingLink, DownloadLink
};