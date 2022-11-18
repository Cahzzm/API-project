import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addReviewThunk, deleteReviewThunk, getAllReviewsThunk } from "../../store/review"
import { getOneSpotThunk } from "../../store/spot"
import { Rating } from 'react-simple-star-rating'
import './review.css'

const Reviews = ({spotId, sessionUser}) => {
    const reviews = useSelector(state => state?.reviews?.list?.Reviews)
    const dispatch = useDispatch()
    const spot = useSelector(state => state?.spots[spotId])
    const [body, setBody] = useState("")
    const [rating, setRating] = useState(1)

    useEffect(() => {
        dispatch(getAllReviewsThunk(spotId))
        dispatch(getOneSpotThunk(spotId))
    }, [spotId, dispatch])

    const handleSubmit = async e => {
        e.preventDefault()

        const payload = {
            userId: sessionUser?.id,
            spotId: +spotId,
            review: body,
            rating: rating
        }

        const newReview = await dispatch(addReviewThunk(payload, spot?.id))

        if(newReview) {
            dispatch(getAllReviewsThunk(spotId))
            setBody('')
            setRating(1)
        }
    }

    const handleRating = e => {
        setRating(e)
    }

    return (
        <>
            <div className="review-main-container">
                <div className="actual-reviews">
                    {reviews && reviews?.map(review => (
                        <div className="each-review-user-container">
                            <div className="each-review-user">
                                <p>{review?.User?.firstName} {review?.User?.lastName}</p>
                                <Rating fillColor={'#bbaadd'} readonly='true' ratingValue={review?.rating}/>
                                <p>{review?.review}</p>
                                {sessionUser?.id === review?.userId &&
                                    <>
                                        <button key={review.id} id="post-modal-del" onClick={() => dispatch(deleteReviewThunk(review.id))}><i className="fa fa-trash"></i></button>
                                    </>
                                }
                                <div className="line-one-spot"></div>
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
                            <div className="App">
                                <Rating onClick={handleRating} fillColor={"#fffff"} ratingValue={rating} />
                            </div>
                            <div>
                                <input
                                    id="input-for-review"
                                    type="text"
                                    value={body}
                                    onChange={e => setBody(e.target.value)}
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
