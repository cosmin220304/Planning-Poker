import React from 'react'
import User from './User'

export default function UserList({ users }) {
  return (
    <div className='user-list'>
      {users.map((u, idx) => {
        const isLeader = idx === 0 ? true : false
        return <User key={u.id} username={u.username} cardNumber={u.cardValue} isLeader={isLeader} />
      }
      )}
    </div>
  )
}
