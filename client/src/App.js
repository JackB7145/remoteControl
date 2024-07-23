import {useState, useEffect} from 'react';
import photo1 from "./assets/1.png"
import photo2 from "./assets/2.png"

function App() {
  const [photo, setPhoto] = useState(photo1);
  const [vol, setVol] = useState(100);
  const changeVol = async() => {
    try{
      setPhoto(photo2)
      await fetch(`http://localhost:3000/change/${vol}`, {methods: "GET"})
    }
    catch(error){
      console.log()
    }
  }
  
  const power = async(e) => {

    await fetch('http://localhost:3000/power', {methods: "GET"})
  }

  useEffect(() => {
    // Check if photo is equal to photo2 and update if needed
    setTimeout(()=>{
      if (photo === photo2) {
        setPhoto(photo1); // Update photo to photo1
      }
    }, 1000)
}, [photo])
  
  return (
    <div className="w-full h-screen flex-col">
      <div className="h-1/2 justify-center flex">
        <button className="m-auto bg-black text-white p-[10px] rounded-xl text-[20vw]" onClick={() => power()}>Power Off</button>
      </div>
      <div className="h-1/2 justify-center flex-col">
        <input placeholder="Volume" onChange={(e)=>{setVol(e.target.value);}}  className="w-1/2 ml-[25%]"></input>
        <br />
        <br />
        <img src={photo} onClick={(e)=>changeVol(e)} className='mx-auto' alt="Animated Button"></img>
      </div>  
    </div>
  );
}
export default App