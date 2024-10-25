'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('movies', [{
      title: "Inception",
      description: "A skilled thief is given a chance at redemption if he can successfully perform inception.",
      releaseDate: new Date('2010-07-16'),
      genre: "Science Fiction",
      rating: 8.8,
      duration: 148,
      director: "Christopher Nolan",
      cast: JSON.stringify(["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"]),
      language: "English",
      posterUrl: "https://example.com/inception-poster.jpg",
      trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('movies', null, {});

  }
};
