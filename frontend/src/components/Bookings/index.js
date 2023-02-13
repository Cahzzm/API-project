import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as bookingActions from '../../store/bookings';
import * as spotActions from '../../store/spot';
// import { AiFillStar } from 'react-icons/ai';
import './bookings.css';

export default function BookingDetails({ spot }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user)
  const [startDate, setStartDate] = useState('2023-04-03');
  const [endDate, setEndDate] = useState('2023-04-10');
  const [errors, setErrors] = useState([]);

  const handleBooking = async e => {
    e.preventDefault();
    setErrors([]);

    const newBooking = {
      startDate,
      endDate
    };

    return await dispatch(bookingActions.postBooking(spot.id, newBooking))
      .then(async res => {
        if (res.ok) {
          dispatch(spotActions.getOneSpotThunk(spot.id));
          history.push('/my-bookings')
        }
      })
      .catch(async res => {
        const data = await res.json();
        if (data && data.message) setErrors(data.errors ? Object.values(data.errors) : [data.message]);
      });
  };

  return (
    <div className='booking-details-component-container'>
      {errors.length > 0 ? (
        <header className='booking-details-header-errors'>
          {errors.map((error, idx) => (
            <div
              className='booking-error'
              key={idx}
            >
              {error}
            </div>
          ))}
        </header>
      ) : (
        <header className='booking-details-header'>
          <div>
            <span className='spot-price bold'>${spot.price} </span>
            <span>night</span>
          </div>
          <div className='booking-details-component-reviews'>
            <i class='fas fa-star'></i>
            <span>{spot.avgRating} · </span>
            <span
              to='/feature-not-found'
              className='booking-details-component-numreviews'
            >
              {spot.numReviews} reviews
            </span>
          </div>
        </header>
      )}
      <form
        onSubmit={handleBooking}
        className='date-guest-select-container'
      >
        <div className='date-guest-top'>
          <div className='date-guest-top-left'>
            <p className='check-in bold'>CHECK-IN</p>
            <input
              className='date-input'
              type='date'
              onChange={e => setStartDate(e.target.value)}
              value={startDate}
            />
          </div>
          <div className='date-guest-top-right'>
            <p className='check-out bold'>CHECK-OUT</p>
            <input
              className='date-input'
              type='date'
              onChange={e => setEndDate(e.target.value)}
              value={endDate}
            />
          </div>
        </div>
        <div className='date-guest-btm'>
          <select className='date-guest-btm-select'>
            <option value={1}>1 guest</option>
            <option value={2}>2 guests</option>
            <option value={3}>3 guests</option>
            <option value={4}>4 guests</option>
            <option value={5}>5 guests</option>
          </select>
        </div>
        <button
          type='submit'
          className='reserve-btn bold'
        >
          Reserve
        </button>
      </form>

      <p className='no-charge-disclaimer'>You won't be charged yet.</p>

      <div className='price-breakdown-container'>
        <p className='nightly-price'>
          <Link
            to='/feature-not-found'
            className='price-breakdown-left'
          >
            ${spot.price} x 7 nights
          </Link>
          <span>${spot.price * 7}</span>
        </p>
        <p className='cleaning-fee'>
          <Link
            to='/feature-not-found'
            className='price-breakdown-left'
          >
            Cleaning fee
          </Link>
          <span>$0</span>
        </p>
        <p className='service-fee'>
          <Link
            to='/feature-not-found'
            className='price-breakdown-left'
          >
            Service Fee
          </Link>
          <span>$0</span>
        </p>
      </div>

      <p className='total-price bold'>
        <span>Total before taxes</span>
        <span>${spot.price * 7}</span>
      </p>

      <p className='price-disclaimer'>Promise you won't actually be charged for anything ;)</p>
    </div>
  );
}
