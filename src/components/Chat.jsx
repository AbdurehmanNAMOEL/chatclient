import React, { useState } from 'react'
import { useEffect } from 'react'
import '../style/chat.css'
import Message from './Message'
// import EmojiPicker from 'emoji-picker-react';
const Chat = ({socket,user,room}) => {
    const [userMessage,setMessage] = useState('')
    const [userMessageList,setUserMessageList] = useState([])
    
const handleMessage= async()=>{
  if(userMessage!==''){       
  const userMessageData ={
            author:user,
            room:room,
            message:userMessage,
            time:new Date(Date.now()).getHours()+':'+new Date(Date.now()).getMinutes()
      }
      
      socket.emit('userMessage',userMessageData)
      setUserMessageList(list=>[...list,userMessageData])
      setMessage('')
    } 
  
    }

   useEffect(()=>{
        socket.on('receiver',data=>{
         setUserMessageList(list=>[...list,data])
        })
    },[socket])

  return (
    <div className='chat-container'>
      <header>
        <h1>LiveChat</h1>
        <div className='user-info'>
         active <div className='active'/>
         <span>{user}</span>
        </div>
      </header>
      <div className='body'>

        {userMessageList.map(data =>
        <Message date={data.time} user={user} data={data}/>       
)}

     </div>
     <footer>
        <input 
         type="text" 
         placeholder='Enter your message' 
         onChange={(e)=>setMessage(e.target.value)}
         value={userMessage}
         />
         {/* <EmojiPicker height={20} width={100}/> */}
        <button onClick={handleMessage}>Send</button>
    </footer> 
    </div>
  )
}

export default Chat