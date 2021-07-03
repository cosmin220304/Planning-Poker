import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { Button, Tooltip } from 'reactstrap'
import { UseUserContext } from '../../../utils/UserContext'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export default function RoomDetails({ roomName, users, showResults }) {
  const [user,] = useContext(UseUserContext)
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [average, setAverage] = useState('???')
  const [agreement, setAgreement] = useState('???')
  const [agreementEmoji, setAgreementEmoji] = useState()

  useEffect(() => {
    if (tooltipOpen == false) return;
    setTimeout(() => setTooltipOpen(false), 1200);
  }, [tooltipOpen])

  const changeName = () => {
    let newName = document.getElementById('change-name').value;
    axios.post(`/api/User/ChangeName?id=${user.id}&username=${newName}`)
  }

  useEffect(() => {
    if (!users) return

    if (!showResults) {
      setAverage('???')
      setAgreement('???')
      setAgreementEmoji()
    }
    else {
      console.log("test");
      (async function () {
        await new Promise(res => setTimeout(res, 3100))
        computeAverage()
        computeAgreement()
      })()
    }
  }, [showResults])

  const computeAverage = () => {
    const total_sum = users.reduce((acc, curr) => acc + (parseInt(curr.cardValue) || 0), 0)
    const votes_number = users.filter(user => !!user.cardValue).length
    setAverage(parseInt(total_sum / votes_number * 100) / 100)
  }

  const computeAgreement = () => {
    const storyPointsScores = [users[0].cardValue]
    let differentVotes = 0

    for (let _user of users) {
      const sp = _user.cardValue
      if (!sp) continue

      if (!storyPointsScores.includes(sp)) {
        storyPointsScores.push(sp)
        differentVotes += 1
      }
    }

    if (differentVotes != 0) differentVotes += 1

    const votes_number = users.filter(user => !!user.cardValue).length

    let _agreement = differentVotes * 100 / votes_number
    if (_agreement === 100) _agreement = 0
    else if (_agreement === 0) _agreement = 100
    setAgreement(`${_agreement}%`)

    if (_agreement < 25) setAgreementEmoji('😔')
    else if (_agreement < 50) setAgreementEmoji('😐')
    else if (_agreement < 75) setAgreementEmoji('🙂')
    else setAgreementEmoji('😄')
  }

  return (
    <>
      <Tooltip placement='right' isOpen={tooltipOpen} target='invite-people' > Copied to clipboard! </Tooltip>
      <div className='mb-4 d-flex align-items-center justify-content-space-between'>

        <div className='d-flex flex-column align-items-center '>
          <div> Room name: </div>
          <b> {roomName} </b>
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

        {users && <div className='d-flex flex-column ml-4 '>
          <div>
            <b>Average SP score:</b> {average}
          </div>
          <br />
          <div>
            <b>Agreement:</b> {agreement} {agreementEmoji}
          </div>
        </div>}

      </div>
    </>
  )
}
