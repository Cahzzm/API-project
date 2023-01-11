'use strict';
const bcrypt = require("bcryptjs");
const spot = require("../models/spot");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users'
    await queryInterface.bulkInsert(options, [
      {
        email: 'demo@email.io',
        username: 'DemoUserrrrrr',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Tyler',
        lastName: 'user'
      },
      {
        email: 'user1@email.io',
        username: 'FakeUsers',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Aaron',
        lastName: 'user'
      },
      {
        email: 'user2@email.io',
        username: 'FakeUserss',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Nathan',
        lastName: 'user'
      },

      {
        email: 'user3@email.io',
        username: 'FakeUsersss',
        hashedPassword: bcrypt.hashSync('password4'),
        firstName: 'Sara',
        lastName: 'user'
      },

      {
        email: 'user4@email.io',
        username: 'FakeUserssss',
        hashedPassword: bcrypt.hashSync('password5'),
        firstName: 'Michelle',
        lastName: 'user'
      },

      {
        email: 'user5@email.io',
        username: 'FakeUsersssss',
        hashedPassword: bcrypt.hashSync('password6'),
        firstName: 'Lane',
        lastName: 'user'
      }
    ], {});

    options.tableName = 'Spots'
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "I Want The Hoodie Academy",
        description: "Relax with the whole... group of people you're with, or by yourslef if that's your thing",
        price: 31000
      },

      {
        ownerId: 2,
        address: "456 Nickelodean Drive",
        city: "Orlando",
        state: "Florida",
        country: "United States of America",
        lat: 47.7645358,
        lng: -123.4730327,
        name: "Is This React?",
        description: "Relax with the whole... group of people you're with, or by yourslef if that's your thing",
        price: 136
      },

      {
        ownerId: 3,
        address: "789 Couch Lane",
        city: "Dallas",
        state: "Texas",
        country: "United States of America",
        lat: 38.7645358,
        lng: -132.4730327,
        name: "Flex >",
        description: "Relax with the whole... group of people you're with, or by yourslef if that's your thing",
        price: 125
      },

      {
        ownerId: 4,
        address: "756 Address Dr",
        city: "Boston",
        state: "Massachussets",
        country: "United States of America",
        lat: 57.7645358,
        lng: -152.4730327,
        name: "Your Next Mistake",
        description: "Relax with the whole... group of people you're with, or by yourslef if that's your thing",
        price: 246
      },

      {
        ownerId: 5,
        address: "654 Hockey Blvd",
        city: "Lafayette",
        state: "Indiana",
        country: "United States of America",
        lat: 57.7645358,
        lng: -152.4730327,
        name: "Inner Sanctum",
        description: "Relax with the whole... group of people you're with, or by yourslef if that's your thing",
        price: 157
      },

      {
        ownerId: 2,
        address: "159 Kidney Lane",
        city: "Hochatown",
        state: "Oklahoma",
        country: "United States of America",
        lat: 59.7645358,
        lng: -142.4730327,
        name: "Da Spot",
        description: "Relax with the whole... group of people you're with, or by yourslef if that's your thing",
        price: 192
      },

      {
        ownerId: 1,
        address: "456 Imagine Dr",
        city: "Tuscon",
        state: "Arizona",
        country: "United States of America",
        lat: 60.7645358,
        lng: -172.4730327,
        name: "Perma Stunned",
        description: "Relax with the whole... group of people you're with, or by yourslef if that's your thing",
        price: 185
      },

      {
        ownerId: 6,
        address: "658 Mid Lane",
        city: "Ouachita",
        state: "Oklahoma",
        country: "United States of America",
        lat: 58.7645358,
        lng: -149.4730327,
        name: "Hardstuck Bronze",
        description: "Relax with the whole... group of people you're with, or by yourslef if that's your thing",
        price: 187
      },

      {
        ownerId: 5,
        address: "963 Bot Lane",
        city: "Salt Lake City",
        state: "Utah",
        country: "United States of America",
        lat: 59.7645358,
        lng: -142.4730327,
        name: "Summoner's Rift",
        description: "Relax with the whole... group of people you're with, or by yourslef if that's your thing",
        price: 189
      },

      {
        ownerId: 3,
        address: "576 My House Here St",
        city: "Idabel",
        state: "Oklahoma",
        country: "United States of America",
        lat: 50.7645358,
        lng: -132.4730327,
        name: "Grandma's Cookies",
        description: "Relax with the whole... group of people you're with, or by yourslef if that's your thing",
        price: 175
      },

      {
        ownerId: 3,
        address: "587 Jokes Circle",
        city: "Nashville",
        state: "Tennessee",
        country: "United States of America",
        lat: 39.7645358,
        lng: -242.4730327,
        name: "Just Clownin Around",
        description: "Relax with the whole... group of people you're with, or by yourslef if that's your thing",
        price: 236
      },

      {
        ownerId: 3,
        address: "746 Hosting Here",
        city: "Rockville",
        state: "Oklahoma",
        country: "United States of America",
        lat: 59.7645358,
        lng: -142.4430327,
        name: "Hop On Iiiin",
        description: "Relax with the whole... group of people you're with, or by yourslef if that's your thing",
        price: 225
      },

      {
        ownerId: 6,
        address: "635 Fumbling Dr",
        city: "Philadelphia",
        state: "Pennsylvania",
        country: "United States of America",
        lat: 57.7645358,
        lng: -122.4730327,
        name: "Eagle Naysh",
        description: "Relax with the whole... group of people you're with, or by yourslef if that's your thing",
        price: 365
      }
    ])
    options.tableName = 'Bookings'
    await queryInterface.bulkInsert(options, [
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
    options.tableName = 'Reviews'
    await queryInterface.bulkInsert(options, [
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
      },

      {
        spotId: 4,
        userId: 4,
        review: "this is an okay spot",
        stars: 3
      },

      {
        spotId: 5,
        userId: 5,
        review: "this is an okay spot",
        stars: 4
      },

      {
        spotId: 6,
        userId: 6,
        review: "this is an okay spot",
        stars: 4
      },


      {
        spotId: 7,
        userId: 1,
        review: "this is an okay spot",
        stars: 2
      },

      {
        spotId: 8,
        userId: 4,
        review: "this is a great spot",
        stars: 5
      },

      {
        spotId: 9,
        userId: 1,
        review: "this is an okay spot",
        stars: 3
      },
    ])
    options.tableName = 'SpotImages'
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/brewster-mcleod-architects-1486154143.jpg?crop=1.00xw:1.00xh;0,0&resize=768:*",
        preview: true
      },

      {
        spotId: 2,
        url: "https://housetipster.com/media/blog/HT456.jpg",
        preview: true
      },

      {
        spotId: 3,
        url: 'https://housetipster.com/media/blog/HT460.jpg',
        preview: true
      },

      {
        spotId: 4,
        url: 'https://cdn.homedit.com/wp-content/uploads/2016/07/Casa-china-blanca-luxury-villa.jpg',
        preview: true
      },

      {
        spotId: 5,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5wYUbLO04r5LHe718NGwur3J9KC-5nvb2Kg&usqp=CAU',
        preview: true
      },

      {
        spotId: 6,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuaPKd_RNaLzOBxnUbKDryg_txfUNzIVywtw&usqp=CAU',
        preview: true
      },

      {
        spotId: 7,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJBl0hQw3-C176TMUUw9DJM8zXwrpTLGd8qg&usqp=CAU',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8iRsyFX9_5hrvUc8Hl1kXSxwlu4Vy3Cv-CQ&usqp=CAU',
        preview: true
      },

      {
        spotId: 9,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTM9nxVTLk-h-fcjhQjcDQwJUuYG-uJ2H7Yg&usqp=CAU',
        preview: true
      },

      {
        spotId: 10,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFhLIDFPsJxuh22nba4PItRgv9NET3vtCRxQ&usqp=CAU',
        preview: true
      },

      {
        spotId: 11,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNjmUGSxNel4KS1Yn9Jiff-JYEwd6ip0sYtw&usqp=CAU',
        preview: true
      },

      {
        spotId: 12,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8zmLn4lAKrt5-slPjUhiBeCPbMDlzP62wPQ&usqp=CAU',
        preview: true
      },

      {
        spotId: 13,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4GVGy3CAik43d-m4fpEX_oXA5Tba1Tdq76A&usqp=CAU',
        preview: true
      }
    ])
    options.tableName = 'ReviewImages'
    await queryInterface.bulkInsert(options, [
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

    await queryInterface.bulkDelete(options)

    await queryInterface.bulkDelete(options)

    await queryInterface.bulkDelete(options)

    await queryInterface.bulkDelete(options)

    await queryInterface.bulkDelete(options)

    await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
