const express = require('express')
const router = express.Router()


const { Spot, Review, SpotImage, Sequelize, ReviewImage, Booking, User, sequelize } = require('../../db/models')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// get booking for current user
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id
    const bookings = await Booking.findAll({
        where: {
            userId
        }
    })

    let bookingInfo = []

    for(let booking of bookings) {
        booking = booking.toJSON()
        const spot = await Spot.findByPk(booking.spotId, {
            include: [
                {
                    model: SpotImage,
                    where: {
                        preview: true
                    },
                    required: false,
                    attributes: []
                }
            ],
            attributes: {
                include: [
                    [
                        Sequelize.col('SpotImages.url'),
                        'previewImage'
                    ]
                ],
                exclude: [
                    'updatedAt', 'createdAt'
                ]
            },
            group: [ 'Spot.id', 'SpotImages.url' ]
        })

        booking.Spot = spot
        bookingInfo.push(booking)
    }

    res.json({Bookings: bookingInfo})
})

module.exports = router
