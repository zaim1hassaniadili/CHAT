import React from 'react'
import { ListGroup } from 'react-bootstrap';
import {useGlobal} from '../context/GlobalProvider';


function Users() {
    //Get all the Users

    const {selectedSalon, salonManager} = useGlobal();
    console.log(selectedSalon);
    console.log(salonManager);
    return (
        <ListGroup variant="flush">
            {
                selectedSalon?.users.map((user, index) => (
                    <ListGroup.Item 
                    key={index}

                    >
                        {user}
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    )
}

export default Users
