// frontend/src/components/Navigation/index.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import SignupFormPage from '../SignupFormPage'
import Demo from './Demo';
// import LoginFormModal from '../LoginFormModal'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false)
  const [login, setLogin] = useState(true)

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <ProfileButton user={sessionUser} />
  //   );
  // } else {
  //   sessionLinks = (
  //     <>
  //       <LoginFormModal />
  //       <NavLink to="/signup">Sign Up</NavLink>
  //     </>
  //   );
  // }

  return (
    <ul>
      <li>
        <Demo />
        <NavLink exact to="/"><img className = "airbnb-logo" src='https://img.icons8.com/color/2x/airbnb.png' alt=''></img></NavLink>
        {isLoaded && (
        <ProfileButton user={sessionUser}
        setLogin={setLogin}
        setShowModal={setShowModal}
        />
        )}
      </li>
      {showModal && <Modal onClose={() => {
        console.log("running close modal")
        setShowModal(false)
        }}>
        {login ? <LoginForm setShowModal={setShowModal}/> : <SignupFormPage setShowModal={setShowModal}/>}
      </Modal>
      }
    </ul>
  );
}

export default Navigation;
