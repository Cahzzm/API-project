const express = require('express')
const router = express.Router()


const { Spot, Review, SpotImage, Sequelize, ReviewImage, Booking, User, sequelize } = require('../../db/models')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// create an image for a review by it's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { reviewId } = req.params
    const { url } = req.body
    const review = await Review.findByPk(+reviewId)

    if(!review) {
        res.status(404)
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    let reviewImage = await ReviewImage.create({
        url,
        reviewId: review.id
    })

    let reviewImageCount = await ReviewImage.findOne({
        where: {
            reviewId
        },

        attributes: [
            [
                Sequelize.fn("COUNT", Sequelize.col('ReviewImage.url')),
                "imageCount"
            ]
        ]
    })

    reviewImageCount = reviewImageCount.toJSON()

    if(reviewImageCount.imageCount > 10) {
        res.status(403)
        res.json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403
        })
    }

    reviewImage = reviewImage.toJSON()
    delete reviewImage.createdAt
    delete reviewImage.updatedAt
    delete reviewImage.reviewId

    res.json(reviewImage)
})

// get reviews of current user
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id
    const reviews = await Review.findAll({
        // raw: true,
        where: {
            userId
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
        ],
    })

    let reviewInfo = []

    for(let review of reviews) {
        review = review.toJSON()
        let spot = await Spot.findByPk(review.spotId, {
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

        review.Spot = spot
        reviewInfo.push(review)
    }

    res.json({Reviews: reviewInfo})
})

// edit a review
router.put('/:reviewId', requireAuth, async (req, res) => {
    const { reviewId } = req.params
    const { review, stars } = req.body
    const newReview = await Review.findByPk(reviewId)

    if(!newReview) {
        res.status(404)
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    if((review === undefined) || (stars > 5 || stars < 1)) {
        res.status(400)
        res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
              review: "Review text is required",
              stars: "Stars must be an integer from 1 to 5"
            }
        })
    }

    if(review !== undefined) newReview.review = review
    if(stars <= 5 && stars >= 1) newReview.stars = stars

    await newReview.save()
    
    res.json(newReview)
})

module.exports = router
