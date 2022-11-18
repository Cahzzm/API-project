import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getSpotsThunk } from "../../store/spot"
import "./spots.css"

const Spots = () => {
    const dispatch = useDispatch()
    const allSpots = useSelector(state => state?.spots?.list)

    useEffect(() => {
        dispatch(getSpotsThunk())
    }, [dispatch])

    if(!allSpots) return null

    return (
        <div className="main-container">
            <div className="content-container">
                {allSpots.map(spot => (
                    <div className="spots-container-main">
                        <div className="spots-container">
                            <div className="image-container">
                                <img id="spot-image" key={spot?.id} alt="" src={spot?.previewImage}></img>
                            </div>
                        </div>
                                <div className="">
                                    <Link to={`/spots/${spot?.id}`}>
                                        <h2 id="all-spots-name" key={spot?.id}>{spot?.name}</h2>
                                    </Link>
                                    <div className="line-div"></div>
                                    <div className="">
                                        <div className="">
                                            <p key={spot?.id}>{spot?.city}, {spot?.state}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom-info-all">
                                    <div className="outer-div-csp-all-spots">
                                        <div className="cost-per-night-all-spots">
                                            <h3 key={spot?.id}>${spot?.price} night</h3>
                                        </div>
                                        <br />
                                        <div>
                                            <h3 key={spot?.id}><i class="fas fa-star">{spot?.avgRating} stars</i></h3>
                                        </div>
                                    </div>
                                </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Spots
