import { useState } from "react";

export default function jumpScare() {

 const [amount, setAmount] = useState(0);
 function addKill(){
    setAmount(amount + 1);

    if (amount !== 1) {
        alert('Freddy has killed you ' + amount + ' times.' );
    } else {
        alert('Freddy has killed you ' + amount + ' time.' );
    }
    
    };


    

  return (
    <button onClick={addKill}>
      Door
    </button>
  );
}

// so there is state which is data that sets what the site will be like (appearance or function)
// you say for example state and setState, setState is for when you want to change it
// does not have to be these above names specifically but the format is something an setSomething