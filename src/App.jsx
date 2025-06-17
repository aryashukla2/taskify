import "./App.css";
import FirstStepGenerator from "./components/FirstStepGenerator";

function App() {
  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/imports/bg.jpeg')",
      }}
    >
      {/* Translucent overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      {/* App content */}

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <FirstStepGenerator />
      </div>
    </div>
  );
}

export default App;
