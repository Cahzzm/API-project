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
        dispatch(getOneSpotThunk(spotId))
    }, [spotId, dispatch])

    return (
        <div className="spot-detail">
            <div className="one-spot-title">
                <h1 id="title-one-spot">{spot.name}</h1>
            </div>
            <div className="address-div-one-spot">
                <p id="city-one-spot">{`${spot?.city}`}</p>
                <p id="state-one-spot">{`${spot?.state}`}</p>
                <p id="country-one-spot">{`${spot?.country}`}</p>
            </div>
        </div>
    )
}


export default OneSpot
