import React, { useState } from 'react'
import axios from '../axios'
import toast from 'react-hot-toast'
import ResultCard from '../Components/ResultCard'
import { useParams } from 'react-router-dom'
const SeeRides = () => {
  const [rating, setRating] = useState(0)
  const { from, to, date } = useParams()

  const [fr, setfr] = useState(from)
  const [t, sett] = useState(to)
  const [rides, setRides] = useState([])

  const handleRatingChange = value => {
    setRating(value)
  }
  const onTimeChange = time => {
    setTime(time)
  }

  const handleDateChange = event => {
    setSelectedDate(event.target.value)
  }

  const [selectedDate, setSelectedDate] = useState(date)
  const [time, setTime] = useState('')
  const handleSearch = async limit => {
    try {
      const response = await axios.get(`/search-rides-by-time/${limit}`)
      console.log(response.data)
    } catch (error) {
      console.error(error.response.data)
    }
  }
  return (
    <>
      <div className='see-rides'>
        <div className='search-result '>
          <div className='left'>
            <h3>Filters</h3>
            <div className='timeslots'>
              <h4>Time Slots</h4>
              <div className='t-btn '>
                <button onClick={() => handleSearch('9-10')}>
                  09 AM - 10 AM
                </button>
                <button onClick={() => handleSearch('10-11')}>
                  10 AM - 11 AM
                </button>
                <button onClick={() => handleSearch('11-12')}>
                  11 AM - 12 PM
                </button>
                <button onClick={() => handleSearch('12-1')}>
                  12 PM - 01 PM
                </button>
                <button onClick={() => handleSearch('1-2')}>
                  01 PM - 02 PM
                </button>
                <button onClick={() => handleSearch('2-3')}>
                  02 PM - 03 PM
                </button>
                <button onClick={() => handleSearch('3-4')}>
                  03 PM - 04 PM
                </button>
                <button onClick={() => handleSearch('4-5')}>
                  04 PM - 05 PM
                </button>
                <button onClick={() => handleSearch('5-6')}>
                  05 PM - 06 PM
                </button>
                <button onClick={() => handleSearch('6-7')}>
                  06 PM - 07 PM
                </button>
              </div>
            </div>
            <div className='charges'>
              <h4>Charges</h4>
              <form action=''>
                <input
                  placeholder='max'
                  type='number'
                  value={'Max'}
                  name=''
                  id=' '
                />
                <input
                  placeholder='min'
                  type='number'
                  value={'Max'}
                  name=''
                  id=' '
                />
              </form>
              <h6>Suggested: $ 40</h6>
            </div>{' '}
            <br />
            <div className='charges'>
              <h4>Vehicle</h4>
              <select name='' id=''>
                <option value=''>Car</option>
                <option value=''>Bike</option>
                <option value=''></option>
              </select>
            </div>{' '}
            <br />
            <div className='charges'>
              <h4>Starred Driver</h4>
              <select name='' id=''>
                <option value=''>Car</option>
                <option value=''>Bike</option>
                <option value=''></option>
              </select>
            </div>{' '}
            <br />
            <div className='charges'>
              <h4>Status</h4>
              <select name='' id=''>
                <option value=''>Upcoming</option>
                <option value='Upcoming'>Upcoming</option>
                <option value='Finished'>Finished</option>
                <option value=''></option>
              </select>
            </div>
          </div>

          <div className='right'>
            <div className='results'>
              <ResultCard />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SeeRides
