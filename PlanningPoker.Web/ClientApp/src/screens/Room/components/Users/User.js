import React, { useEffect, useState } from 'react'
import anime from 'animejs/lib/anime.es.js';

export default function User({ username, cardNumber, isLeader, showResults }) {
  const [facingDireciton, setFacingDireciton] = useState(!showResults ? 'back' : 'front')
  const [symbol, setSymbol] = useState('🖤')
  const [symbolColor, setSymbolColor] = useState('black')
  const [animation, setAnimation] = useState()

  useEffect(() => {
    const anim = anime({
      targets: '.user-card',
      rotateY: 180,
      delay: 3000,
      loop: false,
      autoplay: false,
    })
    setAnimation(anim)
  }, [])

  const generageRandomSymbol = () => {
    const symbols = '♠♣♥♦'
    const idx = Math.round(Math.random() * (symbols.length - 1))
    setSymbol(symbols[idx])

    const color = Math.random() < 0.5 ? 'black' : 'red'
    setSymbolColor(color)
  }

  useEffect(() => {
    if (animation && showResults) {
      animation.seek(0)
      animation.play()
    }

    if (!showResults) {
      setFacingDireciton('back')
    }
    else {
      (async function () {
        generageRandomSymbol()
        await new Promise(res => setTimeout(res, 3100))
        setFacingDireciton('front')
      })()
    }
  }, [showResults, animation])

  return (
    <div>

      <div className={`user-card ${facingDireciton}`} >
        <div className={`symbol-top ${symbolColor}`}> {symbol} </div>
        <div className={`symbol-down ${symbolColor}`}> {symbol} </div>
        <b> {cardNumber} {!cardNumber && facingDireciton === 'front' ? '???' : ''} </b>
      </div>

      <div className='text-center'>
        {username} {isLeader ? '👑' : ''}
      </div>

    </div>
  )
}
