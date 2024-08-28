import React, { useEffect, useRef, useState } from 'react'
import axios from '../axios'
import token from '../token'
import { format } from 'timeago.js'
import { io } from 'socket.io-client'

const Chatbox = ({ driver, start, cid }) => {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [text, setNewMessageText] = useState('')
  const [messages, setMessages] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [isConv, setIsConv] = useState(false)
  const [convId, setConvId] = useState(null)
  const [me, setMe] = useState(null)
  const socket = useRef()
  useEffect(() => {
    socket.current = io('wss://uniride-echo.glitch.me')
    socket.current.on('getMessage', data => {
      setArrivalMessage({
        senderId: data.sendetId,
        text: data.text,
        createdAt: Date.now()
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage && setMessages(prev => [...messages, arrivalMessage])
  }, [arrivalMessage])

  useEffect(() => {

    socket.current.on('getUsers', users => {})
  }, [])

  const handleChatClick = () => {
    setIsChatOpen(!isChatOpen)

    if (isChatOpen) {
      const openchat = document.querySelector('.openchat')
      openchat.style.position = 'relative'
      openchat.style.top = '50%'
      openchat.style.left = '50%'
    } 
  }

  const messagesEndRef = useRef(null)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    getConvo()
    getMessages()
    getUser()
  }, [convId, cid])

  const startConversation = async () => {
    if (driver) {
      try {
        const response = await axios.post(
          `/new/conver/${driver._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        setConvId(response.data._id)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getConvo = async () => {
    if (driver) {
      try {
        const res = await axios.get(`/myconversations/${driver._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (res.data && res.data.length > 0) {
          setIsConv(true)
          setConvId(res.data[0]._id)
        }
      } catch (error) {
        console.log('ee', error)
      }
    }
  }

  const getMessages = async () => {
    try {
      if (convId) {

        const res = await axios.get(`/mymsgs/${convId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setMessages(res.data)
      }
      if (cid) {
        const res = await axios.get(`/mymsgs/${cid}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setMessages(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function getUser () {
    try {
      const response = await axios.get('/validate', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setMe(response.data.validateOne._id)
      socket.current.emit('addUser', response.data.validateOne._id)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSendMessage = async e => {
    e.preventDefault()
    const driverId = driver && driver._id
    socket.current.emit('sendMessage', {
      senderId: me,
      recieverId: driverId,
      text
    })
    try {
      const res = await axios.post(
        `new/msg/${convId}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setMessages([...messages, res.data])
      setNewMessageText('')
    } catch (error) {
      console.log(error)
    }
  }

 

  useEffect(() => {
    const messageEls = document.querySelectorAll('.message.fade')
    messageEls.forEach(el => {
      setTimeout(() => {
        el.classList.add('active')
      }, 100)
    })
  }, [messages])

  return (
    <>
      {driver && (
        <>
          <div className='openchat'>
            {isConv === true ? (
              <>
                <button onClick={handleChatClick} className='click'>
                  {isChatOpen ? 'Close Chat' :'Continue Chat' }
                </button>
              </>
            ) : (
              <>
                {me && driver && me === driver._id ? (
                  <>
                    <button disabled className='click'>
                      Khud se Chat ?
                    </button>
                  </>
                ) : (
                  <>
                    {!start ? (
                      <button
                        onClick={() => {
                          handleChatClick()
                          startConversation()
                        }}
                        className='click'
                      >
                        Start Conversation
                      </button>
                    ) : (
                      <>
                        {' '}
                        <button
                          onClick={() => {
                            handleChatClick()
                          }}
                          className='click'
                        >
                          Conitnue Chat
                        </button>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>

         

          <div className={`chatcard ${isChatOpen ? 'open' : ''}`} >
            <div className='chat-top'>{driver.username}  </div>
            <div className='chat-mid'   >
              {messages.map(message => {
                return (
                  <div key={message._id} ref={messagesEndRef}>
                    <p
                      className={
                        message && me && message.sender === me
                          ? 'message own fade'
                          : 'message fade'
                      }
                    >
                      <div className='messageTop'>
                        <img
                          className='messageImg'
                          src='/icons/img.png'
                          alt=''
                        />
                        <p className='messageText'>{message.text}</p>
                      </div>
                      <div className='messageBottom'>
                        {format(message.createdAt)}
                      </div>
                    </p>
                  </div>
                )
              })}
            </div>
            <div className='chat-down'>
              <form action='' onSubmit={handleSendMessage}>
                <input
                  value={text}
                  onChange={e => setNewMessageText(e.target.value)}
                  type='text'
                  placeholder='Send Message..'
                />
                <button type='submit'>Send</button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Chatbox
