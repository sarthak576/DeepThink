import { useState } from 'react'
import './App.css'
import axios from 'axios';
import ReactMarkdown from "react-markdown";

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
   color:"white", width: "100%", minHeight: "40px", borderRadius: "8px", padding: "8px",
    transition: "0.2s", outline: "none", boxShadow: "none", fontSize: "16px"
  }}
  onFocus={(e) => e.target.style.boxShadow = "0 0 5px rgba(0,0,255,0.5)"}
  onBlur={(e) => e.target.style.boxShadow = "none"}
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); generateAnswer(); }}}
  placeholder="Ask Me Anything..."
/>
 
  <Button onClick={generateAnswer} variant="contained" sx={{ mt: 2,fontWeight: "bold" ,mb:2 }}>Generate </Button>
  
  <div
        style={{
          color:"white",
          width: "100%",
          maxHeight: "300px",
          overflowY: "auto",
          padding: "12px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          textAlign: "left",
          fontSize: "18px",
          wordBreak: "break-word",
          lineHeight: "1.6",
        }}
      >
        <ReactMarkdown>{answer}</ReactMarkdown>
      </div>

  
   </Container>
     )
}

export default App
