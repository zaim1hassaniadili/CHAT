import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useGlobal } from "../context/GlobalProvider"
import "./OpenConversation.css"
function OpenConversation() {
    const [text, setText] = useState('');
    const { selectedSalon, sendMessage, deleteSalon, id } = useGlobal();
    const system = "SYSTEM";

    console.log(selectedSalon);

    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({ smooth: true })
        }
    }, [])


    function handleSubmit(e) {
        e.preventDefault();
        sendMessage(text)
        setText("")
    }
    function handleDelete(e) {
        console.log("delete conversation");
        const salonName = selectedSalon.salonName;
        const deleteNotif = "this salon has been deleted";
        if (salonName !== "Main") {
            deleteSalon(salonName);
            sendMessage(deleteNotif)
        }

    }

    return (
        <div className="d-flex flex-column flex-grow-1 ">
            <Button variant="danger" type="submit" onClick={handleDelete}>Delete</Button>
            <div className="overflow-auto container" style={{ background: "#D6E5FA" }}>

            
                    {
                        selectedSalon?.messages.map((message, index) => {
                            const lastMessage = selectedSalon?.messages.length - 1 === index
                            return (
                                <div className={`message_wrapper ${message.userNickname ==="SYSTEM"? "system": message.userNickname === id ? "me": "them"} `}>
                                <div
                                    ref={lastMessage ? setRef : null}
                                    key={index}
                                    className={`message_div`}
                                >
                                    <div className={`text-muted bold `}>
                                        {message.userNickname=== id? "me": message.userNickname}
                                    </div>
                                    <div
                                        className={`message`}
                                    >
                                        {message.textMessage}
                                    </div>
                                    {/* <div className={`text-muted small `}>
                                        {message.timeStamps}
                                    </div> */}
                                    
                                </div>
                                </div>
                            )
                        })
                    }
              
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control
                            className="textarea"
                            as="textarea"
                            required
                            value={text}
                            onChange={e => setText(e.target.value)}
                            style={{ height: '75px', resize: 'none' }}
                        />

                        <Button type="submit">Send</Button>

                    </InputGroup>
                </Form.Group>
            </Form>
        </div >



    )
}

export default OpenConversation;
