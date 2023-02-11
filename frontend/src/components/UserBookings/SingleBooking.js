import { NavLink } from 'react-router-dom';
import CancelBookingModal from './CancelBooking';
import './SingleBooking.css';

const SingleBooking = ({ booking }) => {
  const spot = booking.Spot;
  console.log('===============spot==========', spot)

  const startDate = new Date(booking.startDate).toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const endDate = new Date(booking.endDate).toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className='single-booking'>
      <NavLink to={`/spots/${spot?.id}`}>
        <img
          className='spot-card-img'
          src={spot.previewImage}
          alt=''
        />
      </NavLink>
      <div className='spot-text-container'>
        <h3 className='spot-name bold'>{spot.address}</h3>
        <div className='booking-dates'>
          <p className='booking-date'>
            {new Date() < new Date(booking.startDate) ? 'Starting:' : 'Started:'}{' '}
            <span className='bold'>{startDate}</span>
          </p>
          <p className='booking-date'>
            {new Date() < new Date(booking.endDate) ? 'Ending:' : 'Ended:'} <span className='bold'>{endDate}</span>
          </p>
        </div>
        {new Date() < new Date(booking.startDate) && (
          <CancelBookingModal booking={booking} spot={spot} />
        )}
      </div>
    </div>
  );
};

export default SingleBooking;
