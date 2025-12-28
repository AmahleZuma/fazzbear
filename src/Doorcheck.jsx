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
  OFFICE: { x: 1055, y: 410, width: 295, height: 205 },
  TARGET: {x:950, y:102.5}
};

// This is the space in front of the door, if the animatronic reaches and the door is open...GAME OVER
const DANGER = {
    DOOR1: {x:450, y:0, width:300, height:205},
    DOOR2: {x:1150, y:0, width:300, height:205}
}




export default function doorCheck(){

    // This is game ambience
    const [playAmbience, {stop}] = useSound(ambience, {loop: true, volume: 0.5});

    // This is the toggle button for the game ambience
    const [ambienceMode, setambienceMode] = useState("OFF")

    // Door 1
    const [doorStatus1, setdoorStatus1] = useState("OPEN");

    // If you dont make a separate variable, both elements are affected at once
    // Door 2
    const [doorStatus2, setdoorStatus2] = useState("OPEN");

    // This plays the door sound
    const [playdoorClose] = useSound(doorClose, {volume: 1});

    // Security Guard position
    const [securityPos, setsecurityPos] = useState({x:0, y:0});

    // This sets Freddy's position
    const [freddypos, setfreddypos] = useState({x: 1300, y: 550});

    // This sets Foxy's position
    const [foxyPos, setfoxyPos] = useState({x:1400, y:350});

    // This sets Chica's position
    const [chicaPos, setchicaPos] = useState({x:500, y:570});

    // This sets Bonny's position
    const [bonnyPos, setbonnyPos] = useState({x:800, y:470});


    // Testing if the function works
    const aniPos = {x:500, y: 300}

    // I don't want to duplicate game logic
    const animatronics = [
        {name: "Freddy", pos: freddypos},
        {name: "Foxy", pos: foxyPos},
        {name: "Chica", pos: chicaPos},
        {name: "Bonny", pos: bonnyPos}
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

    function isAnimatronicinDangerZone(animatronicPos, space){
        // Return true if so
        return(
            animatronicPos.x >= space.x &&
            animatronicPos.x <= space.x + space.width &&
            animatronicPos.y >= space.y &&
            animatronicPos.y <= space.y + space.height
        );

    }

    //Should insert animatronic AI logic here(how they'll move on their own)
    // We dont have an engine designated loop function so we make our own using this
    useEffect(() => {
        const interval = setInterval(() => {


            setfreddypos( prev => ({
                x: prev.x - ROOMS.TARGET.x,
                y: prev.y - ROOMS.TARGET.y  
            }))




        }, 1000)

        return () => clearInterval(interval)
    }, [])


    useEffect(() => {
        // Hard coding security guards position for reference purposes
        setsecurityPos ({
            x: 925,
            y: 95
        })
    }, [])


    // Looping through the animatronics to see which one is in the danger zone
    animatronics.forEach(a => {
        if (isAnimatronicinDangerZone(a.pos, DANGER.DOOR1) && doorStatus1==="OPEN") {
            console.log(`GAME OVER - ${a.name} killed you`)
        }
        if (isAnimatronicinDangerZone(a.pos, DANGER.DOOR2) && doorStatus1==="OPEN") {
            console.log(`GAME OVER - ${a.name} killed you`)
        }
    })





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
                            Freddy
                    </div>

                    {/* Foxy*/}
                    <div className="Foxy"   style={{
                            left: foxyPos.x,
                            top: foxyPos.y
                        }}>
                            Foxy
                    </div>

                    {/* Chica*/}
                    <div className="Chica"   style={{
                            left: chicaPos.x,
                            top: chicaPos.y
                        }}>
                            Chica
                    </div>

                    {/* Bonny*/}
                    <div className="Bonny"   style={{
                            left: bonnyPos.x,
                            top: bonnyPos.y
                        }}>
                            Bonny
                    </div>

                    {/* Guard */}
                    <div className="Guard"   style={{
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


