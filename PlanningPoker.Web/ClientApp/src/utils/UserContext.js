import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UseUserContext = React.createContext()

function UserContext({ children }) {
  const [user, setUser] = useState()

  useEffect(() => {
    (async () => {
      let savedUserId = await localStorage.getItem('saved-user-id');
      let savedUser = null;

      if (savedUserId) {
        const { data } = await axios(`/api/User?id=${savedUserId}`)
        savedUser = data
      }

      if (!savedUser) {
        const { data } = await axios.post(`/api/User/Create`, { Username: 'Guest' })
        savedUser = {
          id: data
        }
      }
      setUser(savedUser)
    })()
  }, [])

  useEffect(() => {
    if (user && user.id) {
      localStorage.setItem('saved-user-id', user.id)
    }
  }, [user])

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
