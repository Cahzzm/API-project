import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addReviewThunk, deleteReviewThunk, getAllReviewsThunk } from "../../store/review"
import { getOneSpotThunk } from "../../store/spot"
import './review.css'

const Reviews = ({spotId, sessionUser}) => {
    const reviews = useSelector(state => state.reviews)
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spots.singleSpot)
    const [body, setBody] = useState("")
    const [rating, setRating] = useState(1)
    const [errorValidations, setErrorValidations] = useState([])

    useEffect(() => {
        dispatch(getAllReviewsThunk(spotId))
        dispatch(getOneSpotThunk(spotId))
    }, [spotId,spot.numReviews, dispatch])


    useEffect(() => {
        const errors = []

        if(rating > 5 || rating < 1) errors.push("Star rating must be between 1 and 5")
        if(body.length === 0) errors.push("Please share your thoughts to leave a review")

        setErrorValidations(errors)
    }, [body, rating])


    const handleSubmit = async e => {
        e.preventDefault()

        const payload = {
            userId: sessionUser.id,
            spotId: +spotId,
            review: body,
            stars: rating
        }

        const newReview = await dispatch(addReviewThunk(payload, spot.id))


        if(newReview) {
            dispatch(getAllReviewsThunk(spotId))
            dispatch(getOneSpotThunk(spotId))
            setBody('')
            setRating(1)
        }
    }


    return (
        <>
            <div className="review-main-container">
                <div className="actual-reviews">
                    {Object.values(reviews).map(review => (
                        <div className="each-review-user-container">
                            <div className="each-review-user">
                                <p id="review-user-name">{review.User.firstName} {review.User.lastName}</p>
                                <p>{review.review}</p>
                                {sessionUser?.id === review.userId &&
                                    <>
                                        <button key={review.id} id="post-modal-del" onClick={() =>{
                                            dispatch(deleteReviewThunk(review.id))
                                            dispatch(getOneSpotThunk(spotId))
                                            }}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {sessionUser &&
                <div className="reviews-input-ss">
                    {spot?.ownerId !== sessionUser?.id &&
                        <>
                            <h3>Leave a Review</h3>
                            <ul>
                                {errorValidations.map(error => <li key={spot.id}>{error}</li>)}
                            </ul>
                            <div className="star-rating">
                                <input
                                id="input-for-rating"
                                type="number"
                                min={1}
                                max={5}
                                value={rating}
                                onChange={e => setRating(e.target.value)}
                                >

                                </input>
                            </div>
                            <div className="review-body">
                                <input
                                    id="input-for-review"
                                    type="text"
                                    placeholder="Leave a review"
                                    value={body}
                                    onChange={e => setBody(e.target.value)}
                                    minLength="1"
                                    maxLength="100"
                                    required
                                />
                                <button id="post-modal-dele" disabled={errorValidations.length > 0} onClick={handleSubmit}>Submit</button>
                            </div>
                        </>
                    }
                </div>
            }
        </>
    )

}


export default Reviews
