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
    <header className='header'>
      <div className='navbar'>
        <div className='left-navbar'>
            <NavLink exact to="/">
              <div className='nitrogenbnb-word'>
              <img className = "airbnb-logo" src='https://img.icons8.com/color/2x/airbnb.png' alt=''></img>
              nitrogenbnb
              </div>
            </NavLink>
        </div>
        <div className='right-navbar'>
          <NavLink to="/spots/host">
            <button id='host-home-button'>Nitrogennbnb your home</button>
          </NavLink>
            {isLoaded && (
              <ProfileButton user={sessionUser}
              setLogin={setLogin}
              setShowModal={setShowModal}
              />
              )}
            {showModal && <Modal onClose={() => {
              console.log("running close modal")
              setShowModal(false)
            }}>
            {login ? <LoginForm setShowModal={setShowModal}/> : <SignupFormPage setShowModal={setShowModal}/>}
            </Modal>
          }
          <Demo />
          </div>
        </div>
        <div className='bottom-navbar'>
          <img class="i1wps9q8 dir dir-ltr" src="https://a0.muscache.com/pictures/c0fa9598-4e37-40f3-b734-4bd0e2377add.jpg" alt='' width="24" height="24"></img>
          <img class="i1wps9q8 dir dir-ltr" src="https://a0.muscache.com/pictures/248f85bf-e35e-4dc3-a9a1-e1dbff9a3db4.jpg" alt='' width="24" height="24"></img>
          <img class="i1wps9q8 dir dir-ltr" src="https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg" alt='' width="24" height="24"></img>
          <img class="i1wps9q8 dir dir-ltr" src="https://a0.muscache.com/pictures/e22b0816-f0f3-42a0-a5db-e0f1fa93292b.jpg" alt='' width="24" height="24"></img>
          <img class="i1wps9q8 dir dir-ltr" src="https://a0.muscache.com/pictures/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf.jpg" alt='' width="24" height="24"></img>
          <img class="i1wps9q8 dir dir-ltr" src="https://a0.muscache.com/pictures/51f5cf64-5821-400c-8033-8a10c7787d69.jpg" alt='' width="24" height="24"></img>
          <img class="i1wps9q8 dir dir-ltr" src="https://a0.muscache.com/pictures/eb7ba4c0-ea38-4cbb-9db6-bdcc8baad585.jpg" alt='' width="24" height="24"></img>
          <img class="i1wps9q8 dir dir-ltr" src="https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg" alt='' width="24" height="24"></img>
          <img class="i1wps9q8 dir dir-ltr" src="https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg" alt='' width="24" height="24"></img>
          <img class="i1wps9q8 dir dir-ltr" src="https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg" alt='' width="24" height="24"></img>
          <img class="i1wps9q8 dir dir-ltr" src="https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg" alt='' width="24" height="24"></img>
          <img class="i1wps9q8 dir dir-ltr" src="https://a0.muscache.com/pictures/35919456-df89-4024-ad50-5fcb7a472df9.jpg" alt='' width="24" height="24"></img>
          <img class="i1wps9q8 dir dir-ltr" src="https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg" alt='' width="24" height="24"></img>
          <img class="i1wps9q8 dir dir-ltr" src="https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg" alt='' width="24" height="24"></img>
          <img class="i1wps9q8 dir dir-ltr" src="https://a0.muscache.com/pictures/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg" alt='' width="24" height="24"></img>
        </div>
    </header>
  );
}

export default Navigation;
