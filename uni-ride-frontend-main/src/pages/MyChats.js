import React, { useEffect, useState } from 'react'
import axios from '../axios'
import token from '../token'
import Chatbox from '../Components/Chatbox'
const MyChats = () => {
  const [covos, setConvos] = useState([])
  const [driver, setDriver] = useState(null)
  const [c, cid] = useState(null)
  const [me, setMe] = useState(null)

  useEffect(() => {
    myConvo()
    getUser()
  }, [])

  async function getUser () {
    try {
      const response = await axios.get('/validate', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setMe(response.data.validateOne._id)
    } catch (error) {
      console.log(error)
    }
  }
  const myConvo = async () => {
    try {
      const res = await axios.get('/myconvos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('res', res.data)
      setConvos(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='inside-ride'>
      <div className='left'>
        <h2 style={{fontFamily:'Julius Sans One', marginTop:'5%'}}>MY CHATS</h2>
        <br />
        <div className='details'>
          { covos.length > 0 ? covos.map(m => {
            return (
              <>
                {m.members && (
                  <button
                    onClick={() => {
                      if (me === m.members[1]._id) {
                        setDriver(m.members[0])
                        cid(m._id)
                      } else {
                        setDriver(m.members[1])
                        cid(m._id)

                      }
                    }}
                    className='chatbois'
                  >
                    <div className='det'>
                      <img src='/icons/img.png' alt='' />{' '}
                      {me === m.members[1]._id
                        ? m.members[0].username
                        : m.members[1].username}
                    </div>
                    <div className='date'>{m.createdAt.slice(0, 10)}</div>
                  </button>
                )}
              </>
            )
          }): <>No Chats</>}
        </div>
      </div>
      <div className='right'>
        <Chatbox driver={driver} start={true} cid={c}/>
      </div>
    </div>
  )
}

export default MyChats
