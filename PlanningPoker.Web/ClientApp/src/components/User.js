import React, { useEffect, useState } from 'react'
import anime from 'animejs/lib/anime.es.js';


export default function User({ username, cardNumber, isLeader }) {
  const [facingDireciton, setFacingDireciton] = useState(!cardNumber ? 'back' : 'front')
  const [animation, setAnimation] = useState()

  useEffect(() => {
    const anim = anime({
      targets: '.user-card',
      rotateY: 180,
      delay: 3000,
      loop: false,
      complete: (anime) => {
        setFacingDireciton('front')
      }
    })

    setAnimation(anim)
  }, [])


  useEffect(() => {
    if (facingDireciton === 'front' && animation) {
      animation.seek(0)
    }
  }, [facingDireciton, animation])

  return (
    <div>

      <div className={`user-card ${facingDireciton}`} >
        {cardNumber} {!cardNumber && facingDireciton === 'front' ? '???' : ''}
      </div>

      <div className='text-center'>
        {username} {isLeader ? '👑' : '' }
      </div>

    </div>
  )
}
