import React, { useState } from "react"
import Dashboard from "./Dashboard";
import Login from "./Login";
import GlobalProvider from "../context/GlobalProvider";
import { SocketProvider } from "../context/SocketProvider";




function App() {
  const [id, setId] = useState();



  const dashboard = (
    <SocketProvider>
      <GlobalProvider id={id} >
        <Dashboard id={id} />
      </GlobalProvider>
    </SocketProvider>
  )

  return (
    <div className="App">
      {id ? dashboard : <Login onIdSubmit={setId} />}
    </div>
  );
}

export default App;
