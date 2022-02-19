import React, { useState } from 'react';
import { Tab, Nav, Button, Modal } from 'react-bootstrap';
import Salons from "./Salons";
import Users from './Users';
import NewSalonModal from './NewSalonModal';
import NewUserModal from "./NewUserModal";

const SALONS_KEY = 'salons';
const USERS_KEY = 'users';

function Sidebar({ id }) {
    const [activeKey, setActiveKey] = useState(SALONS_KEY);
    const [modalOpen, setModalOpen] = useState(false);
    const salonOpen = activeKey === SALONS_KEY;

    function closeModal() {
        setModalOpen(false)
    }
    return (
        <div style={{ width: "250px" }} className="d-flex flex-column border">

            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey={SALONS_KEY}>Salons</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={USERS_KEY}>Users</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={SALONS_KEY}>
                        <Salons />
                    </Tab.Pane>
                    <Tab.Pane eventKey={USERS_KEY}>
                        <Users/>
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-2 border-top border-right small">
                    Your Id: <span className="text-muted">{id}</span>
                </div>
                <Button onClick={() => setModalOpen(true)} className="rounded-0">
                    New {salonOpen ? "Salon" : "Users"}
                </Button>

            </Tab.Container>

            <Modal show={modalOpen} onHide={closeModal}>
                {salonOpen ?
                    <NewSalonModal closeModal={closeModal} /> :
                    <NewUserModal closeModal={closeModal} />
                }
            </Modal>

        </div>
    )
}

export default Sidebar
