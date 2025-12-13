import { useState } from "react";

export default function jumpScare() {

 const [amount, setAmount] = useState(0);
 function addKill(){
    const newAmount = amount + 1
    setAmount(newAmount);

    if (newAmount !== 1) {
        alert('Freddy has killed you ' + newAmount + ' times.' );
    } else {
        alert('Freddy has killed you ' + newAmount + ' time.' );
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