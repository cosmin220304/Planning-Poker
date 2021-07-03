import React, { useEffect, useState, useContext } from 'react'
import { UseUserContext } from '../../../utils/UserContext'
import { Button } from 'reactstrap'
import Card from './Card'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Hand({ showResults }) {
  const { roomId } = useParams()
  const [votedCard, setVotedCard] = useState()
  const [user,] = useContext(UseUserContext)
  const [counter, setCounter] = useState()
  const fibbonaci = [1, 2, 3, 5, 8, 13]

  useEffect(() => {
    if (counter === 0) setCounter(null)
    if (!counter) return

    (async function () {
      await new Promise(res => setTimeout(res, 1000))
      setCounter(counter - 1)
    })()
  }, [counter])
   
  useEffect(() => {
    if (!user) return
    setVotedCard(user.cardValue)
  }, [user])

  useEffect(() => {
    if (!showResults) return
    setCounter(3)
  }, [showResults])

  const toggleShowResults = async () => {
    try {
      await axios.post(`api/Room/ToggleShowCards?roomId=${roomId}&userId=${user.id}`)
    }
    catch (err) {
      alert('only the leader of the room can toggle results!')
    }
  }

  const vote = (number) => {
    if (showResults) {
      alert('wait for vote to restart')
      return
    }
    setVotedCard(number)
    axios.post(`api/Room/Vote?userId=${user.id}&cardValue=${number}`)
  }

  return (
    <div className='hand'>
      <h1> {counter} </h1>

      {!showResults && <div className='results-button'>
        <Button color='primary' onClick={toggleShowResults} disabled={!!counter}> Show results </Button>
      </div>}

      {showResults && <div className='restart-button'>
        <Button color='primary' onClick={toggleShowResults} disabled={!!counter}> Restart </Button>
      </div>}

      <div className='hand-cards'>
        {
          fibbonaci.map((fibboNumber, idx) => {
            const isSelected = votedCard === fibboNumber ? true : false
            return <Card number={fibboNumber} idx={idx} maxIdx={fibbonaci.length} key={`fibo-${idx}`} isSelected={isSelected} vote={vote} />
          })
        }
      </div>
    </div>
  )
}
