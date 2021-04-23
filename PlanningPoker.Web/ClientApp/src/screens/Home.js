import React, { useState, useEffect, useContext } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { useHistory } from "react-router-dom";
import { UseUserContext } from '../utils/UserContext'

export default function Hone() {
    let history = useHistory();
    const [user, ] = useContext(UseUserContext)
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    useEffect(() => {
        console.log(`home: ${user}`)
    }, [user])
      
    const createRoom = async () => {
        let roomName = document.getElementById("room-name-input").value;
        var response = await fetch(`/api/Room/Create?userId=${user.id}`,
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Name: roomName })
            }
        )
        var room = await response.text();
        document.getElementById("generated-room-id").innerHTML = `${window.location.href}/room/${room}`;
        document.getElementById("generated-room-id").addEventListener('click', () => {
            goToRoom(room);
        })
    }

    const goToRoom = (room) => {
        history.push(`/room/${room}`);
    }

    console.log(user)
    return (
        <div className="center-children mt-4">
            <h1>
                Hi {user.username} {user.Username},
            </h1>
            <Button color="primary" onClick={toggle}>
                Create Room
            </Button>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Create Room
                </ModalHeader>
                <ModalBody className="center-children">
                    <div>
                        <span className="col-sm-5">
                            Room Name
                        </span>
                        <input className="col-sm-5" id="room-name-input" />
                    </div>
                    <br/>
                    <div className="cursor-pointer" id="generated-room-id"> </div>
                </ModalBody>
                <ModalBody>
                    <Button color="primary col-sm-12" onClick={createRoom}>
                        Create
                    </Button>
                </ModalBody>
            </Modal>
        </div>
    )
}
