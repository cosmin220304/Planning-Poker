import React, { useState, useContext } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { useHistory } from 'react-router-dom';
import { UseUserContext } from '../../utils/UserContext'
import axios from 'axios'
import OldRooms from './components/OldRooms';

export default function Hone() {
  let history = useHistory();
  const [user,] = useContext(UseUserContext)
  const [createdRoom, setCreatedRoom] = useState()
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal);

  const createRoom = async () => {
    let roomName = document.getElementById('room-name-input').value;
    var { data } = await axios.post(`/api/Room/Create?userId=${user.id}`, { Name: roomName })
    setCreatedRoom({
      id: data,
      link: `${window.location.href}room/${data}`,
    })
  }

  return (
    <div className='d-flex align-items-center flex-column mt-4'>

      <h1> {user ? `Hi ${user.username ?? 'guest'},` : 'Loading...'} </h1>

      <Button color='primary' onClick={toggle}>
        Create Room
      </Button>

      <OldRooms />

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Create Room
        </ModalHeader>
        <ModalBody className='center-children'>
          <div className='mb-3'>
            <span className='col-sm-5'>
              Room Name
            </span>
            <input className='col-sm-5' id='room-name-input' />
          </div>
          {createdRoom && <div className='cursor-pointer mb-3' onClick={() => history.push(`/room/${createdRoom.id}`)}> {createdRoom.link} </div>}
          <Button color='primary col-sm-12' onClick={createRoom}>
            Create
          </Button>
        </ModalBody>
      </Modal>
    </div>
  )
}
