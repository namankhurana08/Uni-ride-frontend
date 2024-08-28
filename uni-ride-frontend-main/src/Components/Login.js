import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from '../axios'
import Register from './Register'
import './login.css'
import { Dna } from 'react-loader-spinner'


const Login = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post('/login', {
        email,
        password
      })

      toast.success(`Welcome To UNI-RIDE`)
      console.log(response.data)
      if (response) {
        console.log(response.data.user.role)
        if (response.data.user.role) {
          if (response.data.user.role === 'admin') {
            localStorage.setItem('admin', response.data.access_token)
            setLoading(false)

            window.location.reload(false)
          } else {
            console.log('hiiii');
            localStorage.setItem('access_token', response.data.access_token)
            setLoading(false)

            window.location.reload(false)
          }
          console.log('hii new');
        }
      }
    } catch (error) {
      toast.error('Check Credentials')
      setLoading(false)
    }
  }

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {loading && (
          <>
            <div className='loader'>
              <div className='pop-overlay'></div>
              <Dna
                height='100'
                width='100'
                color='#18206F'
                secondaryColor='#FBCBDC'
                radius='12.5'
                ariaLabel='mutating-dots-loading'
                wrapperStyle={{}}
                wrapperClass='mutating-dots-loading'
                visible={true}
              />
            </div>
          </>
        )}
        <div class='form-containers'>
          <p class='title'>Login</p>
          <form class='form'>
            <div class='input-group'>
              <label for='username'>E-mail</label>
              <input
                type='text'
                value={email}
                name='username'
                id='username'
                onChange={e => setemail(e.target.value)}
              />
            </div>
            <div class='input-group'>
              <label for='password'>Password</label>
              <input
                type='password'
                name='password'
                value={password}
                id='password'
                placeholder=''
                onChange={e => setpassword(e.target.value)}
              />
              <div class='forgot'>
                <a rel='noopener noreferrer' href='#'>
                  Forgot Password ?
                </a>
              </div>
            </div>
            <button onClick={handleLogin} class='sign'>
              Sign in
            </button>
          </form>
          <br />
          <br />
          <br />
          <p class='signup'>
            Don't have an account?
            <a onClick={togglePopup} class=''>
              Sign up
            </a>
          </p>
        </div>
        {isOpen && (
          <div className='pop-overlay'>
            <div className='popup-r'>
              <Register />
              <button className='cls-btn c-r' onClick={togglePopup}>
                <i class='fa-solid fa-xmark'></i>
              </button>
            </div>
          </div>
        )}
    </>
  )
}

export default Login
