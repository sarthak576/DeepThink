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
    <Container sx={{maxWidth:"md",textAlign:'center', p:2}}>


<Typography variant="h3" className="bg-blue-500" sx={{ mb: 2 , color:"white"}}>Deep Think</Typography>



<textarea
    className="border rounded w-full"
    style={{
      width: "100%", minHeight: "40px", borderRadius: "8px", padding: "8px",
      transition: "0.2s", outline: "none", boxShadow: "none"
    }}
    onFocus={(e) => e.target.style.boxShadow = "0 0 5px rgba(0,0,255,0.5)"}
    onBlur={(e) => e.target.style.boxShadow = "none"}
    value={question} onChange={(e) => setQuestion(e.target.value)}
    placeholder="Ask Me Anything..."
  />   
  <Button onClick={generateAnswer} variant="contained" sx={{ mt: 2,fontWeight: "bold" ,mb:2 }}>Generate </Button>
  
  <pre style={{ 
    width: "100%", maxHeight: "300px", overflowY: "auto", padding: "8px",
    border: "1px solid #ccc", borderRadius: "8px", textAlign: "left", 
    whiteSpace: "pre-wrap", fontSize: "14px", wordBreak: "break-word"
  }}>
    {answer.replace(/\*\*\s?/g, '').replace(/\*\s?/g, '- ')}
  </pre>
  
   </Container>
     )
}

export default App
