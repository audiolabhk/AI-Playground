import React, { useState } from 'react';
import './App.css'

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById('textarea').value = ""
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct",
        {
          headers: { "Content-Type": "application/json", Authorization: "Bearer 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" },
          method: "POST", 
          body: JSON.stringify({ inputs: input }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawResponse = await response.text();
      console.log('Raw response:', rawResponse);

      const result = JSON.parse(rawResponse);
      setResult(result[0].generated_text);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error: ' + error.message);
    }
  };

  return (
    <div className='App'>
      <h1>{input ? input : "AI Playground"}</h1>
      <code>{result}</code>
      <form onSubmit={handleSubmit}>
        <textarea id="textarea"
          cols={10}
          rows={4}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div><button type="submit">Submit</button></div>
      </form>
    </div>
  );
}

export default App;