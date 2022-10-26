const express = require('express')
const router = express.Router()


const { Spot, Review, SpotImage, Sequelize, ReviewImage, Booking, User } = require('../../db/models')

router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage,
                where: {
                    preview:true
                },
                attributes: []
            }
        ],
        attributes: {
            include: [
                [
                    Sequelize.fn("AVG", Sequelize.col("Reviews.stars")),
                    "avgRating"
                ],
                [
                    Sequelize.col("SpotImages.url"),
                    "previewImage"
                ]
            ]
        },
        group: ["Spot.id", "SpotImages.url"]
    })
    res.json(spots)
})

router.post('/', async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const spot = await Spot.create({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    res.json(spot)
})


module.exports = router
