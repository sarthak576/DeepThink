import { useState } from 'react'
import './App.css'
import axios from 'axios';
import ReactMarkdown from "react-markdown";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
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
      <Typography 
        variant="h3" 
        sx={{ 
          mb: 2, 
          color:"white",
          fontWeight: "bold", 
          animation: "glowText 3s ease-in-out infinite alternate"
        }}
      >
        Deep Think
      </Typography>

      <textarea
        className="border rounded w-full"
        style={{
          color:"white", width: "100%", minHeight: "40px", borderRadius: "8px", padding: "8px",
          transition: "0.2s", outline: "none", boxShadow: "none",border:"none"
        }}
        onFocus={(e) => e.target.style.boxShadow = "0 0 10px 2px rgba(153, 110, 179, 0.6), 0 0 20px 4px rgba(0, 123, 255, 0.3)"}
        onBlur={(e) => e.target.style.boxShadow = "none"}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); generateAnswer(); }}}
        placeholder="How Can I Help You Today ?"
      />

      <Button onClick={generateAnswer} variant="outlined" sx={{ mt: 2, fontWeight: "bold", mb: 2 , border:"none"}}>
      Generate 🚀
      </Button>

      <div
        style={{
          background: "#171717",
          color: "white",
          width: "100%",
          maxHeight: "300px",
          overflowY: "auto",
          padding: "12px",
          borderRadius: "8px",
          textAlign: "left",
          fontSize: "18px",
          wordBreak: "break-word",
          lineHeight: "1.6",
          boxShadow: answer === "Loading..."
            ? "0 0 10px 2px rgba(153, 110, 179, 0.6), 0 0 20px 4px rgba(0, 123, 255, 0.3)"
            : "none",
          animation: answer === "Loading..." ? "glow 2s linear infinite" : "fadeOut 1s forwards",
          transition: "box-shadow 0.4s ease",
        }}
      >
        {answer === "Loading..." ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <DotLottieReact
              loop
              autoplay
              style={{ height: "120px", width: "120px" }}
            />
          </div>
        ) : (
          <ReactMarkdown>{answer}</ReactMarkdown>
        )}
        <style>
          {`
            @keyframes glow {
              0% { box-shadow: 0px 0px 10px rgba(153, 110, 179, 0.8), 0px 0px 20px rgba(0, 123, 255, 0.4); }
              25% { box-shadow: 5px 0px 15px rgba(153, 110, 179, 0.8), 0px 5px 25px rgba(0, 123, 255, 0.5); }
              50% { box-shadow: 0px 5px 15px rgba(153, 110, 179, 0.8), -5px 0px 25px rgba(0, 123, 255, 0.5); }
              75% { box-shadow: -5px 0px 15px rgba(153, 110, 179, 0.8), 0px -5px 25px rgba(0, 123, 255, 0.5); }
              100% { box-shadow: 0px 0px 10px rgba(153, 110, 179, 0.8), 0px 0px 20px rgba(0, 123, 255, 0.4); }
            }

            @keyframes fadeOut {
              0% { opacity: 1; box-shadow: 0px 0px 10px rgba(153, 110, 179, 0.8), 0px 0px 20px rgba(0, 123, 255, 0.4); }
              100% { opacity: 1; box-shadow: none; }
            }

            @keyframes glowText {
              0% { text-shadow: 0 0 5px rgb(110, 84, 142), 0 0 10px rgb(40, 0, 114); }
              100% { text-shadow: 0 0 15px rgb(148, 135, 241), 0 0 25px rgb(37, 9, 246); }
            }
          `}
        </style>
      </div>
    </Container>
  )
}

export default App
