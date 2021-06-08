import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { Button, Tooltip } from 'reactstrap'
import { UseUserContext } from '../utils/UserContext'
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function RoomDetails({ info }) {
  const [user,] = useContext(UseUserContext)
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    if (tooltipOpen == false) return;
    setTimeout(() => setTooltipOpen(false), 1200);
  }, [tooltipOpen]) 

  const changeName = () => {
    let newName = document.getElementById('change-name').value;
    axios.post(`/api/User/ChangeName?id=${user.id}&username=${newName}`)
  }

  return (
    <>
      <Tooltip placement='right' isOpen={tooltipOpen} target='invite-people' > Copied to clipboard! </Tooltip>
      <div className='mb-4 d-flex align-items-center justify-content-space-between'>

        <div className='d-flex flex-column align-items-center '>
          <div> Room name: </div>
          <b> {info.name} </b>
          <CopyToClipboard id='invite-people' text={window.location.href} onCopy={() => setTooltipOpen(true)}>
            <Button color='primary'> Invite People </Button>
          </CopyToClipboard>
        </div>

        <div className='d-flex flex-column align-items-center ml-4 '>
          <label>
            Username
            <input id='change-name' placeholder={user ? user.username : 'loading...'} className='ml-1' />
          </label>
          <Button color='primary' onClick={changeName} className='ml-3 mt-1'>
            Change Name
          </Button>
        </div>

      </div>
    </>
  )
}
