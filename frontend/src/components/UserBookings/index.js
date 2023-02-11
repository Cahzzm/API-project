import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBookings } from '../../store/bookings';
import SingleBooking from './SingleBooking';
import './UserBookings.css';

const UserBookings = () => {
  const dispatch = useDispatch();
  let userBookings = useSelector(state => state.bookings.currentUserBookings);
  if (userBookings) userBookings = Object.values(userBookings);

  useEffect(() => {
    dispatch(getUserBookings());
  }, [dispatch]);

  if (!userBookings) return null;

  return (
    <div className='user-bookings-container'>
      <header className='user-bookings-header'>
        <h2>My Bookings</h2>
      </header>
      <div className='user-bookings-body'>
        {userBookings.length > 0 ? (
          <div className='user-bookings'>
            {userBookings.map((booking, idx) => (
              <div
                key={idx}
                className='single-booking-container'
              >
                <SingleBooking booking={booking} />
              </div>
            ))}
          </div>
        ) : (
          <div className='no-user-bookings'>You haven't booked anything yet :(</div>
        )}
      </div>
    </div>
  );
};

export default UserBookings;
