import React, { useEffect } from "react";
import { handleSpeak } from "./speechUtils";
import { useNavigate } from "react-router-dom";
import "./English.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const English = () => {
  const navigate = useNavigate();

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });

    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  const commands = [
    {
      command: "select *",
      callback: (command) => handleCommand(command),
    },
    {
      command: "go back",
      callback: () => handleGoBack(),
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });

  const handleSpeakButton = () => {
    handleSpeak("english-page");
  };

  const handleCommand = (command) => {
    switch (command) {
      case "transcript":
        // Handle transcript logic
        break;
      case "notes":
        // Handle notes logic
        break;
      case "mnemonics":
        // Handle mnemonics logic
        break;
      default:
        break;
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="english-page">
        <h1 className="">English</h1>
        <div className="subject-container">
          <ul>
            <li>
              <button
                className="english-btn"
                onClick={() => handleCommand("transcript")}
              >
                Transcript
              </button>
            </li>
            <li>
              <button
                className="english-btn"
                onClick={() => handleCommand("notes")}
              >
                Notes
              </button>
            </li>
            <li>
              <button
                className="english-btn"
                onClick={() => handleCommand("mnemonics")}
              >
                Mnemonics
              </button>
            </li>
          </ul>
          <div className="button-container">
            <button className="english-btn" onClick={() => navigate(-1)}>
              Back
            </button>
            <button className="english-btn" onClick={handleSpeakButton}>
              Speak
            </button>
          </div>
        </div>
      </div>
      <p>You said: {transcript}</p>
    </>
  );
};

export default English;