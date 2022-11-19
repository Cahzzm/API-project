
import { csrfFetch } from "./csrf"

const LOAD = 'spots/LOAD'
const LOAD_ONE = 'spots/LOAD_ONE'
const ADD_SPOT = 'spots/ADD_SPOT'
const DELETE = 'spots/DELETE'
const ADD_IMAGE = 'spots/ADD_IMAGE'

const loadSpots = list => ({
    type: LOAD,
    list
})

const addSpot = spot => ({
    type: ADD_SPOT,
    spot
})

const loadOneSpot = spot => ({
    type: LOAD_ONE,
    spot
})

const deleteSpot = spotId => ({
    type: DELETE,
    spotId
})

const addImage = (image, spot) => ({
    type: ADD_IMAGE,
    image,
    spot
})

//------------THUNKS-----------//
export const getSpotsThunk = () => async dispatch => {
    const response = await fetch(`/api/spots`)

    if(response.ok) {
        const allSpots = await response.json()
        dispatch(loadSpots(allSpots.Spots))
    }
}

export const getOneSpotThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    if(response.ok) {
        const spot = await response.json()
        dispatch(loadOneSpot(spot))
    }
}

export const createSpotThunk = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if(response.ok) {
        const newSpot = await response.json()
        dispatch(addSpot(newSpot))
        return newSpot
    }
}

export const addSpotImageThunk = (payload, spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spot.id}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if(response.ok) {
        const newImage = await response.json()
        dispatch(addImage(newImage, spot))
        return newImage
    }
}

export const editSpotThunk = (payload, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if(response.ok) {
        const spot = await response.json()
        dispatch(addSpot(spot))
        return spot
    }
}

export const deleteSpotThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE"
    })

    if(response.ok) {
        const spot = await response.json()
        dispatch(deleteSpot(spotId))
        return spot
    }
}


//---------REDUCER------------//
const initialState = {
    allSpots: {},
    singleSpot: {}
 }

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            const allSpotsState = {}
            action.list.forEach(spot => (
                allSpotsState[spot.id] = spot
            ))
            return {
                ...state,
                allSpots: allSpotsState,
                singleSpot: {}
            }
        }
        case LOAD_ONE:
            return {
                ...state,
                singleSpot: action.spot
            }
        case ADD_SPOT:
            return {
                ...state,
                [action.spot.id]: action.spot
            }
        case ADD_IMAGE: {
            return {
                ...state,
                [action.spot.id]: {
                    ...action.spot,
                    previewImage: action.image.url
                }
            }
        }
        case DELETE: {
         const newState = {
            ...state
        }
         delete newState.allSpots[action.spotId]
         return newState
        }
        default:
            return state
    }
}


export default spotsReducer
