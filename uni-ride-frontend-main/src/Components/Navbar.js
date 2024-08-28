import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../popup.css'
import Login from './Login'
import PostRide from '../popups/PostRide'
const Navbar = ({ user, role }) => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [postOPen, setPostOpen] = useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }
  const togglePost = () => {
    setPostOpen(!postOPen)
  }
  console.log('nav', user, role)
  const handleLogout = () => {
    localStorage.clear()
    window.location.reload(false)
    navigate('/')
  }
  useEffect(() => {
    const check = localStorage.getItem('animationend')

    const logo = document.querySelector('.logos')
    if (!check) {
      logo.classList.add('shake')
    }
  }, [])

  function handleAnimationEnd (c) {
    const check = localStorage.getItem('animationend')
    const bikeImg = document.getElementById(c)
    if (!check) {
      bikeImg.classList.add('second-animation')
    }
  }

  function handleStop () {
    localStorage.setItem('animationend', 'true')
  }
  return (
    <div className='navbar'>
      <div className='left'>
        <a href='/' className='logo'>
          <img className='logos' src='/icons/logo.png' alt='' />
        </a>
      </div>
      <div className='right'>
        {user ? (
          <>
            {role === 'User' && (
              <>
                <div className='btn-group'>
                  <button
                    type='button'
                    className='btn btn-danger dropdown-toggle'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    {user}
                  </button>

                  <div className='dropdown-menu dpm'>
                    <a className='dropdown-item' href='/myrides'>
                      My Rides
                    </a>
                    <a className='dropdown-item' href='/allchats'>
                      My Chats
                    </a>

                    <div className='dropdown-divider'></div>

                    <button
                      onClick={handleLogout}
                      className='dropdown-item'
                      href='#'
                    >
                      Logout
                    </button>
                  </div>
                </div>
                <button onClick={togglePost} className='nav-btn'>
                  Post a Ride
                </button>
              </>
            )}
            {role === 'Z<(=XG+P9FD?MV3' && (
              <div className='btn-group'>
                <button
                  type='button'
                  className='btn btn-danger dropdown-toggle'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  {user}
                </button>
                <button onClick={togglePost} className='pos nav-btn'>
                  Post a Ride
                </button>
                <div className='dropdown-menu dpm'>
                  <a className='dropdown-item' href='/adminpanel'>
                    All Posted Rides
                  </a>
                  <a className='dropdown-item' href='/adminpanel'>
                    All reports
                  </a>

                  <div className='dropdown-divider'></div>
                  <button
                    onClick={handleLogout}
                    className='dropdown-item'
                    href='#'
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <button
              style={{ textAlign: 'center' }}
              onClick={togglePopup}
              className='login-btn nav-btn'
            >
              Login
            </button>
            <button onClick={togglePost} className='nav-btn'>
              Post a Ride
            </button>
          </>
        )}
      </div>
      {isOpen && (
        <div className='pop-overlay'>
          <div className='popup'>
            <Login />
            <button className='cls-btn' onClick={togglePopup}>
              <i className='fa-solid fa-xmark'></i>
            </button>
          </div>
        </div>
      )}
      {postOPen && (
        <div className='pop-overlay '>
          <div className='popup '>
            <PostRide />
            <button className='cls-btn ' onClick={togglePost}>
              <i className=' ccm fa-solid fa-xmark'></i>
            </button>
          </div>
        </div>
      )}

      <div className='anbike'>
        <img
          onAnimationEnd={() => handleAnimationEnd('bike-img')}
          className='anb'
          src='/images/car.png'
          alt=''
        />
        <img
          onAnimationEnd={() => handleAnimationEnd('human')}
          id='bike-img'
          src='/images/bike.png'
          alt=''
        />
        <img id='trre' src='/images/tree.png' alt='' />
        <img
          className='gif '
          onAnimationEnd={handleStop}
          id='human'
          src='/images/running.gif'
          alt=''
        />
      </div>
    </div>
  )
}

export default Navbar
