import React, { useEffect, useState } from 'react'
import axios from '../axios'
import toast from 'react-hot-toast'

import token from '../token'

const PostRide = () => {
  const [loading, setLoading] = useState(false)

  const [price, setprice] = useState('')
  const [maxPerson, setmaxPerson] = useState(0)
  const [vehicle, setvehicle] = useState('')
  const [vehicleNumber, setvehicleNumber] = useState('')
  const [date, setSelectedDate] = useState('')
  const [time, setTime] = useState('')
  const [vehicleType, setVehicleType] = useState('Bike')

  const [location, setLocation] = useState([])

  const onTimeChange = time => {
    setTime(time)
  }

  const handleDateChange = event => {
    setSelectedDate(event.target.value)
  }
  useEffect(() => {
    if (!token) {
      toast.error('Please Login to Post Ride')
      window.location.reload(false)
    }
    fetchLocations()
  }, [])
  const fetchLocations = async () => {
    try {
      const response = await axios.get('/get-location')
      setLocation(response.data.locations)
    } catch (error) {
      console.log(error)
    }
  }
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const dayAfterTomorrow = new Date(new Date())
  dayAfterTomorrow.setDate(new Date().getDate() + 2)

  const postRide = async e => {
    e.preventDefault()
    try {
      setLoading(true)
      const from = document.getElementById('from').value
      const to = document.getElementById('to').value

      console.log(from, to)
      const response = await axios.post(
        'post-ride',
        {
          from,
          to,
          date,
          time,
          price,
          vehicleType,
          vehicleNumber,
          vehicle,
          maxPerson
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log(response)
      if (response && response.data.message === 'Posted') {
        toast.success('Ride Posted')
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <div className='postride ppm'>
      <form>
        <div className='from'>
          <select name='from' id='from'>
            <option value='' disabled>
              From
            </option>
            {location &&
              location.map(l => {
                return (
                  <option key={l._id} value={l.locationName}>
                    {l.locationName}
                  </option>
                )
              })}
          </select>

          <select name='to' id='to'>
            <option value='' disabled>
              To
            </option>

            {location &&
              location.map(l => (
                <option key={l._id} value={l.locationName}>
                  {l.locationName}
                </option>
              ))}
          </select>

          <input
            max={dayAfterTomorrow.toISOString().split('T')[0]}
            min={tomorrow.toISOString().split('T')[0]}
            type='date'
            id='date-inputs'
            onChange={handleDateChange}
          />

          <input
            type='time'
            placeholder='Time'
            value={time}
            onChange={t => onTimeChange(t.target.value)}
          />
          <input
            type='number'
            value={price}
            onChange={e => setprice(e.target.value)}
            placeholder='Charges'
          />
          <select name='' id='' onChange={e => setVehicleType(e.target.value)}>
            <option value='' disabled>
              Vehicle Type
            </option>
            <option value='Bike'>Bike</option>
            <option value='Car'>Car</option>
            <option value='Car'>Scooty</option>
          </select>
          <input
            type='number'
            onChange={e => setmaxPerson(e.target.value)}
            value={maxPerson}
            placeholder='People'
          />
          <input
            type='text'
            onChange={e => setvehicle(e.target.value)}
            value={vehicle}
            placeholder='Vehicle Name'
          />
          <input
            onChange={e => setvehicleNumber(e.target.value)}
            type='text'
            value={vehicleNumber}
            placeholder='Vehicle Number'
          />
        </div>
        <br />
        <input
          onClick={postRide}
          className='post-sub'
          type='submit'
          value='Post Ride'
        />
      </form>
    </div>
  )
}

export default PostRide
