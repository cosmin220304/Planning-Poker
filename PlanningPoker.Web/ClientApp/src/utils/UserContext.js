import React, { useEffect, useState } from 'react'

const UseUserContext = React.createContext()

function UserContext({ children }) {
    const [user, setUser] = useState()

    useEffect(() => { 
        const _init_user = async () => {
            let savedUserId = await localStorage.getItem('saved-user-id');
            let savedUser = null;

            if (savedUserId) {
                const response = await fetch(`/api/User?id=${savedUserId}`)
                savedUser = await response.text()
            }

            if (!savedUser) {
                savedUser = { Username: "Guest" }
                const response = await fetch(`/api/User/Create`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(savedUser)
                })
                savedUser.id = await response.text()
            }
            setUser(savedUser)
        }
        _init_user()
    }, [])

    useEffect(() => {
        if (!user) return;
        localStorage.setItem('saved-user-id', user.id)
    }, [user])

    if (!user) return null;

    return (
        <UseUserContext.Provider value={[user, setUser]}>
            {children}
        </UseUserContext.Provider>
    );
}

export {
    UserContext,
    UseUserContext,
}
