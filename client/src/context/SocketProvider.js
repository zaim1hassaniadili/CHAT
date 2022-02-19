import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ id, children }) {
  const [sockt, setSocket] = useState()

  const p = useEffect(() => {
    const newSocket = io('http://localhost:8080')
    setSocket(newSocket)

    return () => newSocket.close();
  }, [id])


  return (
    <SocketContext.Provider value={sockt}>
      {children}
    </SocketContext.Provider>
  )
}