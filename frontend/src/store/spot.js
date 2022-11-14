const LOAD = 'spots/LOAD'

const loadSpots = list => ({
    type: LOAD,
    list
})


export const getSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`)

    if(response.ok) {
        const allSpots = await response.json()
        dispatch(loadSpots(allSpots))
    }
}

const initialState = {
    list: []
}

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allSpots = {}
            action.list.forEach(spot => {
                allSpots[spot.id] = spot
            })
            return {
                ...allSpots,
                ...state,
                list: action.list
            }
        default:
            return state
    }
}


export default spotsReducer
