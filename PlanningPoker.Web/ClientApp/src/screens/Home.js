import React, { useState, useContext, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { useHistory } from 'react-router-dom';
import { UseUserContext } from '../utils/UserContext'
import axios from 'axios'

export default function Hone() {
  let history = useHistory();
  const [user,] = useContext(UseUserContext)
  const [modal, setModal] = useState(false)
  const [oldRooms, setOldRooms] = useState([])
  const toggle = () => setModal(!modal);

  const createRoom = async () => {
    let roomName = document.getElementById('room-name-input').value;
    var { data } = await axios.post(`/api/Room/Create?userId=${user.id}`, { Name: roomName })
    var room = data
    document.getElementById('generated-room-id').innerHTML = `${window.location.href}/room/${room}`;
    document.getElementById('generated-room-id').addEventListener('click', () => {
      goToRoom(room);
    })
  }

  useEffect(() => {
    if (!user || !user.id) return

    (async function () {
      const { data } = await axios.get(`/api/User/GetRoomsForUser?id=${user.id}`)
      setOldRooms(data)
    })()
  }, [user])

  const goToRoom = (room) => {
    history.push(`/room/${room}`);
  }

  return (
    <div className='d-flex align-items-center flex-column mt-4'>

      <h1>
        {
          user
            ? `Hi ${user.username},`
            : 'Loading...'
        }
      </h1>

      <Button color='primary' onClick={toggle}>
        Create Room
      </Button>

      {oldRooms.length > 0 &&
        < div className='old-rooms-container'>
        Old Rooms:
        <div className='mt-4'>
          {
            oldRooms.map((r, idx) =>
            (<div key={`room-${idx}`} className='cursor-pointer' onClick={() => goToRoom(r.id)}>
              {r.name}: {`${window.location.href}room/${r.id}`}
            </div>)
            )
          }
        </div>
      </div>}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Create Room
        </ModalHeader>
        <ModalBody className='center-children'>
          <div>
            <span className='col-sm-5'>
              Room Name
            </span>
            <input className='col-sm-5' id='room-name-input' />
          </div>
          <br />
          <div className='cursor-pointer' id='generated-room-id'> </div>
        </ModalBody>
        <ModalBody>
          <Button color='primary col-sm-12' onClick={createRoom}>
            Create
          </Button>
        </ModalBody>
      </Modal>
    </div>
  )
}
