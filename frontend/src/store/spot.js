const LOAD = 'spots/LOAD'
const ADD_SPOT = 'spots/ADD_SPOT'

export const loadSpots = list => ({
    type: LOAD,
    list
})

export const addSpot = spot => ({
    type: ADD_SPOT,
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


export const createSpot = (payload) => async dispatch => {
    const response = await fetch(`api/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if(response.ok) {
        const newSpot = await response.json()
        dispatch(addSpot(newSpot.Spots))
        return newSpot
    }
}


//---------REDUCER------------//
const initialState = {
    list: []
 }

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allSpotsState = {}
            action.list.forEach(spot => (
                allSpotsState[spot.id] = spot
            ))
            return {
                ...allSpotsState,
                ...state.list,
                list: action.list
            }
        case ADD_SPOT:
                if(!state[action.spot.id]) {
                    const newSpotState = {
                        ...state,
                        [action.spot.id]: action.spot
                    }
                    const spotsList = newSpotState.list.map(id => newSpotState[id])
                    spotsList.push(action.spot)
                    newSpotState.list = action.list
                    return newSpotState
                }
                return {
                    ...state,
                    [action.spot.id]: {
                        ...state[action.spot.id],
                        ...action.spot
                    }
                }
        default:
            return state
    }
}


export default spotsReducer
