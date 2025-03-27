import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [question,setQuestion] = useState("");
  const [answer,setAnswer] = useState("")


  async function generateAnswer(){
    setAnswer("Loading...")
   const response = await axios({
    url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCcMvWLZmmlbjoFy5GXWRA86agM_ObqNxM",
    method:"post",
    data:{
      "contents": [{
        "parts":[{"text": question}]
        }]
       }
   }) 
   setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text']);
  }
  return (
    <>
     <div className="w-full"></div> 
   <h1 className="bg-blue-500">Deep Think</h1>
   <textarea className='border rouded w-full' value={question} onChange={(e)=>setQuestion(e.target.value) } cols="30" rows="10" placeholder='Ask Me Anything... '></textarea>
   <button onClick={generateAnswer}>Generate Answer</button>
   <pre>{answer}</pre>
   
    </>
  )
}

export default App
