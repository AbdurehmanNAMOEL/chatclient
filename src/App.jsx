
import './App.css';
import io from 'socket.io-client'
import { useState } from 'react';
import Chat from './components/Chat';
const socket = io.connect('http://localhost:3001')
function App() {
  const [user,setUser]= useState('')
  const [room,setRoom]= useState('')
  const [isJoined,setJoined]= useState(false)
  
  const joinMeeting=()=>{
    if(user!=='' || room!==''){
      socket.emit('join_room',room)
      setJoined(true)
    }
  }
  return (
    <div className="App">
    {isJoined?null: <div className='join-container'>
      <h1>Join Room</h1>
      <input type="text" placeholder='Name' onChange={(e)=>setUser(e.target.value)}/>
      <input type="text" placeholder='Room_Id' onChange={(e)=>setRoom(e.target.value)}/>
      <button onClick={joinMeeting}>Join</button>
      </div>}
      {isJoined?<Chat socket={socket} user={user} room={room}/>:null}
    </div>
  );
}

export default App;
