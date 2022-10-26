const express = require('express')
const router = express.Router()


const { Spot, Review, SpotImage, Sequelize, ReviewImage, Booking, User } = require('../../db/models')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


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

router.post('/', requireAuth, async (req, res, next) => {
    const ownerId = req.user.id
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
        price,
        ownerId
    })

    res.json(spot)
})

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const { spotId } = req.params
    const spot = await Spot.findByPk(+spotId)
    const { url, preview } = req.body
    // const { user } = req

    if(!spot) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    if(spot.ownerId !== req.user.id) {
        res.status(403)
        res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }

    let spotImage = await SpotImage.create({
        url,
        preview,
        spotId: +spotId
    })

    spotImage = spotImage.toJSON()
    delete spotImage.createdAt
    delete spotImage.updatedAt
    delete spotImage.spotId

    res.json(spotImage)
})

router.get('/current', requireAuth, async (req, res) => {
    const ownerId = req.user.id
    const spots = await Spot.findAll({
        where: ownerId,
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

router.get('/:spotId', async (req, res) => {
    const spotId = req.params
    const spot = await Spot.findByPk(spotId)
})

module.exports = router
