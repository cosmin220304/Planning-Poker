import React, { useEffect, useState } from 'react'
import anime from 'animejs/lib/anime.es.js';

export default function User({ username, cardNumber, isLeader, showResults }) {
  const [facingDireciton, setFacingDireciton] = useState(!showResults ? 'back' : 'front')
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
        await new Promise(res => setTimeout(res, 3100))
        setFacingDireciton('front')
      })()
    }
  }, [showResults, animation])
   
  return (
    <div>

      <div className={`user-card ${facingDireciton}`} >
        {cardNumber} {!cardNumber && facingDireciton === 'front' ? '???' : ''}
      </div>

      <div className='text-center'>
        {username} {isLeader ? '👑' : ''}
      </div>

    </div>
  )
}
