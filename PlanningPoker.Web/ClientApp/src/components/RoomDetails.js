import React, { useEffect, useState, useContext } from 'react'
import { Button, Tooltip } from 'reactstrap'
import { UseUserContext } from '../utils/UserContext'

export default function RoomDetails({ info }) {
    const [user,] = useContext(UseUserContext)
    const [tooltipOpen, setTooltipOpen] = useState(false);

    useEffect(() => {
        if (tooltipOpen == false) return;
        setTimeout(() => setTooltipOpen(false), 1200);
    }, [tooltipOpen])

    const copyToClipboard = () => {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = window.location.href;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        setTooltipOpen(true);
    }

    const changeName = () => {
        let newName = document.getElementById("change-name").value; 
        fetch(`/api/User/ChangeName?id=${user.id}&username=${newName}`, { method: 'post' })
    }

    return (
        <div style={{ position: "absolute", left: "2rem", top: "50%" }} className="h5 center-children">
            <span>
                Room name:
            </span>
            <span>
                {info.name}
            </span>
            <br />
            <Button color="primary" id="invite-people" onClick={copyToClipboard}>
                Invite People
            </Button>
            <Tooltip placement="right" isOpen={tooltipOpen} target="invite-people" >
                Copied to clipboard!
            </Tooltip> 
            <br/>
            <div>Username</div>
            <input className="col-sm-5 m-2" id="change-name" placeholder={user.username} />
            <Button color="primary" onClick={changeName}>
                Change Name
            </Button>
        </div>
    )
}
