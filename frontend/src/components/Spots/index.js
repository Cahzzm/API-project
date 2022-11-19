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
                            <div className="image-container">
                                <img id="spot-image" key={spot.id} alt="" src={spot.previewImage}></img>
                            </div>

                            <div className="spot-info">
                                <div className="title-container">
                                <Link to={`/spots/${spot.id}`}>
                                    <span id="all-spots-name" key={spot.id}>{spot.name}</span>
                                </Link>
                                <span id="spot-rating" key={spot.id}><i class="fas fa-star">{spot.avgRating}</i></span>
                                </div>
                                <p key={spot.id}>{spot.city}, {spot.state}</p>
                                <p key={spot.id}>${spot.price} night</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default Spots
