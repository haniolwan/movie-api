'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DownloadLinks', { // Table name should be plural by convention
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      urls: {
        allowNull: false,
        type: Sequelize.JSON, // Using JSON to store quality-to-link mappings
      },
      platform: {
        type: Sequelize.STRING, // Optional: To indicate where the link comes from (e.g., Netflix, YouTube, etc.)
        allowNull: true,
      },
      movieId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'movies', // Referencing the 'movies' table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // If a movie is deleted, also delete associated streaming links
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DownloadLinks');
  }
}