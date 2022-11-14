'use strict';
const bcrypt = require("bcryptjs");
const spot = require("../models/spot");
const spotOneImage = require("../images/spot1.jpg")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'demo',
        lastName: 'user'
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'demo',
        lastName: 'user'
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'demo',
        lastName: 'user'
      },

      {
        email: 'user3@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password4'),
        firstName: 'demo',
        lastName: 'user'
      }
    ], {});

    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123
      },

      {
        ownerId: 2,
        address: "456 Nickelodean Drive",
        city: "Orlando",
        state: "Florida",
        country: "United States of America",
        lat: 47.7645358,
        lng: -123.4730327,
        name: "Bapp Academy",
        description: "Place where web developers have fun",
        price: 124
      },

      {
        ownerId: 3,
        address: "789 Couch Lane",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 38.7645358,
        lng: -132.4730327,
        name: "Rapp Academy",
        description: "Place where web developers throw sick bars",
        price: 125
      },

      {
        ownerId: 4,
        address: "159 Kidney Lane",
        city: "Pasadina",
        state: "California",
        country: "United States of America",
        lat: 57.7645358,
        lng: -152.4730327,
        name: "Cap Academy",
        description: "Place where web developers are sarcastic",
        price: 126
      }
    ])

    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: '2022-10-25',
        endDate: '2022-10-29'
      },

      {
        spotId: 2,
        userId: 2,
        startDate: '2022-10-25',
        endDate: '2022-10-29'
      },

      {
        spotId: 3,
        userId: 3,
        startDate: '2022-10-25',
        endDate: '2022-10-29'
      },

      {
        spotId: 4,
        userId: 4,
        startDate: '2022-10-25',
        endDate: '2022-10-29'
      }
    ])

    await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 1,
        review: "this is a great spot",
        stars: 4
      },

      {
        spotId: 2,
        userId: 2,
        review: "this is a greater spot",
        stars: 5
      },

      {
        spotId: 3,
        userId: 3,
        review: "this is a terrible spot",
        stars: 1
      },

      {
        spotId: 4,
        userId: 4,
        review: "this is an okay spot",
        stars: 3
      }
    ])

    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/brewster-mcleod-architects-1486154143.jpg?crop=1.00xw:1.00xh;0,0&resize=768:*",
        preview: true
      },

      {
        spotId: 2,
        url: "img.com",
        preview: true
      },

      {
        spotId: 3,
        url: 'imagery.com',
        preview: true
      },

      {
        spotId: 4,
        url: 'imagination.com',
        preview: true
      }
    ])

    await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: 'image.com',
      },

      {
        reviewId: 2,
        url: 'images.com',
      },

      {
        reviewId: 3,
        url: 'imagery.com',
      },

      {
        reviewId: 4,
        url: 'imagination.com',
      }
    ])

  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete('ReviewImages')

    await queryInterface.bulkDelete('SpotImages')

    await queryInterface.bulkDelete('Reviews')

    await queryInterface.bulkDelete('Bookings')

    await queryInterface.bulkDelete('Spots')

    await queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
