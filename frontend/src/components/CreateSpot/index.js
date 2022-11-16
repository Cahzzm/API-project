import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createSpotThunk } from "../../store/spot";
import { states } from "../utils"
import "./createspot.css"

const CreateSpot = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const session = useSelector(state => state.session)

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")

    const [errorValidations, setErrorValidations] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newSpot = {
            name,
            address,
            city,
            state,
            country,
            latitude,
            longitude,
            price,
            description,
            ownerId: session.user.id,
        }
        let createdSpot = await dispatch(createSpotThunk(newSpot))

        if(createdSpot) {
            history.push(`/spots/${createdSpot?.id}`)
        }

    }

    useEffect(() => {
        const errors = []
        if(name?.length === 0) errors.push("Please provide a name")
        if(address?.length === 0) errors.push("Please provide an address")
        if(city?.length === 0) errors.push("Please provide a city")
        if(state?.length === 0) errors.push("Please provide a state")
        if(country?.length === 0) errors.push("Please provide a country")
        if(!latitude || isNaN(latitude)) errors.push("Please provide a valid latitude")
        if(!longitude || isNaN(longitude)) errors.push("Please provide a valide longitude")
        if(price <= 0) errors.push("Please provid a price")
        if(description?.length === 0) errors.push("Please provide a description")

        setErrorValidations(errors)
    }, [name, address, city, state, country, latitude, longitude, price, description])

    return (
        <div id="form-container">
            <h1>Host Form</h1>
            <div id="host-forms">
                <ul>
                    {errorValidations.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
                <form onSubmit={handleSubmit}>
                    <label>Spot Name:
                        <input
                            type="text"
                            placeholder="Spot Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </label>
                    <label>Address:
                        <input
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </label>
                    <label>City:
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                    </label>
                    <label>State:
                        <select
                            type="text"
                            placeholder="State"
                            value={state}
                            onChange={e => setState(e.target.value)}
                        >
                            {states.map(state => (
                                <option key={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>Country:
                        <input
                            type="text"
                            placeholder="Country"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                        />
                    </label>
                    <label>Latitude:
                        <input
                            type="text"
                            placeholder="Latitude"
                            value={latitude}
                            onChange={e => setLatitude(e.target.value)}
                        />
                    </label>
                    <label>Longitude:
                        <input
                            type="text"
                            placeholder="Longitude"
                            value={longitude}
                            onChange={e => setLongitude(e.target.value)}
                        />
                    </label>
                    <label>Price:
                        <input
                            type="text"
                            placeholder="Cost per night"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </label>
                    <label>Description:
                        <input
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </label>
                    <button
                    className="host-form"
                    disabled={errorValidations.length > 0}
                    type="submit"
                    >
                        Create New Spot
                    </button>
                    <Link id='cancel-host-form' exact to="/">
                        Cancel
                    </Link>
                </form>
            </div>
        </div>
    )
}


export default CreateSpot
