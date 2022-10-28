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

// edit a booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params
    const { startDate, endDate } = req.body
    const booking = await Booking.findByPk(bookingId)

    if(!booking) {
        res.status(404)
        res.json({
            message: "Booking couldn't be found",
            statusCode: 403
        })
    }

    if(startDate > endDate) {
        res.status(400)
        res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                endDate: "endDate cannot come before startDate"
            }
        })
    }

    if(new Date() > endDate) {
        res.status(403)
        res.json({
            message: "Past bookings can't be modified",
            statusCode: 403
        })
    }

    if((startDate >= booking.startDate && startDate <= booking.endDate) ||
        (endDate >= booking.startDate && endDate <= booking.endDate)) {
            res.status(403)
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }

        booking.set({
        startDate,
        endDate
    })

    await booking.save()

    res.json(booking)
})

module.exports = router
