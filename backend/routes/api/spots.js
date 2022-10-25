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


module.exports = router
