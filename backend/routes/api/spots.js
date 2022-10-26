const express = require('express')
const router = express.Router()


const { Spot, Review, SpotImage, Sequelize, ReviewImage, Booking, User } = require('../../db/models')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// get all spots
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
                    Sequelize.fn('AVG', Sequelize.col('Reviews.stars')),
                    'avgRating'
                ],
                [
                    Sequelize.col('SpotImages.url'),
                    'previewImage'
                ]
            ]
        },
        group: ['Spot.id', 'SpotImages.url']
    })
    res.json(spots)
})

// create a spot
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

    res.status(201)
    res.json(spot)
})

// create an image for a spot
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const { spotId } = req.params
    const spot = await Spot.findByPk(+spotId)
    const { url, preview } = req.body

    if(!spot) {
        res.status(404)
        res.json({
            message: 'Spot couldn"t be found',
            statusCode: 404
        })
    }

    if(spot.ownerId !== req.user.id) {
        res.status(403)
        res.json({
            message: 'Forbidden',
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

// get spots of a current user
router.get('/current', requireAuth, async (req, res) => {
    const ownerId = req.user.id
    const spots = await Spot.findAll({
        where: {
            ownerId
        },
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage,
                attributes: [],
                where: {
                    preview: true
                },
                required: false
            }
        ],
        attributes: {
            include: [
                [
                    Sequelize.fn('AVG', Sequelize.col('Reviews.stars')),
                    'avgRating'
                ],
                [
                    Sequelize.col('SpotImages.url'),
                    'previewImage'
                ]
            ]
        },
        group: ['Spot.ownerId', 'Spot.id', 'SpotImages.url']
    })
    res.json({
        Spots: spots
    })
})

// get details of a spot by the spot's id
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId, {
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage,
                attributes: [ 'id', 'url', 'preview' ]
            },
            {
                model: User,
                as: 'Owner',
                where: {
                    id: spotId
                },
                attributes: [ 'id', 'firstName', 'lastName' ]
            }
        ],
        attributes: {
            include: [
                [
                    Sequelize.fn('COUNT', Sequelize.col('Reviews.review')),
                    'numReviews'
                ],
                [
                    Sequelize.fn('AVG', Sequelize.col('Reviews.stars')),
                    'avgRating'
                ]
            ]
        },
        group: ['Spot.id', 'SpotImages.id', 'Owner.id']
    })

    if(!spot) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    res.json(spot)
})

module.exports = router
