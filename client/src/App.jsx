import { useState } from "react";
import DOMMovieCollection from "./components/DOMParser";
import JSONMovieCollection from "./components/JSONParser";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("DOMParser");

  return (
    <div className='moving-borders'>
      <h1 className='text-5xl font-bold mt-5 mb-10 hover:opacity-80 cursor-pointer'>
        #1
      </h1>
      <div className='flex  space-x-4 my-4 mb-10'>
        <button
          onClick={() => setActiveTab("DOMParser")}
          className={`px-4 py-2 rounded transition duration-200 ${
            activeTab === "DOMParser"
              ? "bg-blue-700 text-white"
              : "bg-gray-300 text-black hover:bg-gray-400"
          }`}
        >
          DOM Parser
        </button>
        <button
          onClick={() => setActiveTab("FastParser")}
          className={`px-4 py-2 rounded transition duration-200 ${
            activeTab === "FastParser"
              ? "bg-blue-700 text-white"
              : "bg-gray-300 text-black hover:bg-gray-400"
          }`}
        >
          Fast Parser
        </button>
      </div>

      <div>
        {activeTab === "DOMParser" ? (
          <DOMMovieCollection />
        ) : (
          <JSONMovieCollection />
        )}
      </div>
    </div>
  );
}

export default App;
