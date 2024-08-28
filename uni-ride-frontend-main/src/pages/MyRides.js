import React, { useEffect, useState } from 'react'
import ResultCard from '../Components/ResultCard'
import token from '../token'
import axios from '../axios'
import { Dna } from 'react-loader-spinner'

import toast from 'react-hot-toast'
const MyRides = () => {
  const [rides, setRides] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    myfinalisedRides()
  }, [])

  const mybikes = async type => {
    try {
      if (!token) {
        toast.error('Please Login To Search')
        window.location.assign('/')
      }
      setLoading(true)

      const response = await axios.get(`/all-my-types/${type}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setRides(response.data)
      toast.success(`Loaded all your ${type} Rides`)
      setLoading(false)
    } catch (error) {
      setLoading(false)

      console.log('err', error)
    }
  }

  const myfinalisedRides = async () => {
    try {
      if (!token) {
        toast.error('Please Login To Search')
        window.location.assign('/')
      }
      setLoading(true)

      const response = await axios.get(`/my-finalised-rides`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setRides(response.data)
      toast.success(`Loaded all your Finalised Rides`)
      setLoading(false)

      setLoading(false)
    } catch (error) {
      console.log('err', error)
    }
  }
  const mynotfixed = async () => {
    try {
      if (!token) {
        toast.error('Please Login To Search')
        window.location.assign('/')
      }
      setLoading(true)

      const response = await axios.get(`/my-nonfixed-rides`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setRides(response.data)
      toast.success(`Loaded all your Finalised Rides`)
      setLoading(false)

      setLoading(false)
    } catch (error) {
      console.log('err', error)
    }
  }
  const deleteRide = async id => {
    try {
      if (!token) {
        toast.error('Please Login To Search')
        window.location.assign('/')
      }
      setLoading(true)

      const response = await axios.delete(`/delete-ride/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setRides(response.data)
      toast.success(`Ride Deleted`)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error('Could Not Delete')
      console.log('err', error)
    }
  }

  return (
    <div className='see-rides'>
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
      <h4 style={{ textAlign: 'start', marginTop: '2%' }}>My Rides</h4>
      <div className='search-result'>
        <div className='left  my-b'>
          <h3>Filters</h3>
          <div className='charges my-b'>
            <h4>Driver Profile</h4>
            <button onClick={myfinalisedRides}>FINALISED</button>
            <button onClick={mynotfixed}>NOT FINALISED</button>
          </div>
          <br />
          <div className='charges'>
            <h4>User Profile</h4>
            <button>UPCOMING</button>
            <button>Previous</button>
          </div>
          <br />
          <div className='charges'>
            <h4>Vehicle</h4>
            <button onClick={() => mybikes('Car')}>Car</button>
            <button onClick={() => mybikes('Bike')}>Bike</button>
            <button onClick={() => mybikes('Scooty')}>Bike</button>
            <button>Scooty</button>
          </div>
        </div>
        <div className='right'>
          <div className='results'>
            {rides &&
              rides.map(r => {
                return (
                  <>
                    {r.finalisedBy && (
                      <>
                        <p className='finby'>
                          Finalised By: {r.finalisedBy.username}
                        </p>
                        <ResultCard key={r._id} details={r.ride} />
                      </>
                    )}
                    {!r.finalisedBy && (
                      <>
                        <button
                          onClick={() => deleteRide(r._id)}
                          className='del-btn'
                        >
                          Delete Ride
                        </button>
                        <ResultCard key={r._id} details={r} />
                      </>
                    )}
                  </>
                )
              }).reverse()}
            {rides.length === 0 && <div>No Rides to show</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyRides
