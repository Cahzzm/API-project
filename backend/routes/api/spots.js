const express = require('express')
const router = express.Router()


const { Spot, Review, SpotImage, Sequelize, ReviewImage, Booking, User } = require('../../db/models')
const { requireAuth } = require('../../utils/auth');
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

// edit a spot
router.put('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    if(!spot) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    if(
        address === undefined || city === undefined || state === undefined ||
        country === undefined || lat === undefined || lng === undefined ||
        name === undefined || description === undefined || price === undefined
        ) {
        res.status(400)
        res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                address: "Street address is required",
                city: "City is required",
                state: "State is required",
                country: "Country is required",
                lat: "Latitude is not valid",
                lng: "Longitude is not valid",
                name: "Name must be less than 50 characters",
                description: "Description is required",
                price: "Price per day is required"
            }
        })
    }

    if(address !== undefined) spot.address = address
    if(city !== undefined) spot.city = city
    if(state !== undefined) spot.state = state
    if(country !== undefined) spot.country = country
    if(lat !== undefined) spot.lat = lat
    if(lng !== undefined) spot.lng = lng
    if(name !== undefined) spot.name = name
    if(description !== undefined) spot.description = description
    if(price !== undefined) spot.price = price

    await spot.save()
    res.json(spot)
})

// create a review for a spot
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const { spotId } = req.params
    const { review, stars } = req.body
    const userId = req.user.id
    const spot = await Spot.findByPk(+spotId, {
        include: {
            model: Review
        }
    })

    if(!spot) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    if(review === undefined || stars < 1) {
        res.status(400)
        res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                review: "Review text is required",
                stars: "Stars must be an integer from 1 to 5",
            }
        })
    }

    for (let userReview of spot.dataValues.Reviews) {
        if(userReview.userId === userId) {
            res.status(403)
            res.json({
                message: "User already has a review for this spot",
                statusCode: 403
            })
        }
    }

    let spotReview = await Review.create({
        userId,
        spotId: +spotId,
        review,
        stars
    })

    spotReview = spotReview.toJSON()

    res.json(spotReview)
})

// get reviews by spot id
router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)
    const reviews = await Review.findAll({
        where: {
            spotId
        },
        include: [
            {
                model: User,
                attributes: [ 'id', 'firstName', 'lastName' ]
            },
            {
                model: ReviewImage,
                attributes: [ 'id', 'url' ]
            }
        ]
    })

    if(!spot) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }


    res.json({Reviews: reviews})
})

// create a booking base on a spots Id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { spotId } = req.params
    const { startDate, endDate } = req.body
    const spot = await Spot.findByPk(spotId)

    if(!spot) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
})

module.exports = router
