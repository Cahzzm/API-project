import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getSpotsThunk } from "../../store/spot"
import "./spots.css"

const Spots = () => {
    const dispatch = useDispatch()
    const allSpots = useSelector(state => state.spots.list)

    useEffect(() => {
        dispatch(getSpotsThunk())
    }, [dispatch])

    return (
        <div className="main-container">
            <div className="map">
                <img id="map-image" src="https://loveincorporated.blob.core.windows.net/contentimages/gallery/9f3fe8a1-7dd2-437f-a438-9471414452ea-worlds-most-incredible-homes-wave-house.jpg" alt="" />
            </div>
            <div className="content-container">
                {allSpots.map(spot => (
                    <div className="spots-container">
                        <div className="image-container">
                            <img id="spot-image" key={spot?.id} alt="" src={spot?.previewImage}></img>
                        </div>
                        <div className="info">
                            <div className="left-info-all">
                                <Link to={`/spot/${spot?.id}`}>
                                    <h2 id="all-spots-title" key={spot?.id}>{spot?.name}</h2>
                                </Link>
                                <div className="line-div"></div>
                                <div className="guest-bed-bath-container">
                                    <div className="style-b-b-g">
                                        <p key={spot?.id}>{spot.city}, {spot?.state}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="right-info-all">
                                <div className="outer-div-csp-all-spots">
                                    <div className="cost-per-night-all-spots">
                                        <h3 key={spot?.id}>${spot?.price} night</h3>
                                    </div>
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
