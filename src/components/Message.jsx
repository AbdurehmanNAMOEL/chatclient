import React from 'react'
import '../style/message.css'
const Message = ({message,user,data,date}) => {
  return (
    <div className="message-container" id={user===data.author?'you':'other'}>
    <div className='chat-list' >
      <p className='text-message'>{data.message}</p>
    </div>
    <div className="user-sent-time">
      <span >{date}</span>
      <span>{data?.author}</span>
    </div>
    </div>
  )
}

export default Message