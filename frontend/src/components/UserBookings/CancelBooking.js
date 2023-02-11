import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import { deleteBooking } from '../../store/bookings';
import './CancelBooking.css';

const CancelBookingModal = ({ booking, spot }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleCancellation = async () => {
    return await dispatch(deleteBooking(booking))
        .then(async res => {
            if (res.ok) {
                setShow(false)
            }
        });
  };

  return (
    <>
      <button
        className='cancel-booking-btn'
        onClick={() => setShow(true)}
      >
        Cancel This Booking
      </button>
      {show && (
        <Modal onClose={() => setShow(false)}>
          <div className='cancel-booking-modal-container'>
            <header className='cancel-booking-header'>
              <h2>Booking Cancellation</h2>
            </header>
            <div className='cancel-booking-body'>
              <p className='bold'>Are you sure you want to cancel your booking for {spot.address}?</p>
            </div>
            <div className='cancel-booking-btns'>
              <button
                className='do-not-cancel-btn'
                onClick={() => setShow(false)}
              >
                Cancel the cancel
              </button>
              <button
                className='do-cancel-btn'
                onClick={handleCancellation}
              >
                I want to cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CancelBookingModal;
