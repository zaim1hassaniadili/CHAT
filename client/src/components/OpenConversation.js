import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useGlobal } from "../context/GlobalProvider"
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
            <div className="flex-grow-1 overflow-auto" style={{ background: "#D6E5FA" }}>

                <div className="d-flex flex-column align-items-start justify-content-end px-3">
                    {
                        selectedSalon?.messages.map((message, index) => {
                            const lastMessage = selectedSalon.messages.length - 1 === index
                            return (
                                <div
                                    ref={lastMessage ? setRef : null}
                                    key={index}
                                    className={`my-1 d-flex flex-column  align-items-start`}
                                >
                                    <div
                                        className={`my-1 d-flex flex-column rounded px-2 py-1 text-white ${message.userNickname === system ? 'bg-dark'
                                            : id === message.userNickname ?
                                                'bg-primary align-self-end align-items-end' :
                                                ' bg-secondary align-items-start'}`}
                                    >
                                        {message.textMessage}
                                    </div>
                                    <div className={`text-muted small `}>
                                        {message.userNickname}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control
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
