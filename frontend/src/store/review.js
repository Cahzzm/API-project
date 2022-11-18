import { csrfFetch } from "./csrf";

const LOAD_ALL = 'review/LOAD_ALL'
const ADD_ONE = 'review/ADD_ONE'
const DELETE = 'review/DELETE'

//----------ACTIONS-----------//
const loadAll = reviews => ({
    type: LOAD_ALL,
    list: reviews
})

const addReview = review => ({
    type: ADD_ONE,
    review
})

const deleteReview = (reviewId, spotId) => ({
    type: DELETE,
    reviewId,
    spotId
})

//-------------THUNKS-----------//
export const getAllReviewsThunk = spotId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if(response.ok) {
        const reviews = await response.json()
        dispatch(loadAll(reviews))
    }
}

export const addReviewThunk = (payload, spotId) => async dispatch => {
    console.log("------------------------", payload)
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    console.log("==================", response)

    if(response.ok) {
        const review = await response.json()
        await dispatch(addReview(review))
        return review
    }
}

export const deleteReviewThunk = (reviewId, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if(response.ok) {
        const {id: deletedItemId} = await response.json()
        await dispatch(deleteReview(deletedItemId, spotId))
        return deletedItemId
    }
}

//-----------REDUCER--------------//
const initialState = {
    list:[]
}

const reviewsReducer = (state= initialState, action) => {
    switch(action.type) {
        case LOAD_ALL: {
            const allReviews = {}
            action.list.Reviews.forEach(review => {
                allReviews[review.id] = review
            });
            return {
                ...allReviews,
                ...state.list,
                list: action.list
            }
        }
        case ADD_ONE: {
            if(!state[action.review.id]) {
                const newState = {
                    ...state,
                    [action.review.id]: action.review
                }
                const reviewList = newState.list.Reviews.map(id => newState[id])
                reviewList.push(action.review)
                newState.list = action.list
                // console.log(newState)
                return newState
            }
            return {
                ...state,
                [action.review.id]: {
                    ...state[action.review.id],
                    ...action.review
                }
            }
        }
        case DELETE: {
            const newState = {
                ...state
            }
            delete newState[action.reviewId]
            return newState
        }
        default:
            return state
    }
}


export default reviewsReducer
