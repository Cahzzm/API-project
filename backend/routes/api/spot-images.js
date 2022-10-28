const express = require('express')
const router = express.Router()


const { Spot, Review, SpotImage, Sequelize, ReviewImage, Booking, User, sequelize } = require('../../db/models')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')

// delete a spot image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const currentUser = req.user.id
    const { imageId } = req.params
    let spotImage = await SpotImage.findByPk(imageId)

    if(!spotImage) {
        res.status(404)
        res.json({
            message: "Spot Image couldn't be found",
            statusCode: 404
        })
    }

    let spot = await Spot.findByPk(spotImage.spotId)

    if(currentUser == spot.ownerId) {
        await spotImage.destroy()
        res.status(200)
        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    }
})

module.exports = router
