import {useState} from "react";
import './Securityroom.css'

export default function doorCheck(){
    const [doorStatus1, setdoorStatus1] = useState("Closed");
    // If you dont make a separate variable, both elements are affected at once
    const [doorStatus2, setdoorStatus2] = useState("Closed");

    function changeDoor1() {
        setdoorStatus1(prev =>
            prev === "Closed" ? "Opened" : "Closed"
        );
        
    }

    function changeDoor2() {
        setdoorStatus2(prev =>
            prev === "Closed" ? "Opened" : "Closed"
        );
    }


    return (
        <>

            {/* Section 1 - Security room */}
            <div className="security-room-container">
                <button onClick={changeDoor1} className="button">Door 1 {doorStatus1}</button>
                <div className="security-room">

                </div>
                <button onClick={changeDoor2} className="button">Door 2 {doorStatus2}</button>
            </div>


            {/* Section 2 - Party Area and Bathrooms */}
            <div className="section2">
                <div className="party-area">

                </div>
            </div>

            {/* Section 3 - Kitchen, Store Area and Office */}
            {/* <div></div> */}
        </>

    );
}