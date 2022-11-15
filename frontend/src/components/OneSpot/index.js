import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getOneSpotThunk } from "../../store/spot"
import './onespot.css'

const OneSpot = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spots[spotId])

    useEffect(() => {
        console.log("this is the useEffect")
        dispatch(getOneSpotThunk(spotId))
    }, [spotId, dispatch])

    return (
        <div className="spot-detail">
            <div className="one-spot-title">
                <h1 id="title-one-spot">{spot.name}</h1>
            </div>
            <div className="address-div-one-spot">
                <p id="city-one-spot">{`${spot?.city}, `}</p>
                <p id="state-one-spot">{`${spot?.state}, `}</p>
                <p id="country-one-spot">{`${spot?.country}`}</p>
            </div>
            <div className="image-div-one-spot">
                <img className="spot-image" alt="" src={spot.SpotImage.url}></img>
                <br />
            </div>
            <div className="host-one-spot">
                <h2 className="h2-host-name">Hosted By: {spot.Owner.firstName} {spot.Owner.lastName}</h2>
            </div>
        </div>
    )
}


export default OneSpot
