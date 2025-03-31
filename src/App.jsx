import { useState } from 'react'
import './App.css'
import axios from 'axios';
import { Button, Container, Typography } from '@mui/material';

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
    <Container sx={{maxWidth:"md",alignItems:"center",textAlign:'center'
    }}>
   <Typography  variant="h3" className="bg-blue-500" sx={{color:"white"}} >Deep Think</Typography>



   <textarea className='border rouded w-full' value={question} onChange={(e)=>setQuestion(e.target.value) } cols="30" rows="10" placeholder='Ask Me Anything... ' style={{color:"white"}}></textarea>
   
   <Button onClick={generateAnswer} variant='contained' sx={{p:1 , m:2}} >Generate Answer</Button>
  
   <pre style={{ width: "100%", maxHeight: "300px", overflowY: "auto", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", textAlign: "left", color:"white"}}>{answer
      .replace(/\*\*\s?/g, '')                   // Remove bold (**)
      .replace(/\*\s?/g, '- ')}</pre>
  
   </Container>
     )
}

export default App
