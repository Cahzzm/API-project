import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { createSpot } from "../../store/spot"

const CreateSpotForm = () => {
    const spots  = useSelector(state => state.spots.Spots)
    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newSpot = {
            name,
            address,
            city,
            state,
            price,
            description
        }

        let createdSpot = await dispatch(createSpot(newSpot))

        if(createdSpot) {
            history.push(`/api/spots/${createdSpot.id}`)
        }
    }



    return (
        <div className="create-spot">
            <form className="create-spot-form" onSubmit={handleSubmit}>
                <input>Name</input>
            </form>
        </div>
    )
}


export default CreateSpotForm
