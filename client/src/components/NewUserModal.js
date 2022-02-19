import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

function NewUserModal({closeModal}) {

    function handleSubmit(e) {
        e.preventDefault()

        closeModal()
    }
    return (
        <div>
            <Modal.Header closeButton>Still waiting for a feature...</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <div style={{fontSize:"4rem", textAlign:"center"}}>
                        😑
                  </div>
                       
                  
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button type="submit" onClick={handleSubmit}>Close</Button>
            </Modal.Footer>
     
        </div >
    )
}

export default NewUserModal
