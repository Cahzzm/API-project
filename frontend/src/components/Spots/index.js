import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getSpotsThunk } from "../../store/spot"
import "./spots.css"

const Spots = () => {
    const dispatch = useDispatch()
    const spots = useSelector(state => state.spots.allSpots)
    const allSpots = Object.values(spots)

    useEffect(() => {
        dispatch(getSpotsThunk())
    }, [dispatch])

    if(!allSpots.length) return null

    return (
        <div className="main-container">
            <div className="content-container">
                <div className="spots-container">
                    {allSpots.map(spot => (
                        <div className="spot">
                            <Link to={`/spots/${spot.id}`}>
                            <div className="image-container">
                                <img id="spot-image" key={spot.id} alt="" src={spot.previewImage}></img>
                            </div>

                            <div className="spot-info">
                                <div className="title-container">

                                    <span id="all-spots-name" key={spot.id}>{spot.name}</span>
                                <span id="spot-rating" key={spot.id}><i class="fas fa-star">{spot.avgRating}</i></span>
                                </div>
                                <p id="address-for-spot" key={spot.id}>{spot.city.length + spot.state.length > 50 ? spot.state : `${spot.city}, ${spot.state}`}</p>
                                <p id="price-per-night"key={spot.id}>${spot.price} night</p>
                            </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default Spots
