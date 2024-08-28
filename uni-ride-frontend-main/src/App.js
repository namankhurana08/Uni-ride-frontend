import { Rides, InsideRides, Home } from './pages'
import Navbar from './Components/Navbar'
import { Toaster } from 'react-hot-toast'
import axios from './axios'
import { Dna } from 'react-loader-spinner'
import { Provider } from 'react-redux'


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { useEffect, useState } from 'react'
import MyRides from './pages/MyRides'
import MyChats from './pages/MyChats'

function App () {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [location, setLocation] = useState([])
  const [loading, setLoading] = useState(false)


  const token = localStorage.getItem('access_token')
  const admintoken = localStorage.getItem('admin')
  useEffect(() => {
    async function getUser () {
      if (!token && !admintoken) {
        return
      }

      const utoken = admintoken || token

      try {
        const response = await axios.get('/validate', {
          headers: {
            Authorization: `Bearer ${utoken}`
          }
        })
        setUser(response.data.validateOne.username)
        setRole(response.data.validateOne.role)
      } catch (error) {
        console.log(error)
      }
    }

    getUser()
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    try {
      setLoading(false)

      const response = await axios.get('/get-location')
      setLocation(response.data.locations)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  const pattern = /^\/to-chat\/\w+\/\w+$/;
  return (
    <>
      <Toaster
        position='top-center'
        toastOptions={{
          success: {
            theme: {
              primary: '#FFFA67'
            },
            style: {
              background: '#F36368',
              color: 'white'
            },
            iconTheme: {
              primary: '#FFFA67',
              secondary: 'black'
            }
          }
        }}
      ></Toaster>
      <Router>
        <Navbar user={user} role={role} />
        <main>
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
          <Routes>
         
            <Route path='' element={<Home location={location} />} />
            <Route
              path=':from/:to/:date'
              element={<Rides location={location} />}
            />
            {token && (
              <Route
                path='to-chat/:rideId/:driverID'
                element={<InsideRides />}
              />
            )}
            {token && (
              <Route
                path='to-chat/:rideId/:driverID'
                element={<InsideRides />}
              />
            )}
            {token && <Route path='myrides' element={<MyRides />} />}
            {token && <Route path='allchats' element={<MyChats />} />}
          </Routes>
        </main>
       
       
      </Router>
    </>
  )
}

export default App
