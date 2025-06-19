// src/components/FirstStepGenerator.jsx
import { useState, useEffect } from "react";

const moods = ["Low Energy", "Stressed", "Focused"];

export default function FirstStepGenerator() {
  const [task, setTask] = useState("");
  const [step, setStep] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [mood, setMood] = useState("Low Energy");
  const [history, setHistory] = useState(() => {
    // Initialize history from localStorage
    const saved = localStorage.getItem("taskHistory");
    return saved ? JSON.parse(saved) : [];
  });

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("taskHistory", JSON.stringify(history));
  }, [history]);

  const generateStep = () => {
    if (!task.trim()) return;

    const lower = task.toLowerCase();
    let newStep = "";

    // Set set based on mood and task
    if (mood === "Low Energy") {
      if (lower.includes("write")) {
        newStep = "Just open your doc and give it a name.";
      } else if (lower.includes("email")) {
        newStep = "Open your inbox. That's it for now.";
      } else {
        newStep = "Take one minute to gather your tools.";
      }
    } else if (mood === "Stressed") {
      newStep = "Take a deep breath. Then just outline the task.";
    } else if (mood === "Focused") {
      if (lower.includes("write")) {
        newStep = "Open your doc and write the first sentence.";
      } else if (lower.includes("email")) {
        newStep = "Write a quick draft — don’t worry about perfect.";
      } else {
        newStep = "Start a 5-minute timer and begin the first obvious step.";
      }
    }

    setStep(newStep);

    // Set history after generating the step
    setHistory((prev) => [
      { task, step: newStep, mood, time: new Date().toISOString() },
      ...prev,
    ]);

    // Add a small delay to allow the DOM to render before starting animation
    setTimeout(() => {
      setIsAnimating(true);
    }, 10);
  };

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden">
      <div className="max-w-8xl mx-auto p-10 space-y-12 relative">
        {/* Generator Section */}
        <div
          className={`transition-all duration-1000 ease-in-out ${
            isAnimating
              ? "opacity-0 -translate-y-60 scale-75 pointer-events-none"
              : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          {/* First Step Generation Title Card */}
          <h2 className="text-8xl font-serif font-semibold text-white mb-12">
            First Step Generator
          </h2>
          {/* Input Box */}
          <input
            type="text"
            placeholder="What's your task?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full text-3xl font-serif text-white bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-white placeholder-gray-400 pb-1 mb-8"
          />

          {/* Mood Selector */}
          <div className="flex justify-center gap-2 mb-8">
            {moods.map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`px-4 py-2 rounded ${
                  mood === m
                    ? "bg-blue-800/30 text-white border-2 border-white"
                    : "bg-blue-400/30 text-gray-400 hover:bg-gray-200"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Generate First Step Button */}
          <button
            onClick={generateStep}
            className="w-fit p-4 bg-orange-300/50 text-xl font-serif text-white py-2 rounded hover:bg-orange-300/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate First Step
          </button>
        </div>

        {/* First Step Display */}
        {step && (
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${
              isAnimating
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-full pointer-events-none"
            }`}
          >
            <div className="max-w-fit mx-auto text-4xl bg-blue-300/50 p-8 rounded-lg text-white font-serif text-center shadow-2xl">
              <div className="text-2xl mb-4 opacity-80">Your first step:</div>
              <div className="font-semibold">{step}</div>
              {/* Go Back to Generation Button */}
              <button
                onClick={() => {
                  setIsAnimating(false);
                  setTimeout(() => {
                    setTask("");
                    setStep("");
                  }, 10);
                }}
                className="mt-6 px-6 py-3 bg-white/20 text-lg font-serif text-white rounded hover:bg-white/30 transition-colors"
              >
                Generate Another Step
              </button>

              {/* History Boxes */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Your History</h3>
                <ul className="space-y-2">
                  {history.map((item, idx) => (
                    <li key={idx} className="bg-gray-100 p-3 rounded">
                      <div className="text-sm text-gray-700">
                        <strong>Task:</strong> {item.task}
                      </div>
                      <div className="text-sm text-green-700">
                        <strong>Step:</strong> {item.step}
                      </div>
                      <div className="text-xs text-gray-500">
                        Mood: {item.mood} •{" "}
                        {new Date(item.time).toLocaleTimeString()}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => {
                  setHistory([]);
                  localStorage.removeItem("taskHistory");
                }}
                className="text-sm bg-orange-300/50 text-white hover:underline mt-4 p-2 rounded"
              >
                Clear history
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
