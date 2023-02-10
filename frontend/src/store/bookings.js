import { csrfFetch } from './csrf';
import { normalizeArray } from '../utils/normalizeArray';

/* ----------------------------------------------------------- */
/* ------------------------- ACTIONS ------------------------- */
/* ----------------------------------------------------------- */

const SET_SPOT_BOOKINGS = 'bookings/SET_SPOT_BOOKINGS';
const CURRENT_USER_BOOKINGS = 'bookings/CURRENT_USER_BOOKINGS';
const CREATE_BOOKING = 'bookings/CREATE_BOOKING';
const UPDATE_BOOKING = 'bookings/UPDATE_BOOKING';
const REMOVE_BOOKING = 'bookings/REMOVE_BOOKING';

export const setBookings = bookings => {
  return {
    type: SET_SPOT_BOOKINGS,
    bookings
  };
};

export const setCurrentUserBookings = currentUserBookings => {
  return {
    type: CURRENT_USER_BOOKINGS,
    currentUserBookings
  };
};

export const createBooking = booking => {
  return {
    type: CREATE_BOOKING,
    booking
  };
};

export const updateBooking = booking => {
  return {
    type: UPDATE_BOOKING,
    booking
  };
};

export const removeBooking = bookingId => {
  return {
    type: REMOVE_BOOKING,
    bookingId
  };
};

/* ----------------------------------------------------------- */
/* ------------------------- THUNKS -------------------------- */
/* ----------------------------------------------------------- */

export const getBookings = spotId => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/bookings`);

  if (res.ok) {
    const data = await res.json();
    dispatch(setBookings(normalizeArray(data.Bookings)));
    return res;
  }
  return res;
};

export const getUserBookings = () => async dispatch => {
  const res = await csrfFetch(`/api/bookings/current`);

  if (res.ok) {
    const data = await res.json();
    dispatch(setCurrentUserBookings(normalizeArray(data.Bookings)));
    return res;
  }
  return res;
};

export const postBooking = (spotId, payload) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(createBooking(data));
    return res;
  }
  return res;
};

export const putBooking = (bookingId, payload) => async dispatch => {
  const res = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(updateBooking(data));
    return res;
  }
  return res;
};

export const deleteBooking = booking => async dispatch => {
  const res = await csrfFetch(`/api/bookings/${booking.id}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(getBookings(booking.spotId));
    dispatch(getUserBookings(booking.userId));
    dispatch(removeBooking(booking.id));
    return res;
  }
  return res;
};

/* ----------------------------------------------------------- */
/* ------------------------- REDUCER ------------------------- */
/* ----------------------------------------------------------- */

const initialState = { spotBookings: null, currentUserBookings: null };

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOT_BOOKINGS: {
      return { ...state, spotBookings: { ...action.bookings } };
    }
    case CURRENT_USER_BOOKINGS: {
      return { ...state, currentUserBookings: { ...action.currentUserBookings } };
    }
    case CREATE_BOOKING: {
      return {
        ...state,
        spotBookings: { ...state.spotBookings, [action.booking.id]: action.booking },
        currentUserBookings: { ...state.currentUserBookings, [action.booking.id]: action.booking }
      };
    }
    case UPDATE_BOOKING: {
      return {
        ...state,
        spotBookings: { ...state.spotBookings, [action.booking.id]: action.booking },
        currentUserBookings: { ...state.currentUserBookings, [action.booking.id]: action.booking }
      };
    }
    case REMOVE_BOOKING: {
      const newState = { ...state };
      if (newState.spotBookings[action.bookingId]) delete newState.spotBookings[action.bookingId];
      if (newState.currentUserBookings[action.bookingId]) delete newState.currentUserBookings[action.bookingId];
      return newState;
    }
    default:
      return state;
  }
};

export default bookingsReducer;
