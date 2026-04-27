import { useState,useRef } from 'react'
import './App.css'

function App() {
  const [formStatus,setStatus] = useState("Please Fill The Form"); 
  return (
    <>
    {formStatus}
    <form>
      <input placeholder='Enter your Name' id="name"></input>
      <input placeholder='Enter your Name' id="email"></input>

    <button onClick={function(){
      setStatus("Form Submitted");
    }}>Submit</button>
    </form>
    </>
  )
}

export default App
