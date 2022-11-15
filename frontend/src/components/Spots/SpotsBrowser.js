import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSpotsThunk } from "../../store/spot"


const SpotsBrowser = () => {
    const dispatch = useDispatch()
    const spots = useSelector(state => state.spots.list)

    useEffect(() => {
        dispatch(getSpotsThunk())
    }, [dispatch])

    return (
        <div className="main-container">
            <div className="content-container"></div>
        </div>
    )
}


export default SpotsBrowser
