import React from 'react'
import User from './User'

export default function UserList ({ users }) {
    return (
        <div style={{ display: "flex", gap: "2rem" }}>
            {users.map((u, k) => {
                return (
                    <User key={u.id} username={u.username} cardNumber={u.cardValue} />
                )
            })}
        </div>
    )
}
