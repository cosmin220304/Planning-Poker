import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { UseUserContext } from '../utils/UserContext'
import axios from 'axios'

export default function OldRooms() {
  const [user,] = useContext(UseUserContext)
  const [oldRooms, setOldRooms] = useState([])

  useEffect(() => {
    if (!user || !user.id) return

    (async function () {
      const { data } = await axios.get(`/api/User/GetRoomsForUser?id=${user.id}`)
      setOldRooms(data)
    })()
  }, [user])


  return (
    <>
      {
        oldRooms.length > 0 &&
        <div className='card p-4 mt-4'>
          Old Rooms:
        <div className='d-flex flex-column mt-4'>
            {
              oldRooms.map((r, idx) =>
                <Link key={`room-${idx}`} className='text-link cursor-pointer' to={`/room/${r.id}`}>
                  {r.name}: {`${window.location.href}room/${r.id}`}
                </Link>
              )
            }
          </div>
        </div>
      }
    </>
  )
}
