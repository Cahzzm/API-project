import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSpots } from "../../store/spot"

const SpotsBrowser = () => {
    // const dispatch = useDispatch()

    const spots = useSelector(getSpots)

    // useEffect(() => {
    //     dispatch(getSpots())
    // }, [dispatch])

    return (
        <main>
            <div>
                {/* <ul>
                    {spots.map(spot => {
                        <li>{spot}</li>
                    })}
                </ul> */}
            </div>
        </main>

    )
}


export default SpotsBrowser
