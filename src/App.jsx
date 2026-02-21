import "./App.css";
import { useState, useRef } from "react";
import helo from "./assets/signs/helo.png";
import namaskaram from "./assets/signs/namaskaram.png";
import kelkamo from "./assets/signs/kelkamo.png";
import eniku from "./assets/signs/eniku.png";
import manasilakunund from "./assets/signs/manasilakunund.png";
import nanni from "./assets/signs/nanni.png";

function App() {
  const [text, setText] = useState("");
  const recognitionRef = useRef(null);

  // Word Mapping
  const wordMap = {
  "നമസ്കാരം": namaskaram,
  "ഹലോ": helo,
  "കേൾക്കാമോ": kelkamo,
  "എനിക്ക്": eniku,
  "മനസ്സിലാകുന്നു": manasilakunund,
  "നന്ദി": nanni
};

  // Clean Malayalam text
  const cleanText = text.trim().replace(/[^\u0D00-\u0D7F\s]/g, "");

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ml-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  return (
  <div className="app-container">
    <div className="background-shape shape1"></div>
    <div className="background-shape shape2"></div>

    <div className="card">
      <h1>Malayalam Speech to Sign</h1>
      <p className="subtitle">
        A simple bridge between spoken words and visual language
      </p>

      <button className="mic-button" onClick={startListening}>
        🎤 Speak
      </button>

      <div className="section">
        <h2>Recognized Speech</h2>
        <p className="recognized-text">{text || "Waiting for speech..."}</p>
      </div>

      <div className="section">
        <h2>Sign Output</h2>

        <div className="sign-container">
          {Object.entries(wordMap).map(([word, image]) =>
            cleanText.includes(word) ? (
              <img
                key={word}
                src={image}
                alt="sign"
                className="sign-image"
              />
            ) : null
          )}
        </div>
      </div>
    </div>
  </div>
);
}

export default App;