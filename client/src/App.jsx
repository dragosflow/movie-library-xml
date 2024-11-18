import "./App.css";
import { useState } from "react";
import { Homework1 } from "./components/Homework1";
import BackButton from "./components/BackButton";
import Options from "./components/Options";
import { Homework2 } from "./components/Homework2";
import Homework4 from "./components/Homework4";

function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className=''>
      <div className='moving-borders z-50'></div>
      <div className='p-[2.5rem]'>
        <div className={activeTab !== 0 ? "fade fade-active" : "fade"}>
          {activeTab !== 0 && <BackButton onClick={() => setActiveTab(0)} />}
        </div>
        <div className={activeTab === 0 ? "fade fade-active" : "fade"}>
          {activeTab === 0 && (
            <Options onClick={(number) => setActiveTab(number)} />
          )}
        </div>

        <div className={activeTab === 1 ? "fade fade-active" : "fade"}>
          {activeTab === 1 && <Homework1 />}
        </div>
        <div className={activeTab === 2 ? "fade fade-active" : "fade"}>
          {activeTab === 2 && <Homework2 />}
        </div>
        <div className={activeTab === 4 ? "fade fade-active" : "fade"}>
          {activeTab === 4 && <Homework4 />}
        </div>
      </div>
    </div>
  );
}

export default App;
