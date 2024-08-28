import React, { useEffect, useState } from 'react'
import ResultCard from '../Components/ResultCard'
import Chatbox from '../Components/Chatbox'
import token from '../token'
import { useParams } from 'react-router-dom'
import axios from '../axios'
import toast from 'react-hot-toast'
import { Dna } from 'react-loader-spinner'

const InsideRide = () => {
  const { rideId, driverID } = useParams()
  const [driver, setDriver] = useState(null)
  const [ride, setRide] = useState(null)
  const [myRIde, setMyRide] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    validate()
    getRide()
    setLoading(false)
  }, [])
  useEffect(() => {
    checkMyRide()
  }, [rideId])
  const validate = async () => {
    try {
      setLoading(true)

      const response = await axios.get(`/getbyID/${driverID}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setDriver(response.data.user)
      if (response.data.user) {
        toast.success(`You can chat with ${response.data.user.username} `)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)

      console.log(error)
    }
  }
  const getRide = async () => {
    try {
      setLoading(true)

      const response = await axios.get(`/rideByID/${rideId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setRide(response.data.rides)
    } catch (error) {
      setLoading(false)

      console.log(error)
    }
  }
  const checkMyRide = async () => {
    try {
      setLoading(true)

      const response = await axios.get(`/onlycancel/${rideId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.data.message === 'My Ride') {
        setMyRide(true)
      } else {
      }
    } catch (error) {
      setLoading(false)

      console.log(error)
    }
  }

  const fixRide = async id => {
    try {
      setLoading(true)

      const res = await axios.post(
        `/ride-finalised/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if ((res.data.message = 'Ride Finalised')) {
        toast.success('Ride Finalised')
        window.location.reload(false)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  const cancelRide = async rideId => {
    try {
      setLoading(true)

      const res = await axios.delete(
        `cancel-ride/${rideId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (res.data.message === 'Ride cancelled successfully') {
        setLoading(false)
        window.location.reload(false)
        toast.success(`${res.data.message}`)
      }
    } catch (error) {
      setLoading(false)

      toast.error('Internal Server Error')
    }
  }

  const addReview = async () => {
    setLoading(true)
  }
  return (
    <>
      {ride && (
        <div className='inside-ride'>
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
          <div className='left'>
            <div className='details detmb'>
              <ResultCard details={ride} />
            </div>
            <br />
            {ride.isFinalised === true ? (
              <>
                {' '}
                <h2 disabled className='fix-btn'>
                  This Ride is Fixed
                </h2>
                {myRIde && (
                  <button
                    onClick={() => cancelRide(ride._id)}
                    className='fix-btn'
                  >
                    Cancel Ride
                  </button>
                )}
              </>
            ) : (
              <>
                {' '}
                <button onClick={() => fixRide(ride._id)} className='fix-btn'>
                  Fix Ride
                </button>
                <button
                  disabled
                  onClick={() => fixRide(ride._id)}
                  className='fix-btn'
                >
                  Add Review
                </button>
                <div className='review'></div>
              </>
            )}
            <br />
            <div className='more'>
              <h4>More About Maverick</h4>
              <div className='mav-details'>
                <p>
                  Profile Status: <span>Verified</span>
                </p>
                <p>
                  Vehicle: <span>{ride.vehicle}</span>
                </p>
                <p>
                  Profession: <span>{'Student'}</span>
                </p>
              </div>
              <div className='reviews'>
                <h4>Reviews</h4>
                <div className='rev-cards'>
                  <div className='rev-card'>
                    <div className='img'>
                      <img src='/icons/img.png' alt='' />
                    </div>
                    <p style={{ fontWeight: '600' }} className='name'>
                      Lokendra
                    </p>
                    <br />
                    <p className='desc'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolore veniam hic dolores itaque illo dignissimos dolorem
                      saepe optio minus sint?
                    </p>
                    <br />
                    <p className='rating'> * * * * *</p>
                  </div>

                  <div className='rev-card'>
                    <div className='img'>
                      <img src='/icons/img.png' alt='' />
                    </div>
                    <p style={{ fontWeight: '600' }} className='name'>
                      Lokendra
                    </p>
                    <br />
                    <p className='desc'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolore veniam hic dolores itaque illo dignissimos dolorem
                      saepe optio minus sint?
                    </p>
                    <br />
                    <p className='rating'> * * * * *</p>
                  </div>
                  <div className='rev-card'>
                    <div className='img'>
                      <img src='/icons/img.png' alt='' />
                    </div>
                    <p style={{ fontWeight: '600' }} className='name'>
                      Lokendra
                    </p>
                    <br />
                    <p className='desc'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolore veniam hic dolores itaque illo dignissimos dolorem
                      saepe optio minus sint?
                    </p>
                    <br />
                    <p className='rating'> * * * * *</p>
                  </div>

                  <div className='rev-card'>
                    <div className='img'>
                      <img src='/icons/img.png' alt='' />
                    </div>
                    <p style={{ fontWeight: '600' }} className='name'>
                      Lokendra
                    </p>
                    <br />
                    <p className='desc'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolore veniam hic dolores itaque illo dignissimos dolorem
                      saepe optio minus sint?
                    </p>
                    <br />
                    <p className='rating'> * * * * *</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='right'>
            <Chatbox driver={driver} />
          </div>
        </div>
      )}
    </>
  )
}

export default InsideRide
