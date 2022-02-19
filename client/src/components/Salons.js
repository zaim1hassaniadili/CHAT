import React, {useState} from 'react'
import {ListGroup} from "react-bootstrap";
import {useGlobal} from '../context/GlobalProvider';


function Salons() {
    // get the available salon and the selected on  also
    // think about the deleteion

    const {salonManager, setSelectedSalonIndex} =useGlobal();
    const [salonIndex, selectedSalonIndex] = useState(0);

    

    return (
        <ListGroup variant="flush">
            {
                salonManager.map((salon, index)=>(
                    <ListGroup.Item
                    key={index}
                    action
                    onClick={()=> {
                        console.log("change here")
                        setSelectedSalonIndex(index)
                    }}
                    active={salonIndex}
                    
                    >{salon.salonName}</ListGroup.Item>
                ))
            }
            
        </ListGroup>
    )
}

export default Salons;
