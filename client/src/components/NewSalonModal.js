import React, { useState, useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useGlobal } from '../context/GlobalProvider';

function NewSalonModal({ closeModal }) {
    const [selectedContactIds, setSelectedContactIds] = useState([]);
    const {addSalon, selectedSalon } = useGlobal();
    const contacts = selectedSalon.users;
    const salonRef = useRef()
   
    //have a fonction with create a conversation adding the list of selectedContactIds

    function handleSubmit(e) {
        e.preventDefault();
        //HERE create a new Conversation
        addSalon(salonRef.current.value,[], selectedContactIds)
        
        console.log(salonRef.current.value, selectedContactIds)

        closeModal();
    }
    console.log("NewSalonModal", selectedContactIds);

    function handleCheckboxChange(contactId) {
        setSelectedContactIds(prevSeletedContactIds => {
            if (prevSeletedContactIds.includes(contactId)) {
                return prevSeletedContactIds.filter(prevId => {
                    return contactId !== prevId;
                })
            } else {
                return [...prevSeletedContactIds, contactId];
            }
        })
    }

    return (
        <div>
            <Modal.Header closeButton>Create Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map((contact, index) => (
                        <Form.Group controlId={contact} key={index}>
                            <Form.Check
                                type="checkbox"
                                value={selectedContactIds.includes(contact)}
                                label={contact}
                                onChange={() => handleCheckboxChange(contact)}
                            />
                        </Form.Group>
                    ))}
                    <Form.Group>
                        <Form.Label>Salon Name</Form.Label>
                        <Form.Control type="text" ref={salonRef} required />
                    </Form.Group>




                    <Modal.Footer>
                        <Button type="submit">Create</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>

        </div>
    )
}

export default NewSalonModal
