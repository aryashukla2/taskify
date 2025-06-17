// src/components/FirstStepGenerator.jsx
import { useState } from "react";

export default function FirstStepGenerator() {
  const [task, setTask] = useState("");
  const [step, setStep] = useState("");

  const generateStep = () => {
    if (!task.trim()) return;

    // Simple rule-based suggestions for now
    const lower = task.toLowerCase();
    if (lower.includes("write")) {
      setStep("Open a doc and write the title.");
    } else if (lower.includes("email")) {
      setStep("Open your email and draft a subject line.");
    } else if (lower.includes("clean")) {
      setStep("Pick one item and put it away.");
    } else {
      setStep("Open your tools and set a 5-minute timer.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-xl font-semibold text-white">First Step Generator</h2>
      <input
        type="text"
        placeholder="What's your task?"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="w-full p-2 border border-grey-300 rounded text-white"
      />
      <button
        onClick={generateStep}
        className="w-full bg-orange-300/50 text-white py-2 rounded hover:bg-orange-300/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Generate First Step
      </button>
      {step && (
        <div className="bg-blue-300/50 p-3 rounded text-white">
          Your first step: {step}
        </div>
      )}
    </div>
  );
}
