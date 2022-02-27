import React, { useContext, useRef, useEffect, useState } from 'react';
import { useSocket } from './SocketProvider';


/*
 let messageObject ={
     salonname:"name the actuall Salon",
     userNickname:"the user unique id",
     timeStamps:"When the message was emitted",
     textMessage:"the actual exchange"
 }

 Salon contain multiple messages and user
 SalonManger delete/add/rename all the salon in the sidebar

 */



const GlobalContext = React.createContext();

export function useGlobal() {
    return useContext(GlobalContext);
}



function GlobalProvider({ id, children }) {
    
    const mainSalon = {
        salonName: "Main",
        messages: [],
        users: []
    }

    const [selectedSalonIndex, setSelectedSalonIndex] = useState(0)
    const [salonManager, setSalonManager] = useState([mainSalon])
    const socket = useSocket();
    const stateRef = useRef();
    stateRef.current = salonManager;

    useEffect(() => {
        fetch("http://localhost:8080/mongo/userExist/" + id)
            .then(response => response.json())
            .then(data => {
                console.log("the data", data);
                setSalonManager(prevState => {
                    return [...prevState, ...data]
                })
                //stateRef.current = [...salonManager, ...data];
            })
    }, [])


    if (!socket?.hasListeners("connect")) {
        socket?.on("connect", () => {
            const currentsalon = salonManager[selectedSalonIndex];
            const currentsalonName = currentsalon.salonName;
            console.log('user connected ' + socket.id);
            socket.emit("connection-user-notification", { id, socketId: socket.id, currentsalonName })

            if (!socket.hasListeners("server-to-client")) {
                socket?.on("server-to-client", msg => {

                    //=> Handle "Main" salon message
                    if (msg.salonname === "Main") {
                        receiveMessage(msg)
                    } else {
                        //=>Handle "Other" salon Message
                        console.log("=>Handle 'Other' salon Message", msg)
                        customSalonreceiveMessage(msg)

                    }
                })
            }

            //On receive new salon creation
            if (!socket.hasListeners("new-salon-create")) {
                socket.on("new-salon-create", salon => {
                    console.log("In new-salon-create")
                    addSalonOnreceive(salon)
                })
            }
        })
    }

    function addSalon(salonName, message, users) {
        let newSalon = {
            salonName: salonName,
            messages: message,
            users: users
        }
        salonManager.push(newSalon)
        console.log("add salon", salonManager)
        setSalonManager([...salonManager])
        console.log("is emit", newSalon);
        socket.emit("new-salon", newSalon);

    }


    function customSalonreceiveMessage(msg) {
        let selectedSalon = stateRef.current.filter(elt => {
            return elt.salonName === msg.salonname;
        })
        if (!selectedSalon[0].users.includes(msg.userNickname) && msg.userNickname !== "SYSTEM")
            selectedSalon[0].users.push(msg.userNickname);

        selectedSalon[0].messages.push(msg)
        setSalonManager([...stateRef.current])
    }
    /*
    Thing that the stange comportement was du to the way of integration the salon
    Exeperience show other wise.
    For now the receiving client has can display message but sending back a message is impossible.
    Cause the salon disapear. 
    Plus, if trying to create an other salon in the meantime the latest salon from the receiving client is being replaced.
    */

    function addSalonOnreceive(salon) {
        console.log("Creating new Salon");
        salonManager.push(salon)
        setSalonManager([...salonManager])

    }

    function removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

    function receiveMessage(msg) {
        let selectedSalon = salonManager[selectedSalonIndex]

        if (!selectedSalon.users.includes(msg.userNickname) && msg.userNickname !== "SYSTEM")
            selectedSalon.users.push(msg.userNickname);

        selectedSalon.messages.push(msg)
        setSalonManager([...stateRef.current])
    }


    function sendMessage(text) {
        const currentSalon = salonManager[selectedSalonIndex];
        let date = Date.now();
        let dateObject = Date(date);
       

        let messageObject = {
            salonname: currentSalon.salonName,
            userNickname: id,
            timeStamps: dateObject.toLocaleString().slice(0,21),
            textMessage: text
        }
        console.log("send Message =>", currentSalon)
        currentSalon.messages.push(messageObject);

        if (!currentSalon.users.includes(messageObject.userNickname))
            currentSalon.users.push(id);
        //==>

        if (messageObject.salonname === "Main") {
            socket?.emit("client-to-server", messageObject)
        } else {
            let room = messageObject.salonname;
            socket?.emit("client-to-server", messageObject, room)
        }
    }

    function deleteSalon(salonName) {
        fetch("http://localhost:8080/mongo/deleteSalon/" + salonName,{
            method: 'DELETE',
            mode: 'cors',
        })
        .then(response => response.json())
        
    }

    let value = {
        addSalon,
        salonManager: stateRef.current,
        selectedSalon: salonManager[selectedSalonIndex],
        setSelectedSalonIndex,
        sendMessage,
        deleteSalon,
        id
    }
    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;
