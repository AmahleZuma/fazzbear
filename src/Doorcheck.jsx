import {useState, useEffect} from "react";
import {useSound} from 'use-sound';
import './Securityroom.css'
import doorClose from './sfx/doorOpen.mp3';
import ambience from './sfx/ambience.mp3';


// Room dimensions based on CSS
const ROOMS = {
  SECURITY: { x: 850, y: 0, width: 200, height: 205 },
  PARTY: { x: 350, y: 205, width: 900, height: 205 },
  BATHROOM: { x: 1250, y: 205, width: 100, height: 205 },
  KITCHEN: { x: 350, y: 410, width: 299, height: 205 },
  STORE: { x: 649, y: 410, width: 299, height: 205 },
  OFFICE: { x: 948, y: 410, width: 295, height: 205 },
  BEGIN: {x: 0, y: 0, width: 1904, height: 615}, // Turns the game space into a room...for debuggin purposes
};

export default function doorCheck(){

    // This is game ambience
    const [playAmbience, {stop}] = useSound(ambience, {loop: true, volume: 0.5});

    // This is the toggle button for the game ambience
    const [ambienceMode, setambienceMode] = useState("OFF")


    const [doorStatus1, setdoorStatus1] = useState("OPEN");
    // If you dont make a separate variable, both elements are affected at once
    const [doorStatus2, setdoorStatus2] = useState("OPEN");

    // This plays the door sound
    const [playdoorClose] = useSound(doorClose, {volume: 1});

    // This sets Freddy's position
    const [freddypos, setfreddypos] = useState({x: 0, y: 0});



    function changeDoor1() {
        setdoorStatus1(prev =>
            prev === "OPEN" ? "CLOSED" : "OPEN"
        );

        // Door close sound effect
        playdoorClose();
            
    };

    function changeDoor2() {
        setdoorStatus2(prev =>
            prev === "OPEN" ? "CLOSED" : "OPEN"
        );

        // Door close sound effect
        playdoorClose();
    };

    function playBackground() {
        setambienceMode(prev => {
            if (prev === "OFF") {
                playAmbience();
                return "ON"
            } else if (prev === "ON"){
                stop();
                return "OFF"
            }
        });

    }

    useEffect(() => {
        const room = ROOMS.BEGIN;

        setfreddypos ({
            // This places them in the approximate center, might need to look back on this
            // x: room.x + room.width/2,
            // y: room.y + room.height/2
            x: 1350,
            y: 410

        })
    }, [])

    // This will log the position of freddy (top left) according to (x; y) so the room can be measured properly
    useEffect(() => {
        console.log(freddypos);
    }, [freddypos]);





    return (
        <div className="page-container">
            <>
                <div className="game-world">
                    {/* MAP */}

                    {/* Section 1 - Security room */}
                    <div className="security-room-container">
                        <button onClick={changeDoor1} className="button">{doorStatus1}</button>
                        <div className="security-room"></div>
                        <button onClick={changeDoor2} className="button">{doorStatus2}</button>
                    </div>


                    {/* Section 2 - Party Area and Bathrooms */}
                    <div className="section2">
                        <div className="party-area"></div>
                        <div className="bathroom"></div>
                    </div>

                    {/* Section 3 - Kitchen, Store Area and Office */}
                    <div className="section3">
                        <div className="kitchen"></div>
                        <div className="store-area"></div>               
                        <div className="office"></div>    
                    </div>

                    {/* Freddy*/}
                    <div className="Freddy"   style={{
                            left: freddypos.x,
                            top: freddypos.y
                        }}>
                    </div>


                </div>
            </>
            <button className="ambience" onClick={playBackground}>
                Ambience {ambienceMode}
            </button>
        </div>

    );
}


// Coordinates that will be important for me to remember




/*
 SECTION 2

    PARTY ROOM:
        Top-left:     (450, 205)
        Top-right:    (1350, 205)
        Bottom-left:  (450, 410)
        Bottom-right: (1350, 410)

    TOILET
        Top-left:     (1350, 205)
        Top-right:    (1455, 205)
        Bottom-left:  (1350, 410)
        Bottom-right: (1455, 410)
*/