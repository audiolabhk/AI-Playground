import { useState } from "react"
import "./App.css"
const api_key = "sk-proj-0ZCgHVf40vdGOwM8F6uwT3BlbkFJK8XgqrdAB4GSBTp5DToc"

function App() {
  const [text, setText] = useState("")
  const [sentiment, setsentiment] = useState("")

  async function callOpenAIAPI() {
    const APIBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        {
          "role": "system",
          "content": "You will be provided with a tweet, and your task is to classify its sentiment as positive, neutral, or negative."
        },
        {
          "role": "user",
          "content": text
        }
      ],
      "temperature": 0.7,
      "max_tokens": 64,
      "top_p": 1
    }



    console.log(sentiment)
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + api_key
      },
      body: JSON.stringify(APIBody)
    }).then((data)=>{
      return data.json();
    }).then((data) => {
      console.log(data)
    })

    document.getElementById("textarea").value = ""
  }

  return (
    <>
      <div className="App">
        <h2 onClick={{}}>AI Playground</h2>
        <textarea
          id="textarea"
          onChange={(e) => setText(e.target.value)}
          placeholder="Text Here"
          cols={50}
          rows={10}
        />
      </div>
      <div>
        <button onClick={callOpenAIAPI}>Send for Analysis</button>
        <code style={{ display: text ? "block" : "none" }}>{text}</code>
      </div>
    </>
  )
}

export default App
