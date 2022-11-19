import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory, useParams } from "react-router-dom"
import { getOneSpotThunk } from "../../store/spot"
import SpotMap from "../SpotMap"
import { deleteSpotThunk } from "../../store/spot"
import './onespot.css'
import Reviews from "../Reviews"
import { getAllReviewsThunk } from "../../store/review"

const OneSpot = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const reviewsObject = useSelector(state => state.reviews)
    const reviews = Object.values(reviewsObject)
    const sessionUser = useSelector(state => state?.session?.user)
    const spot = useSelector(state => state.spots.singleSpot)
    const history = useHistory()

    useEffect(() => {
        dispatch(getOneSpotThunk(spotId))
        dispatch(getAllReviewsThunk(spotId))
    }, [spotId,reviews.length, dispatch])

    const deleteBtn = async (e) => {
        e.preventDefault()

        await dispatch(deleteSpotThunk(spotId))

        history.push("/")
    }

    // function avgStars(){
    //     let sum = 0
    //     for(let i = 0; i < reviews?.length; i++){
    //         let num = reviews[i]?.rating
    //         sum += num;
    //     }
    //     return `${Number.parseFloat(sum / reviews?.length).toFixed(1)}`
    // }

    if(!spot.id) return null

    return (
        <div className="spot-detail">
            <div className="one-spot-info">
                <h1 id="title-one-spot">{spot.name}</h1>
            </div>
            <div className="address-div-one-spot">
                <span id="rating-above-picture"><i class="fas fa-star"></i> {spot.avgRating} · {reviews.length} reviews</span>
                <span id="address-one-spot">
                    {` ${spot.address} `}
                    {` ${spot.city}, ${spot.state}, `}
                    {` ${spot.country}`}
                </span>
            </div>
            <div className="image-div-one-spot">
                <img className="spot-image" src={spot.SpotImages[0].url} alt="" />
                <br />
            </div>
            <div className="edit-delete-div-one">
                {sessionUser?.id === spot.ownerId &&
                <>
                    <Link to={`/spots/${spotId}/host`}>Edit Spot</Link>
                    <button id='delete-one-spot' onClick={deleteBtn}>Delete</button>
                </>
                }
            </div>
            <div className="host-one-spot">
                <h2 className="h2-host-name">Hosted By: {spot.Owner.firstName} {spot.Owner.lastName}</h2>
            </div>
            <div className="line-one-spot"></div>
            <h3 id='entire-home'><i class="fas fa-home"></i> Entire Home</h3>
            <h4 id='home-yourself'>You'll have the house to yourself.</h4>
            <h3 id='self-check'><i class="fas fa-key"></i> Self check-in</h3>
            <h4 id='check-yourself'>Check yourself in with the keypad.</h4>
            <h3 id='great-location'><i class="fas fa-map-marker-alt"></i> Great location</h3>
            <h4 id='location-rating'>95% of recent guests gave the location a 5-star rating.</h4>

            <div className="line-one-spot"></div>
            <div className="description-one-spot">
                <p>{spot.description}</p>
            </div>
            <div className="line-one-spot"></div>
            <div className="heading-for-reviews-s">
                <h2><i class="fas fa-star"></i> {spot?.avgRating} stars · {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}</h2>
            </div>
                <Reviews spotId={spotId} sessionUser={sessionUser} />
            <div className="line-one-spot"></div>
            <div>
                <SpotMap spot={spot}/>
            </div>
        </div>
    )
}


export default OneSpot
