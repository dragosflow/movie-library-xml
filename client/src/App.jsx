import "./App.css";
import { useState } from "react";
import { Homework1 } from "./components/Homework1";
import BackButton from "./components/BackButton";
import Options from "./components/Options";

function App() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className=''>
      <div className='moving-borders z-50'></div>
      <div className='p-[2.5rem]'>
        {activeTab !== 0 && <BackButton onClick={() => setActiveTab(0)} />}

        <div className={activeTab === 0 ? "fade fade-active" : "fade"}>
          {activeTab === 0 && (
            <Options onClick={(number) => setActiveTab(number)} />
          )}
        </div>

        <div className={activeTab === 1 ? "fade fade-active" : "fade"}>
          {activeTab === 1 && <Homework1 />}
        </div>
      </div>
    </div>
  );
}

export default App;
