import { useState, useEffect, useRef } from "react";
import { useSound } from 'use-sound';
import './Securityroom.css'
import doorClose from './sfx/doorOpen.mp3';
import ambience from './sfx/ambience.mp3';



// Room dimensions based on Game world position
// Not pixel perfect, but logical enough that the animatronic movement makes sense
const ROOMS = {
    // SECURITY: { x: 755, y: 0, width: 390, height: 205 },
    PARTY: { x: 450, y: 205, width: 900, height: 205 },
    TOILET: { x: 1350, y: 205, width: 105, height: 205 },
    KITCHEN: { x: 450, y: 410, width: 300, height: 205 },
    STORE: { x: 750, y: 410, width: 305, height: 205 },
    OFFICE: { x: 1055, y: 410, width: 295, height: 205 },
};

const DANGERZONES = {
    DOOR1: { x: 450, y: 0, width: 300, height: 205 },
    DOOR2: { x: 1150, y: 0, width: 300, height: 205 }
}



export default function doorCheck() {

    // This is game ambience
    const [playAmbience, { stop }] = useSound(ambience, { loop: true, volume: 0.5 });

    // This is the toggle button for the game ambience
    const [ambienceMode, setambienceMode] = useState("OFF")

    // Door 1
    const [doorStatus1, setdoorStatus1] = useState("OPEN");

    // Door 1 ref
    const door1 = useRef({x:450, y:0});

    // If you dont make a separate variable, both elements are affected at once
    // Door 2
    const [doorStatus2, setdoorStatus2] = useState("OPEN");

    // This plays the door sound
    const [playdoorClose] = useSound(doorClose, { volume: 1 });

    // Security Guard position
    const [securityPos, setsecurityPos] = useState({ x: 925, y: 95 });

    // If THIS does not work I'm jumping in a vat of acid
    const securityRef = useRef({ x: 925, y: 95 })


    // This sets Chica's position
    const [chicaPos, setchicaPos] = useState({ x: 500, y: 570 });

    // Chica ref position
    const chicaRef = useRef({x:500,y:570})


    // Testing if the function works
    const aniPos = { x: 500, y: 300 }

    // I don't want to duplicate game logic
    const animatronics = [
        { name: "Freddy", pos: freddypos },
        { name: "Foxy", pos: foxyPos },
        { name: "Chica", pos: chicaPos },
        { name: "Bonny", pos: bonnyPos }
    ];



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

    // Toggle on or off for background noise
    function playBackground() {
        setambienceMode(prev => {
            if (prev === "OFF") {
                playAmbience();
                return "ON"
            } else if (prev === "ON") {
                stop();
                return "OFF"
            }
        });

    }

    // Will look at the animatronics position relative to the rooms coordinates and decide on whether or not it is in that room
    function isAnimatronicInRoom(animatronicPos, room) {

        // Returns True for if within room, else False
        return (
            animatronicPos.x >= room.x &&                                   // Left
            animatronicPos.x <= room.x + room.width &&                     // Right
            animatronicPos.y >= room.y &&                                 // Top
            animatronicPos.y <= room.y + room.height                      // Bottom
        );
    }

    function isAnimatronicinDangerZone(animatronicPos, space) {
        // Return true if so
        return (
            animatronicPos.x >= space.x &&
            animatronicPos.x <= space.x + space.width &&
            animatronicPos.y >= space.y &&
            animatronicPos.y <= space.y + space.height
        );

    }







    // Chica's AI
    useEffect(() => {

        const aggression = 5 // no clue wht to do with this, just putting it here
        const roamSpeed = 2;
        const sprintSpeed = 10;
        let currentState;





        const waitcheck = () => {
            console.log("Wait is finished")

            // Turning rooms into keys
            // sorts rooms into arrays
            const roomsArray = Object.keys(ROOMS)

            // Creates index to pick from
            const roomsIndex = Math.floor(Math.random() * roomsArray.length);

            // Random room will be picked
            const rooms = roomsArray[roomsIndex]

            // This will help me get the range so chica wont go to a specific coordinate but more inside the space
            const maxValX = ROOMS[rooms].x + ROOMS[rooms].width;
            const minValX = ROOMS[rooms].x

            const maxValY = ROOMS[rooms].y + ROOMS[rooms].height;
            const minValY = ROOMS[rooms].y

            const rangeX = maxValX - minValX;
            const rangeY = maxValY - minValY;

            // Creates a random width and height to add to the minimum => 
            const randWidth = Math.floor(Math.random() * (rangeX + 1));
            const randHeight = Math.floor(Math.random() * (rangeY + 1));

            // Chica will go to a random location inside a room not a specific coordinate
            const roomX = randWidth + minValX;
            const roomY = randHeight + minValY


            let chicaRoam;

            // ROAM
            chicaRoam = setInterval(() => {
                
                const dx = roomX - chicaRef.current.x;
                const dy = roomY - chicaRef.current.y;

                const distance = Math.sqrt(dx**2 + dy**2);



                setchicaPos({...chicaRef.current})

                // Back to wait but wait how the fuck do i loop this without hard coding
                if (distance <= 15) {
                    console.log("ARRIVED. Stopping Interval....");
                    clearInterval(chicaRoam);
                    setTimeout(waitcheck, 13000)
                    return;
                }

                const nx = dx/distance;
                const ny = dy/distance;

                chicaRef.current.x += nx * roamSpeed;
                chicaRef.current.y += ny * roamSpeed;

                console.log(`${chicaRef.current.x} : ${chicaRef.current.y}`);
                
            },50)

            
        
        
        
        }
        currentState = setTimeout(waitcheck, 13000);

        
        
        return () => {
            clearInterval(currentState)
        }

        

    }, [])



    // Looping through the animatronics to see which one is in the danger zone
    // animatronics.forEach(a => {
    //     if (isAnimatronicinDangerZone(a.pos, DANGER.DOOR1) && doorStatus1==="OPEN") {
    //         console.log(`GAME OVER - ${a.name} killed you`)
    //     }
    //     if (isAnimatronicinDangerZone(a.pos, DANGER.DOOR2) && doorStatus1==="OPEN") {
    //         console.log(`GAME OVER - ${a.name} killed you`)
    //     }
    // })







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

                    {/* Chica*/}
                    <div className="Chica" style={{
                        left: chicaPos.x,
                        top: chicaPos.y
                    }}>
                        Chica
                    </div>


                    {/* Guard */}
                    <div className="Guard" style={{
                        left: securityPos.x,
                        top: securityPos.y
                    }}>
                        Guard
                    </div>


                </div>
            </>
            <button className="ambience" onClick={playBackground}>
                Ambience {ambienceMode}
            </button>
        </div>

    );
}

// Animatronic AI behaviour

/*
Chica - the cautious one

aggression is at a 5 out of 10
shes extremely aware of the player
will wait about 15 seconds before moving so not too impatient

she pauses when there is surveillance
will wait when the camera opens
when it closes, changes room
randomly picks a room
is shes close to the door though she will sprint 
but will wait if shes watched while sprinting
and will wait if the door is closed and possibly move to a room further from the player
*/
