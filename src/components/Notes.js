import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleSpeak } from "./speechUtils";
import "./Notes.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function Notes() {
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
      callback: (unit) => handleUnitSelection(unit),
    },
    {
      command: "go back",
      callback: () => handleGoBack(),
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });

  const handleSpeakButton = () => {
    navigator.vibrate([300]);
    handleSpeak("notes-page");
  };

  const handleUnitSelection = (unit) => {
    let unitNumber = unit.split(" ")[1];

    if (!isNaN(parseInt(unitNumber))) {
      unitNumber = parseInt(unitNumber);
    } else {
      unitNumber = unitNumber.toLowerCase();
    }

    const numberMap = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
    };

    if (typeof unitNumber === "number" && unitNumber >= 1 && unitNumber <= 5) {
      navigate("/chapter");
    } else if (numberMap[unitNumber]) {
      navigate("/chapter");
    } else {
      console.log("Invalid unit number");
    }
  };

  const handleGoBack = () => {
    navigator.vibrate([300]);
    navigate(-1);
  };

  return (
    <>
      <div className="notes-page">
        <h1 className="">Notes</h1>
        <ul>
          <li>
            <Link to={"/chapter"}>Unit 1</Link>
          </li>
          <li>
            <Link to={"/chapter"}>Unit 2</Link>
          </li>
          <li>
            <Link to={"/chapter"}>Unit 3</Link>
          </li>
          <li>
            <Link to={"/chapter"}>Unit 4</Link>
          </li>
          <li>
            <Link to={"/chapter"}>Unit 5</Link>
          </li>
        </ul>

        <div className="button-container">
          <button onClick={handleGoBack}>Back</button>
          <button onClick={handleSpeakButton}>Speak</button>
        </div>
      </div>
      <p>You said: {transcript}</p>
    </>
  );
}
