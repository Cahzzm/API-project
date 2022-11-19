import { csrfFetch } from "./csrf";

const LOAD_ALL = 'review/LOAD_ALL'
const ADD_ONE = 'review/ADD_ONE'
const DELETE = 'review/DELETE'

//----------ACTIONS-----------//
const loadAll = reviews => ({
    type: LOAD_ALL,
    list: reviews
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
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if(response.ok) {
        const review = await response.json()
        await dispatch(getAllReviewsThunk(spotId))
        return review
    }
}

export const deleteReviewThunk = (reviewId, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if(response.ok) {
        await dispatch(deleteReview(reviewId, spotId))
    } else {
        const {message} = await response.json()
        return message
    }


}

//-----------REDUCER--------------//
const initialState = {}

const reviewsReducer = (state= initialState, action) => {
    switch(action.type) {
        case LOAD_ALL: {
            const allReviews = {}
            action.list.Reviews.forEach(review => {
                allReviews[review.id] = review
            });
            return allReviews
        }
        case ADD_ONE:
            return {
                ...state,
                [action.review.id]: action.review
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
