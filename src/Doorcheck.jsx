import {useState} from "react";

export default function doorCheck(){
    const [doorStatus, setdoorStatus] = useState(0);

    function changeDoor() {
        const btn = document.getElementById("door")
        doorStatus = "Closed"
        setdoorStatus(doorStatus);
        btn.addEventListener("click", () = > {
            doorStatus = "Opened"
        });

        
    }


    return (
        <button id="door">Door {doorStatus}</button>
    );
}