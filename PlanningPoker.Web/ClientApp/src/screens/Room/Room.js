import React, { useEffect, useState, useContext } from 'react'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { UseUserContext } from '../../utils/UserContext'
import RoomDetails from './components/RoomDetails'
import Users from './components/Users'
import Hand from './components/Hand'
import axios from 'axios'

export default function Hone() {
  const history = useHistory();
  const location = useLocation()
  const { roomId } = useParams()

  const [user,] = useContext(UseUserContext)
  const [users, setUsers] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [roomName, setRoomName] = useState()

  useEffect(() => {
    updateRoom()
  }, [])

  useEffect(() => {
    if (!user || !user.id) return;
    axios.post(`/api/Room/AddUser?roomId=${roomId}&userId=${user.id}`)
  }, [user, users])

  const updateRoom = async () => {
    while (history.location == location) {
      try {
        const { data } = await axios.get(`/api/Room?id=${roomId}`)
        setUsers(data.users)
        setRoomName(data.name)
        setShowResults(data.showResults)
        await new Promise(r => setTimeout(r, 200))
      }
      catch (err) {
        console.log(err)
        break;
      }
    }
  }

  return (
    <>
    <RoomDetails roomName={roomName} users={users} showResults={showResults} />
    <div className='room'>
      <Users users={users} showResults={showResults} />
      <Hand showResults={showResults}/>
    </div>
    </>
  )
}
