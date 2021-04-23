import React  from 'react'

export default function User ({ username, cardNumber }) {
    return (
        <div style={{ width: "5rem", height: "10rem", border: "3px solid black" }}>
            {username}
        </div>
    )
}
