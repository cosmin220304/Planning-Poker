import React, { useEffect, useState } from 'react'
import anime from 'animejs/lib/anime.es.js'

export default function Card({ number, idx, maxIdx, isSelected, vote }) {
  const [animation, setAnimation] = useState()
  const [symbol, setSymbol] = useState('🖤')
  const [symbolColor, setSymbolColor] = useState('black')

  const generageRandomSymbol = () => {
    const symbols = '♠♣♥♦'
    const idx = Math.round(Math.random() * (symbols.length - 1))
    setSymbol(symbols[idx])

    const color = Math.random() < 0.5 ? 'black' : 'red'
    setSymbolColor(color)
  }

  useEffect(() => {
    generageRandomSymbol()
  }, [])

  useEffect(() => {
    const anim = anime({
      targets: `.hand-card-${idx}`,
      translateY: -50,
      scale: 1.25,
      rotate: idx < maxIdx / 2 ? -5 : 5,
      zIndex: 100,
      duration: 100,
      autoplay: false,
      loop: false,
    })

    setAnimation(anim)
  }, [])


  const handleMouseEnter = () => {
    animation.restart()
  }

  const handleMouseLave = () => {
    animation.pause()
    animation.seek(0)
  }

  const handleClick = () => {
    vote(number)
  }

  return (
    <div
      className={`hand-card hand-card-${idx} ${idx == maxIdx - 1 ? 'danger' : ''} ${isSelected ? 'selected' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLave}
      onClick={handleClick}
    >
      <div className={`symbol-top ${symbolColor}`}> {symbol} </div>
      <div className={`symbol-down ${symbolColor}`}> {symbol} </div>
      <b> {number || '???'} </b>
    </div>
  )
}