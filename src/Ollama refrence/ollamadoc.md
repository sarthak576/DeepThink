# Ollama Quick Guide 🦙

## 🚀 Get Started
- Start server: `ollama serve`  
- Check models: `ollama list`  
- Download model: `ollama pull <model_name>`  
- Run model: `ollama run <model_name>`  

## 🔧 Fine-Tuning
1. **Create `Modelfile`**  
   ```dockerfile
   FROM llama3  # Base model
   SYSTEM "Your custom instructions here"

2.  **Build Your Custome Model**   
    ```dockerfile
    ollama create my_api_expert -f Modelfile

     