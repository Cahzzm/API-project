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
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(getAllReviewsThunk(spotId))
        dispatch(getOneSpotThunk(spotId))
    }, [spotId,spot.numReviews, dispatch])

    const handleSubmit = async e => {
        e.preventDefault()
        setErrors([])

        const payload = {
            userId: sessionUser.id,
            spotId: +spotId,
            review: body,
            stars: rating
        }

        const newReview = await dispatch(addReviewThunk(payload, spot.id))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.meassage) setErrors(data.message);
          });

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
                                {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
                            </ul>
                            <div className="star-rating">
                                <input
                                id="input-for-rating"
                                type="number"
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
                                    required
                                />
                                <button id="post-modal-dele" onClick={handleSubmit}>Submit</button>
                            </div>
                        </>
                    }
                </div>
            }
        </>
    )

}


export default Reviews
