import {useState, useEffect} from "react";
import {useSound} from 'use-sound';
import './Securityroom.css'
import doorClose from './sfx/doorOpen.mp3';
import ambience from './sfx/ambience.mp3';


// Room dimensions based on Game world position
// Not pixel perfect, but logical enough that the animatronic movement makes sense
const ROOMS = {
  SECURITY: { x: 755, y: 0, width: 390, height: 205 },
  PARTY: { x: 450, y: 205, width: 900, height: 205 },
  TOILET: { x: 1350, y: 205, width: 105, height: 205 },
  KITCHEN: { x: 450, y: 410, width: 300, height: 205 },
  STORE: { x: 750, y: 410, width: 305, height: 205 },
  OFFICE: { x: 1055, y: 410, width: 295, height: 205 }
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

    // Testing if the function works
    const aniPos = {x:500, y: 300}



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

    // Will look at the animatronics position relative to the rooms coordinates and decide on whether or not it is in that room
    function isAnimatronicInRoom(animatronicPos, room) {

        // Returns True for if within room, else False
        return(
            animatronicPos.x >= room.x &&                                   // Left
            animatronicPos.x <= room.x + room.width &&                     // Right
            animatronicPos.y >= room.y &&                                 // Top
            animatronicPos.y <= room.y + room.height                      // Bottom
        );
    }

    useEffect(() => {
        const room = ROOMS.BEGIN;

        setfreddypos ({
            // This places them in the approximate center, might need to look back on this
            // x: room.x + room.width/2,
            // y: room.y + room.height/2
            x: 500,
            y: 300

        })
    }, [])

    // This will log the position of freddy (top left) according to (x; y) so the room can be measured properly
    useEffect(() => {
        console.log(freddypos);
    }, [freddypos]);

    // Running test
    console.log(
        isAnimatronicInRoom(freddypos, ROOMS.PARTY)
    );





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
 SECTION 1

 SECURITY ROOM:
        Top-left:     (755, 0)
        Top-right:    (1145, 0)
        Bottom-left:  (755, 205)
        Bottom-right: (1145, 205)

*/


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

/*
 SECTION 3
    
    KITCHEN:
        Top-left:     (450, 410)   
        Top-right:    (750, 410)
        Bottom-left:  (450, 615)
        Bottom-right: (750, 615)   


    STORE AREA:
        Top-left:     (750, 410)
        Top-right:    (1055, 410)
        Bottom-left:  (750, 615)
        Bottom-right: (1055, 615) 

    OFFICE:
        Top-left:     (1055, 410)
        Top-right:    (1350, 410)
        Bottom-left:  (1055, 615)
        Bottom-right: (1350, 615)

*/

// Point in Circle:
// Given that Freddy is at position (x;y), which room is Freddy in at the moment? 
// A point is inside a room if point x is between left and right AND point y is between top and bottom