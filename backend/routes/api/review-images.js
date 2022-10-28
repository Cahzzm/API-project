const express = require('express')
const router = express.Router()


const { Spot, Review, SpotImage, Sequelize, ReviewImage, Booking, User, sequelize } = require('../../db/models')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')

// delete a review image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params
    const currentUser = req.user.id
    let reviewImage = await ReviewImage.findByPk(imageId)

    if(!reviewImage) {
        res.status(404)
        res.json({
            message: "Review Image couldn't be found",
            statusCode: 404
        })
    }

    const review = await Review.findByPk(reviewImage.reviewId)

    if(currentUser === review.userId) {
        await reviewImage.destroy()
        res.status(200)
        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    }
})

module.exports = router
